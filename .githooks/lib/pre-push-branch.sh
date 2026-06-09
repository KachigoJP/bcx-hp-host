#!/bin/sh

should_run_pre_push_for_branch() {
    branch_name=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")

    case "$branch_name" in
        develop|main)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

skip_pre_push_unless_protected_branch() {
    if should_run_pre_push_for_branch; then
        return 0
    fi

    branch_name=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
    echo "Skipping pre-push checks on branch '$branch_name' (only runs on develop or main)."
    exit 0
}
