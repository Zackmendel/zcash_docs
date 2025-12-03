# Zcash Documentation (Modernized)

This project is a modernized, high-performance version of the Zcash documentation, rebuilt using **Next.js 15**, **Tailwind CSS**, and **TypeScript**. It offers a significantly improved user experience, visual aesthetics, and maintainability compared to the original ReadTheDocs implementation.

## 🚀 Key Upgrades & Features

### 1. Modern Tech Stack
- **Next.js 15 (App Router)**: Utilizes the latest React framework features for server-side rendering, static generation, and fast client-side navigation.
- **Tailwind CSS**: A utility-first CSS framework ensuring a consistent, responsive, and easily customizable design system.
- **TypeScript**: Provides type safety and better developer experience.

### 2. Enhanced User Experience (UX)
- **Dark & Light Mode**: Fully supported built-in theme switching that persists user preference.
- **Responsive Design**: Optimized for all devices, from large desktops to mobile phones, with a collapsible mobile sidebar.
- **Instant Search**: Client-side search functionality allows users to quickly find documentation pages.
- **Smooth Navigation**: Client-side routing ensures instant page transitions without full reloads.

### 3. Premium UI Components
- **Custom Welcome Page**: A visually engaging landing page with interactive cards for quick access to key sections (Getting Started, Resources, etc.).
- **Admonitions (Callouts)**: Beautifully styled blocks for **Notes**, **Warnings**, **Tips**, **Important**, and **Caution** messages, automatically parsed from standard Markdown blockquotes.
- **Syntax Highlighting**: Integrated **PrismJS** for beautiful code block highlighting with support for multiple languages (Rust, JSON, Bash, etc.).
- **Copy-to-Clipboard**: One-click copy button for all code blocks with visual feedback.
- **Sticky Sidebar Footer**: A reference link to the official documentation is always visible at the bottom of the sidebar.

### 4. Content Management
- **Markdown Support**: Content is sourced from standard Markdown files, making it easy to migrate and maintain.
- **Automated Conversion Scripts**: Includes scripts (in the `scripts/` folder) to help convert and organize content from the original documentation structure.

## 🛠️ How to Run Locally

1.  **Prerequisites**: Ensure you have **Node.js** (v18 or higher) installed.

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **View the App**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 How to Deploy to Vercel

This project is optimized for deployment on [Vercel](https://vercel.com/), the creators of Next.js.

1.  **Push to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Import Project**: Go to Vercel dashboard and click **"Add New..."** -> **"Project"**.
3.  **Select Repository**: Choose your GitHub repository.
4.  **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected)
    - **Root Directory**: `./` (default)
    - **Build Command**: `next build` (default)
    - **Output Directory**: `.next` (default)
5.  **Deploy**: Click **"Deploy"**. Vercel will build and host your documentation site globally.

## 📂 Project Structure

- **`app/`**: Contains the main application code (Pages, Components, Layouts).
- **`content/`**: Stores the Markdown documentation files.
- **`public/`**: Static assets like images and icons.
- **`lib/`**: Utility functions (e.g., Markdown parsing logic).
- **`scripts/`**: Helper scripts for content migration and processing.

## 🔄 Content Migration

This project includes a powerful script to migrate and format documentation from the original Zcash repository.

### Using `convert.sh`

The `scripts/convert.sh` script automates the process of converting `.rst` and `.md` files from the source `zcash-docs` repo into the format required by this app.

**Prerequisites:**
- **Pandoc** must be installed on your system (for `.rst` to `.md` conversion).
- The original `zcash-docs` repository should be cloned into the root of this project.

**How to Run:**
```bash
# Make executable (Linux/macOS)
chmod +x scripts/convert.sh

# Run the script
./scripts/convert.sh
```

For detailed instructions and troubleshooting, please refer to the **[Scripts README](scripts/README.md)**.
