#!/usr/bin/env python3
import json
import sys

data = json.load(sys.stdin)
cmd = data.get("tool_input", {}).get("command", "")

deny = False
reason = ""

if "git push" in cmd:
    deny = True
    reason = "Claude からの git push は禁止"
elif "git switch main" in cmd or "git checkout main" in cmd:
    deny = True
    reason = "Claude に main ブランチ操作をさせない"
elif "git merge" in cmd and "main" in cmd:
    deny = True
    reason = "Claude に main への merge をさせない"
elif "git rebase" in cmd and "main" in cmd:
    deny = True
    reason = "Claude に main への rebase をさせない"

if deny:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason
        }
    }))
    sys.exit(0)

sys.exit(0)