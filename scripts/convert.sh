#!/usr/bin/env bash

SRC_DIR="./zcash-docs"   # Path to the cloned repo
OUT_DIR="./content/docs" # Path where Next.js will read files

# 1. Clean previous builds
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

echo "🚀 Starting conversion..."

# 2. Find and convert
# -L follows symlinks
# We now look for both .rst AND .md files
find -L "$SRC_DIR" -type f \( -name "*.rst" -o -name "*.md" \) | while read -r file; do
  # Calculate relative path
  rel="${file#$SRC_DIR/}"
  
  # Determine extension
  ext="${file##*.}"
  
  # Create output filename (always .md)
  # If it was .rst, we swap extension. If .md, it stays .md
  out="$OUT_DIR/${rel%.$ext}.md"
  mkdir -p "$(dirname "$out")"

  # Extract a "Title" heuristic
  title=""
  
  # 1. Try Markdown H1-H6
  if [ "$ext" == "md" ]; then
     title=$(grep -E -m 1 "^#{1,6} " "$file" | sed -E 's/^#{1,6} //')
  fi
  
  # 2. If empty, try RST-style or just first non-special line
  if [ -z "$title" ]; then
    # We look for lines that are NOT directives, header decorations, orphan tags, or empty
    title=$(grep -v "^[\=\~\-\.\#]" "$file" | grep -v "^:orphan:" | grep -v "^\.\. meta::" | grep -v "^\.\. image::" | grep -v "^[[:space:]]*$" | head -n 1 | sed 's/^[ \t]*//;s/[ \t]*$//')
  fi
  
  if [ -z "$title" ]; then
    title="Untitled Doc"
  fi
  
  # Determine Category based on filename
  filename=$(basename "$rel")
  filename_no_ext="${filename%.*}"
  
  case "$filename_no_ext" in
    # Basics
    "basics"|"protocol"|"README")
      category="Basics" ;;
      
    # Installation
    "install_"*|*"_build"|"supported_platform_policy"|"Debian-Ubuntu-build"|"Linux-misc-build"|"macOS-build"|"raspi-build"|"windows-build")
      category="Installation" ;;
      
    # Wallets & Users
    "user_guide"|"zcash_wallets"|"wallet_"*|"ux_wallet_checklist"|"memos"|"addresses"|"privacy_"*|"security_"*|"troubleshooting_"*)
      category="Wallets & Users" ;;
      
    # Mining & Nodes
    "zcash_mining_"*|"zcash_conf_"*|"zcashd"|"lightwalletd"|"tor"|"dnsseed_"*|"logging_"*|"insight_"*)
      category="Mining & Nodes" ;;
      
    # Development
    "development_"*|"dev_tools"|"best_practices"|"nu_dev_"*|"payment_api"|"librustzcash_"*|"lightclient_"*|"sapling_"*|"shield_"*|"index_zips"|"zig")
      category="Development" ;;
      
    # Community
    "code_of_conduct"|"CONTRIBUTING"|"CODE_OF_CONDUCT"|"CHANGELOG"|"ecosystem")
      category="Community" ;;

    # Resources
    "funding"|"glossary"|"learning")
      category="Resources" ;;
      
    # Default fallback
    *)
      # Fallback to folder name if no match
      folder=$(dirname "$rel" | cut -d'/' -f1)
      if [ "$folder" == "." ]; then
        category="General"
      elif [ "$folder" == "source" ] || [ "$folder" == "rtd_pages" ]; then
        category="Guides"
      else
        category="$(tr '[:lower:]' '[:upper:]' <<< ${folder:0:1})${folder:1}"
      fi
      ;;
  esac

  echo "Processing: $rel -> [$category] $title"

  # 3. Write YAML Frontmatter
  echo "---" > "$out"
  echo "title: \"$title\"" >> "$out"
  echo "category: \"$category\"" >> "$out"
  echo "id: \"${rel%.$ext}\"" >> "$out"
  echo "---" >> "$out"
  echo "" >> "$out"

  # 4. Content Processing
  if [ "$ext" == "rst" ]; then
    # Convert RST to Markdown
    if ! pandoc "$file" -f rst -t gfm >> "$out" 2>/dev/null; then
       echo "⚠️ Warning: Pandoc had issues with $file (content might be partial)"
    fi
  else
    # It's already Markdown, just append the content
    cat "$file" >> "$out"
  fi
done

echo "✅ Conversion Complete. content/docs is ready."