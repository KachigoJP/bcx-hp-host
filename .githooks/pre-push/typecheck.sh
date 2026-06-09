#!/bin/sh
. "$(dirname "$0")/../lib/pre-push-branch.sh"

skip_pre_push_unless_protected_branch

npm run typecheck
