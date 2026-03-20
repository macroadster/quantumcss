#!/bin/bash
set -euo pipefail

if [ $# -ne 2 ]; then
  echo "Usage: $0 <search> <replace>"
  exit 1
fi

search="$1"
replace="$2"

export LC_ALL=C

grep -rl "$search" . --exclude-dir=.git --exclude="*.sock" --exclude="*.png" --exclude="*.jpg" --exclude="*.ico" --exclude="*.woff2" --exclude="*.lock" | while read -r file; do
  sed -i '' "s|$search|$replace|g" "$file"
done
