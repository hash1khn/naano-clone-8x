# Capture test — 8x assignment

Capture is working. This file is the proof. Product work has not started.

## Tool and model (step 1)

- **Tool:** Cursor (Agent Chat in the IDE)
- **Model:** Cursor Grok 4.6. The same model plans and executes. Hook payloads report `model_id: grok-4.6` and `model: cursor-grok-4.6-high-fast` (this session) / `cursor-grok-4.6-high` (session 2).
- **Automatic mechanism:** Yes. Cursor hooks in `.cursor/hooks.json` run a command on every prompt and every end of turn. Project rules do **not** run commands; they are text injected into the model.

Checked before answering, not guessed:

- Cursor create-hook skill (`~/.cursor/skills-cursor/create-hook/SKILL.md`)
- Official docs: https://cursor.com/docs/hooks.md (`beforeSubmitPrompt`, `afterAgentResponse`, `stop`, `sessionStart`)
- On-disk transcripts at `~/.cursor/projects/Users-macbook-Downloads-naano-clone-8x/agent-transcripts/`
- No pre-existing `~/.cursor/hooks.json`

## Mechanism and config changed

**Mechanism:** project Cursor hooks. They fire without anyone remembering to run a command.

| Event | What it captures |
|---|---|
| `beforeSubmitPrompt` | user prompt, verbatim |
| `afterAgentResponse` | last assistant message for the turn (not thinking, not tool calls) |
| `stop` | writes the final response; falls back to the transcript if a prompt was missed |
| `sessionStart` | opens a new `.agent-logs/` file for that conversation |

**Config file changed:** `.cursor/hooks.json`

**Scripts:** `.cursor/hooks/capture.sh` → `.cursor/hooks/capture.py`

**Also added (not the capture mechanism):** `.cursor/rules/agent-capture.mdc` — assignment asked for a Cursor project rules file. Rules only tell the model not to edit logs. They do not append to `.agent-logs/`.

`.agent-logs/` is not in `.gitignore`.

## Log files the canaries landed in

- Canary 1 (this chat): `.agent-logs/2026-09-08_12-48-29_0f897242-bfa6-4cc6-ab2c-6cc8b4b5a424.md`
- Canary 2 (new chat): `.agent-logs/2026-09-08_12-48-51_150e5960-ca95-4ce6-bffb-bcf27c922583.md`

Canary 1 is `num=3` in its file because the first captured prompt is the assignment text, which contains indented example `[LOG_ENTRY]` lines. The counter originally matched those. That numbering is left as written. The script now only counts column-0 headers.

## Canary 1 — pasted raw

````
[LOG_ENTRY type=PROMPT num=3 session=0f897242]
timestamp: 2026-09-08T12:48:45.761Z
model: grok-4.6

CAPTURE TEST — 8x assignment, Hashir Ahmed Khan


[LOG_ENTRY type=RESPONSE num=3 session=0f897242]
timestamp: 2026-09-08T12:49:51.841Z
model: grok-4.6

Canary received. Capture is working.

**This session (canary 1)**  
Prompt is already in `.agent-logs/2026-09-08_12-48-29_0f897242-bfa6-4cc6-ab2c-6cc8b4b5a424.md`:

```
CAPTURE TEST — 8x assignment, Hashir Ahmed Khan
```

This reply is the matching response. The hook will append it when the turn ends.

**Second session (canary 2)**  
Already complete in `.agent-logs/2026-09-08_12-48-51_150e5960-ca95-4ce6-bffb-bcf27c922583.md` — prompt and response both present. The hook is not limited to the chat that installed it.

`CAPTURE-TEST.md` is not written yet on purpose: it has to paste this canary response *from the log*, and that line does not exist until this turn finishes.

Send any short follow-up here (`write CAPTURE-TEST.md` is enough). I will paste both raw canary pairs from the log files and stop there. Still no product build.
````

## Canary 2 — pasted raw

````
[LOG_ENTRY type=PROMPT num=1 session=150e5960]
timestamp: 2026-09-08T12:48:55.330Z
model: grok-4.6

CAPTURE TEST — 8x assignment, Hashir Ahmed Khan (session 2)

[LOG_ENTRY type=RESPONSE num=1 session=150e5960]
timestamp: 2026-09-08T12:49:34.032Z
model: grok-4.6

This is the **session 2 canary**. Capture already fired in this new chat, not only in the session that installed the hook.

**Prompt captured:** `.agent-logs/2026-09-08_12-48-51_150e5960-ca95-4ce6-bffb-bcf27c922583.md`

```
CAPTURE TEST — 8x assignment, Hashir Ahmed Khan (session 2)
```

**Canary response:** Hashir Ahmed Khan / Cursor Grok 4.6 / session `150e5960` — hook is installed and working in a second session.

Go back to the first Agent chat. After this reply is written into the log, that session can confirm both canaries and create `CAPTURE-TEST.md`. Do not start the product build yet.
````

## What was tried first that did not work

1. **This first user prompt happened before hooks existed.** `beforeSubmitPrompt` could not fire for it. `afterAgentResponse` + `stop` did fire after `hooks.json` was written; `stop` recovered the first prompt from the Cursor transcript. That is why exchange 1 is in the log at all.
2. **Script dry-run with a fake `test-session-…` payload** to check the markdown format. That file was deleted before any real turn. It was not an agent session and was not kept.
3. **`CAPTURE-TEST.md` could not be written inside the canary turn.** The canary response is only appended on `stop`, after the model finishes. Writing this file required a follow-up prompt so the canary pair could be copied from the log, not from memory.
4. **Exchange counter matched indented examples** inside the assignment prompt (`[LOG_ENTRY type=PROMPT num=1]` / `num=2` in the format spec). Canary 1 therefore landed as `num=3`. Existing entries were not edited. The counter was fixed to column-0 headers only, in a later commit.
