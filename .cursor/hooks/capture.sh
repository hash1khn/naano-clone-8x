#!/bin/bash
# Cursor hook entrypoint for 8x agent-log capture.
# Resolves Python even when the hook PATH is minimal.
DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -x /opt/homebrew/bin/python3 ]; then
  exec /opt/homebrew/bin/python3 "$DIR/capture.py"
elif [ -x /usr/bin/python3 ]; then
  exec /usr/bin/python3 "$DIR/capture.py"
else
  exec python3 "$DIR/capture.py"
fi
