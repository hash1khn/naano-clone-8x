#!/usr/bin/env python3
"""Automatic prompt/response capture for the 8x assignment.

Fires from Cursor hooks (beforeSubmitPrompt, afterAgentResponse, stop).
Writes only the user prompt and the final assistant reply for each turn
into .agent-logs/. Thinking, tool calls, and intermediate steps are omitted.
"""

from __future__ import annotations

import fcntl
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

HOOKS_DIR = Path(__file__).resolve().parent
REPO_ROOT = HOOKS_DIR.parent.parent
LOG_DIR = REPO_ROOT / ".agent-logs"
STATE_DIR = HOOKS_DIR / "state"
LOCK_PATH = STATE_DIR / "capture.lock"
SESSIONS_PATH = STATE_DIR / "sessions.json"
PENDING_DIR = STATE_DIR / "pending"
RAW_LOG_PATH = STATE_DIR / "raw.jsonl"

AUTHOR = "hash1khn"
TOOL = "cursor"
PROJECT = "naano-rebuild"
DEFAULT_MODEL = "cursor-grok-4.6"


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def fmt_ts(dt: datetime) -> str:
    return dt.isoformat(timespec="milliseconds").replace("+00:00", "Z")


def short_id(session_id: str) -> str:
    return (session_id or "unknown").split("-")[0][:8]


def model_name(payload: dict[str, Any]) -> str:
    for key in ("model_id", "model"):
        value = payload.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return DEFAULT_MODEL


def ensure_dirs() -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    PENDING_DIR.mkdir(parents=True, exist_ok=True)


def acquire_lock():
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    fh = open(LOCK_PATH, "a+")
    fcntl.flock(fh.fileno(), fcntl.LOCK_EX)
    return fh


def load_sessions() -> dict[str, Any]:
    if not SESSIONS_PATH.exists():
        return {}
    try:
        return json.loads(SESSIONS_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def save_sessions(sessions: dict[str, Any]) -> None:
    SESSIONS_PATH.write_text(json.dumps(sessions, indent=2) + "\n", encoding="utf-8")


def pending_path(conversation_id: str, generation_id: str) -> Path:
    safe_c = conversation_id.replace("/", "_")
    safe_g = generation_id.replace("/", "_")
    d = PENDING_DIR / safe_c
    d.mkdir(parents=True, exist_ok=True)
    return d / f"{safe_g}.json"


def load_pending(conversation_id: str, generation_id: str) -> dict[str, Any]:
    path = pending_path(conversation_id, generation_id)
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def save_pending(conversation_id: str, generation_id: str, data: dict[str, Any]) -> None:
    path = pending_path(conversation_id, generation_id)
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def append_raw(payload: dict[str, Any]) -> None:
    slim = {
        "hook_event_name": payload.get("hook_event_name"),
        "conversation_id": payload.get("conversation_id") or payload.get("session_id"),
        "generation_id": payload.get("generation_id"),
        "model": payload.get("model"),
        "model_id": payload.get("model_id"),
        "ts": fmt_ts(utc_now()),
        "prompt_len": len(payload.get("prompt") or "") if isinstance(payload.get("prompt"), str) else None,
        "text_len": len(payload.get("text") or "") if isinstance(payload.get("text"), str) else None,
        "status": payload.get("status"),
    }
    with RAW_LOG_PATH.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(slim) + "\n")


def session_header(
    session_id: str,
    date_str: str,
    model: str,
    first_ts: str,
    last_ts: str,
    total: int,
) -> str:
    sid_short = short_id(session_id)
    return (
        "---\n"
        f"session_id: {session_id}\n"
        f"date: {date_str}\n"
        f"author: {AUTHOR}\n"
        f"model: {model}\n"
        f"tool: {TOOL}\n"
        f"project: {PROJECT}\n"
        f"total_exchanges: {total}\n"
        f"first_prompt_time: {first_ts}\n"
        f"last_prompt_time: {last_ts}\n"
        "---\n"
        "\n"
        f"# Session Log - {date_str}\n"
        "\n"
        f"Session: `{sid_short}` | Project: `{PROJECT}` | Author: `{AUTHOR}`\n"
        "\n"
        "---\n"
        "\n"
    )


FRONTMATTER_RE = re.compile(r"^---\n.*?\n---\n", re.S)


def patch_frontmatter(text: str, **fields: Any) -> str:
    match = FRONTMATTER_RE.match(text)
    if not match:
        return text
    block = match.group(0)
    for key, value in fields.items():
        block, n = re.subn(
            rf"^{re.escape(key)}:.*$",
            f"{key}: {value}",
            block,
            count=1,
            flags=re.M,
        )
        if n == 0:
            block = block.replace("\n---\n", f"\n{key}: {value}\n---\n", 1)
    return block + text[match.end() :]


