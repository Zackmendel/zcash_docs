# Content Conversion Scripts

This directory contains scripts to help migrate and process documentation content for the Zcash Docs application.

## `convert.sh`

This script is responsible for converting the original Zcash documentation (which may be in `.rst` or `.md` format) into the structure and format required by this Next.js application.

### Prerequisites

1.  **Pandoc**: This script uses `pandoc` to convert reStructuredText (`.rst`) files to Markdown (`.md`). You must have pandoc installed on your system.
    *   **macOS**: `brew install pandoc`
    *   **Ubuntu/Debian**: `sudo apt-get install pandoc`
    *   **Windows**: `winget install JohnMacFarlane.Pandoc`

2.  **Source Directory**: The script expects the source documentation to be located in a directory named `zcash-docs` in the project root. You may need to clone the original repository first:
    ```bash
    git clone https://github.com/zcash/zcash-docs.git zcash-docs
    ```

### Usage

1.  **Navigate to the project root**:
    ```bash
    cd /path/to/your/project
    ```

2.  **Make the script executable** (Linux/macOS only):
    ```bash
    chmod +x scripts/convert.sh
    ```

3.  **Run the script**:
    ```bash
    ./scripts/convert.sh
    ```
    *On Windows (Git Bash or WSL)*:
    ```bash
    bash scripts/convert.sh
    ```

### What it does

1.  **Cleans Output**: Removes the existing `content/docs` directory to ensure a fresh build.
2.  **Scans Files**: Recursively finds all `.rst` and `.md` files in the `zcash-docs` source directory.
3.  **Generates Frontmatter**: For each file, it:
    *   Extracts a **Title** (heuristically from the first header).
    *   Assigns a **Category** based on the filename (e.g., "basics", "wallet", "mining") or folder structure.
    *   Generates a unique **ID** based on the file path.
    *   Writes this metadata as YAML frontmatter at the top of the output file.
4.  **Converts Content**:
    *   If the source is `.rst`, it uses `pandoc` to convert it to GitHub Flavored Markdown.
    *   If the source is `.md`, it copies the content directly.
5.  **Output**: The processed files are saved to `content/docs` with a `.md` extension, ready for the Next.js app to consume.
