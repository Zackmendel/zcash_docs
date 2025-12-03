import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content/docs');

// 1. Get all Docs for the Sidebar
export interface Doc {
    id: string;
    title: string;
    category: string;
    contentHtml?: string;
    [key: string]: any;
}

export function getAllDocs(): Doc[] {
    // Recursive function to get all files
    function getFiles(dir: string): string[] {
        const subdirs = fs.readdirSync(dir);
        const files = subdirs.map((subdir) => {
            const res = path.resolve(dir, subdir);
            return (fs.statSync(res).isDirectory()) ? getFiles(res) : res;
        });
        return Array.prototype.concat(...files);
    }

    const files = getFiles(contentDirectory);

    return files.map((fileName) => {
        // Read file contents
        const fileContents = fs.readFileSync(fileName, 'utf8');
        // Parse Frontmatter
        const { data } = matter(fileContents);

        return {
            id: data.id,        // e.g. "rtd_pages/basics"
            title: data.title,  // e.g. "Zcash Basics"
            category: data.category, // e.g. "rtd_pages"
            // We don't send 'content' here to keep the sidebar payload small
        } as Doc;
    });
}

// 2. Get Single Doc Content
export async function getDocData(id: string): Promise<Doc> {
    const fullPath = path.join(contentDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse metadata section
    const { data, content } = matter(fileContents);

    // Convert Markdown to HTML (or pass raw MDX if using MDX)
    const processedContent = await remark()
        .use(html)
        .process(content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        title: data.title,
        category: data.category,
        ...data,
    } as Doc;
}