def ensure_session(payload: dict[str, Any]) -> dict[str, Any]:
    conversation_id = (
        payload.get("conversation_id")
        or payload.get("session_id")
        or "unknown"
    )
    sessions = load_sessions()
    if conversation_id in sessions:
        meta = sessions[conversation_id]
        path = REPO_ROOT / meta["relpath"]
        if path.exists():
            return meta

    now = utc_now()
    ts = fmt_ts(now)
    date_str = now.strftime("%Y-%m-%d")
    fname = f"{now.strftime('%Y-%m-%d_%H-%M-%S')}_{conversation_id}.md"
    relpath = f".agent-logs/{fname}"
    path = REPO_ROOT / relpath
    path.write_text(
        session_header(conversation_id, date_str, model_name(payload), ts, ts, 0),
        encoding="utf-8",
    )
    meta = {
        "relpath": relpath,
        "session_id": conversation_id,
        "created": ts,
    }
    sessions[conversation_id] = meta
    save_sessions(sessions)
    return meta


def next_prompt_num(log_text: str) -> int:
    nums = [int(n) for n in re.findall(r"\[LOG_ENTRY type=PROMPT num=(\d+)", log_text)]
    return (max(nums) if nums else 0) + 1


def extract_text_from_transcript_message(obj: dict[str, Any]) -> str:
    message = obj.get("message") or obj
    content = message.get("content") if isinstance(message, dict) else None
    parts: list[str] = []
    if isinstance(content, list):
        for item in content:
            if isinstance(item, dict) and item.get("type") == "text":
                text = item.get("text")
                if isinstance(text, str):
                    parts.append(text)
            elif isinstance(item, str):
                parts.append(item)
    elif isinstance(content, str):
        parts.append(content)
    elif isinstance(obj.get("text"), str):
        parts.append(obj["text"])
    return "\n".join(parts).strip()


def unwrap_user_query(text: str) -> str:
    match = re.search(r"<user_query>\s*(.*?)\s*</user_query>", text, re.S)
    if match:
        return match.group(1)
    return text


