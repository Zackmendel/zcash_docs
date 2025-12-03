import { getAllDocs, getDocData } from '../lib/docs';
import DocsClient from './DocsClient'; // This is your current App component

export default async function Page({ searchParams }: { searchParams: Promise<{ doc?: string }> }) {
  // 1. Fetch Sidebar Data (Lightweight)
  const allDocs = getAllDocs();

  // 2. Determine which doc to show (URL param or default)
  const { doc } = await searchParams;
  const activeSlug = doc || allDocs[0]?.id;

  // 3. Fetch Full Content for active doc
  const activeDocData = await getDocData(activeSlug);

  // 4. Pass everything to the Client UI
  return (
    <DocsClient
      navItems={allDocs}
      initialDoc={activeDocData}
    />
  );
}
