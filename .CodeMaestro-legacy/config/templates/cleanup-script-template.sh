#!/bin/bash
# CodeMaestro Cleanup Script
# Removes framework files before release
# Usage: ./cleanup.sh [--verify|--apply|--ci|--validate-build]

MODE=${1:---verify}

# Framework files to remove
FILES_TO_REMOVE=(
    ".CodeMaestro/"
    "CLAUDE.md"
)

# Color codes (for interactive mode)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

case "$MODE" in
    --verify)
        echo "Files that would be removed:"
        for file in "${FILES_TO_REMOVE[@]}"; do
            if [[ -e "$file" ]]; then
                echo "  - $file"
            fi
        done
        # Exit 1 = files found (for CI checks that expect clean state)
        exit 1
        ;;

    --apply)
        echo -e "${YELLOW}WARNING: This will permanently delete CodeMaestro framework files${NC}"
        echo "Files to be removed:"
        for file in "${FILES_TO_REMOVE[@]}"; do
            [[ -e "$file" ]] && echo "  - $file"
        done

        read -p "Continue? (yes/no): " confirm
        if [[ "$confirm" != "yes" ]]; then
            echo "Aborted."
            exit 1
        fi

        echo "Removing CodeMaestro framework..."
        for file in "${FILES_TO_REMOVE[@]}"; do
            if [[ -e "$file" ]]; then
                rm -rf "$file" && echo -e "${GREEN}  ✓ Removed $file${NC}"
            fi
        done
        echo -e "${GREEN}✅ Cleanup complete${NC}"
        exit 0
        ;;

    --ci)
        # Non-interactive mode for CI/CD
        for file in "${FILES_TO_REMOVE[@]}"; do
            rm -rf "$file" 2>/dev/null
        done
        exit 0
        ;;

    --validate-build)
        # Check if framework files exist in build artifacts
        # This is project-specific, provide template
        echo "Checking build artifacts for framework files..."

        # Example: Check Docker image
        if command -v docker &> /dev/null; then
            # docker run --rm your-image:tag ls -la | grep -E "\.CodeMaestro|CLAUDE\.md"
            echo "TODO: Add project-specific validation"
        fi

        # Example: Check dist/ or build/ directory
        if [[ -d "dist" ]]; then
            for file in "${FILES_TO_REMOVE[@]}"; do
                if [[ -e "dist/$file" ]]; then
                    echo -e "${RED}ERROR: Found $file in dist/${NC}"
                    exit 1
                fi
            done
        fi

        echo -e "${GREEN}✓ No framework files found in build artifacts${NC}"
        exit 0
        ;;

    *)
        echo "Usage: $0 [--verify|--apply|--ci|--validate-build]"
        echo ""
        echo "Modes:"
        echo "  --verify           Show what would be removed (default, safe)"
        echo "  --apply            Remove framework files (prompts for confirmation)"
        echo "  --ci               Remove files non-interactively (for CI/CD)"
        echo "  --validate-build   Check build artifacts for framework files"
        exit 2
        ;;
esac