def last_turn_from_transcript(transcript_path: str | None) -> tuple[str, str]:
    if not transcript_path:
        return "", ""
    path = Path(transcript_path)
    if not path.exists():
        return "", ""
    last_user = ""
    last_assistant = ""
    try:
        with path.open(encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                try:
                    obj = json.loads(line)
                except json.JSONDecodeError:
                    continue
                role = obj.get("role")
                text = extract_text_from_transcript_message(obj)
                if not text:
                    continue
                if role == "user":
                    last_user = unwrap_user_query(text)
                    last_assistant = ""
                elif role == "assistant":
                    last_assistant = text
    except OSError:
        return last_user, last_assistant
    return last_user, last_assistant


def format_entry(kind: str, num: int, session_id: str, ts: str, model: str, body: str) -> str:
    sid_short = short_id(session_id)
    body = body.replace("\r\n", "\n")
    if body and not body.endswith("\n"):
        body += "\n"
    return (
        f"[LOG_ENTRY type={kind} num={num} session={sid_short}]\n"
        f"timestamp: {ts}\n"
        f"model: {model}\n"
        f"\n"
        f"{body}"
        f"\n"
    )


def append_entries(meta: dict[str, Any], entries: list[str], model: str, prompt_ts: str | None) -> None:
    path = REPO_ROOT / meta["relpath"]
    text = path.read_text(encoding="utf-8") if path.exists() else ""
    if not text:
        payload = {"conversation_id": meta["session_id"], "model": model}
        meta = ensure_session(payload)
        path = REPO_ROOT / meta["relpath"]
        text = path.read_text(encoding="utf-8")

    existing_prompts = len(re.findall(r"\[LOG_ENTRY type=PROMPT num=", text))
    added_prompts = sum(1 for e in entries if e.startswith("[LOG_ENTRY type=PROMPT"))
    total = existing_prompts + added_prompts
    fields: dict[str, Any] = {"model": model, "total_exchanges": total}
    if prompt_ts:
        fields["last_prompt_time"] = prompt_ts
        if existing_prompts == 0:
            fields["first_prompt_time"] = prompt_ts
    text = patch_frontmatter(text, **fields)
    if not text.endswith("\n"):
        text += "\n"
    text += "".join(entries)
    path.write_text(text, encoding="utf-8")


def handle_session_start(payload: dict[str, Any]) -> dict[str, Any]:
    ensure_session(payload)
    return {}


def handle_before_submit(payload: dict[str, Any]) -> dict[str, Any]:
    meta = ensure_session(payload)
    conversation_id = meta["session_id"]
    generation_id = payload.get("generation_id") or f"prompt-{fmt_ts(utc_now())}"
    prompt = payload.get("prompt")
    if not isinstance(prompt, str):
        prompt = "" if prompt is None else json.dumps(prompt, ensure_ascii=False)
    ts = fmt_ts(utc_now())
    model = model_name(payload)
    pending = load_pending(conversation_id, generation_id)
    pending.update(
        {
            "prompt": prompt,
            "prompt_ts": ts,
            "model": model,
            "prompt_written": False,
            "response_written": False,
        }
    )
    save_pending(conversation_id, generation_id, pending)

    path = REPO_ROOT / meta["relpath"]
    log_text = path.read_text(encoding="utf-8") if path.exists() else ""
    if not pending.get("prompt_written"):
        num = int(pending.get("num") or next_prompt_num(log_text))
        pending["num"] = num
        save_pending(conversation_id, generation_id, pending)
        entry = format_entry("PROMPT", num, conversation_id, ts, model, prompt)
        append_entries(meta, [entry], model, ts)
        pending["prompt_written"] = True
        save_pending(conversation_id, generation_id, pending)

    return {"continue": True}


def handle_after_response(payload: dict[str, Any]) -> dict[str, Any]:
    meta = ensure_session(payload)
    conversation_id = meta["session_id"]
    generation_id = payload.get("generation_id") or "unknown"
    text = payload.get("text")
    if not isinstance(text, str):
        text = ""
    pending = load_pending(conversation_id, generation_id)
    pending["response"] = text
    pending["response_ts"] = fmt_ts(utc_now())
    pending["model"] = model_name(payload)
    save_pending(conversation_id, generation_id, pending)
    return {}


def handle_stop(payload: dict[str, Any]) -> dict[str, Any]:
    meta = ensure_session(payload)
    conversation_id = meta["session_id"]
    generation_id = payload.get("generation_id") or "unknown"
    model = model_name(payload)
    pending = load_pending(conversation_id, generation_id)

    transcript_user, transcript_assistant = last_turn_from_transcript(
        payload.get("transcript_path") or os.environ.get("CURSOR_TRANSCRIPT_PATH")
    )

    prompt = pending.get("prompt") or transcript_user or ""
    response = pending.get("response") or transcript_assistant or ""
    prompt_ts = pending.get("prompt_ts") or fmt_ts(utc_now())
    response_ts = pending.get("response_ts") or fmt_ts(utc_now())
    model = pending.get("model") or model

    path = REPO_ROOT / meta["relpath"]
    log_text = path.read_text(encoding="utf-8") if path.exists() else ""
    entries: list[str] = []
    num = int(pending.get("num") or next_prompt_num(log_text))
    if pending.get("prompt_written"):
        written_nums = [int(n) for n in re.findall(r"\[LOG_ENTRY type=PROMPT num=(\d+)", log_text)]
        if written_nums:
            num = written_nums[-1]
    elif prompt:
        entries.append(
            format_entry("PROMPT", num, conversation_id, prompt_ts, model, prompt)
        )
        pending["prompt_written"] = True

    if response and not pending.get("response_written"):
        entries.append(
            format_entry("RESPONSE", num, conversation_id, response_ts, model, response)
        )
        pending["response_written"] = True

    if entries:
        append_entries(meta, entries, model, prompt_ts if any(e.startswith("[LOG_ENTRY type=PROMPT") for e in entries) else None)

    pending["num"] = num
    pending["model"] = model
    save_pending(conversation_id, generation_id, pending)
    return {}


def main() -> int:
    ensure_dirs()
    raw = sys.stdin.read()
    if not raw.strip():
        print("{}")
        return 0
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        print("{}")
        return 0
    if not isinstance(payload, dict):
        print("{}")
        return 0

    event = payload.get("hook_event_name") or ""
    lock = acquire_lock()
    try:
        append_raw(payload)
        if event == "sessionStart":
            out = handle_session_start(payload)
        elif event == "beforeSubmitPrompt":
            out = handle_before_submit(payload)
        elif event == "afterAgentResponse":
            out = handle_after_response(payload)
        elif event == "stop":
            out = handle_stop(payload)
        else:
            out = {}
    except Exception as exc:
        try:
            (STATE_DIR / "error.log").write_text(f"{fmt_ts(utc_now())} {event} {exc}\n", encoding="utf-8")
        except OSError:
            pass
        out = {"continue": True} if event == "beforeSubmitPrompt" else {}
    finally:
        fcntl.flock(lock.fileno(), fcntl.LOCK_UN)
        lock.close()

    print(json.dumps(out))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
