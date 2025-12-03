"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search, Menu, X, ChevronRight, ChevronDown, Shield, Zap, Code,
    Database, Globe, BookOpen, ArrowRight, Github, Sun, Moon, List,
    Info, AlertTriangle, AlertCircle, CheckCircle
} from 'lucide-react';
import { Doc } from '../lib/docs';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';

// Icon mapper since we can't pass React components from server
interface DocsClientProps {
    navItems: Doc[];
    initialDoc: Doc;
}

const CATEGORY_ORDER = [
    'Basics',
    'Installation',
    'Wallets & Users',
    'Mining & Nodes',
    'Development',
    'Community',
    'Resources',
    'Guides',
    'General'
];

const getIconForCategory = (category: string) => {
    const map: Record<string, React.ReactNode> = {
        'Basics': <Globe size={20} />,
        'Installation': <Database size={20} />,
        'Wallets & Users': <Shield size={20} />,
        'Mining & Nodes': <Zap size={20} />,
        'Development': <Code size={20} />,
        'Community': <BookOpen size={20} />,
        'Resources': <BookOpen size={20} />,
        'Guides': <BookOpen size={20} />,
        'General': <Globe size={20} />,
    };
    return map[category] || <Zap size={20} />;
};

// Helper to slugify text
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
};

const WelcomePage = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
    const sections = [
        {
            title: "Getting Started",
            items: [
                { title: "Zcash Basics", desc: "New to Zcash? Learn about it all, from A to ZEC.", icon: "/images/box_zcash_basics.png", link: "source/rtd_pages/basics", internal: true },
                { title: "Zcashd Core Platform", desc: "How to join the Zcash network.", icon: "/images/box_zcashd_icon.png", link: "source/rtd_pages/zcashd", internal: true },
                { title: "Integration Guide", desc: "How to add Zcash to your project.", icon: "/images/box_zig_icon.png", link: "source/rtd_pages/zig", internal: true },
                { title: "Mobile Dev Resources", desc: "Example implementations of SDKs/APIs.", icon: "/images/box_mobile_icon.png", link: "source/rtd_pages/lightclient_support", internal: true },
            ]
        },
        {
            title: "Resources",
            items: [
                { title: "RPC Documentation", desc: "Details on zcashd commands.", icon: "/images/box_wallets_icon.png", link: "https://zcash.github.io/rpc/", internal: false },
                { title: "Community Chat", desc: "Say hi and see what we're up to on Discord.", icon: "/images/box_community_icon.png", link: "https://discord.gg/GGtsUzyp", internal: false },
            ]
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">Welcome to Zcash!</h1>
                <p className="text-lg text-zinc-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    This is the home for Zcash documentation for end users and developers. Check out our quickstarts, tutorials, API reference, and code examples.
                </p>
            </div>

            {sections.map((section) => (
                <div key={section.title}>
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                        {section.title === "Getting Started" ? <Zap className="text-yellow-500" /> : <BookOpen className="text-blue-500" />}
                        {section.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.items.map((item) => (
                            <div
                                key={item.title}
                                onClick={() => item.internal ? onNavigate(item.link) : window.open(item.link, '_blank')}
                                className="group cursor-pointer relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-300"
                            >
                                <div className="flex items-start space-x-5">
                                    <div className="flex-shrink-0 w-14 h-14 relative p-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl group-hover:bg-yellow-50 dark:group-hover:bg-yellow-900/20 transition-colors">
                                        <img src={item.icon} alt={item.title} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-zinc-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                                            {item.title}
                                            <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-gray-400 mt-2 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function DocsClient({ navItems, initialDoc }: DocsClientProps) {
    const router = useRouter();

    const [activeDoc, setActiveDoc] = useState(initialDoc);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [processedContent, setProcessedContent] = useState('');
    const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

    // Initialize Theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Process content to add IDs and generate TOC
    useEffect(() => {
        if (!activeDoc.contentHtml) return;

        const headings: { id: string; text: string; level: number }[] = [];
        const contentWithIds = activeDoc.contentHtml.replace(/<h([2-3])>(.*?)<\/h\1>/g, (match, level, text) => {
            const id = slugify(text.replace(/<[^>]*>/g, '')); // Strip HTML tags from text for ID
            headings.push({ id, text: text.replace(/<[^>]*>/g, ''), level: parseInt(level) });
            return `<h${level} id="${id}">${text}</h${level}>`;
        });

        setProcessedContent(contentWithIds);
        setToc(headings);
    }, [activeDoc]);

    // Syntax Highlighting, Copy Button & Admonitions
    useEffect(() => {
        if (!activeDoc.contentHtml && !processedContent) return;

        // Highlight
        Prism.highlightAll();

        // Add Copy Buttons
        const preTags = document.querySelectorAll('pre');
        preTags.forEach(pre => {
            if (pre.parentElement?.classList.contains('code-wrapper')) return; // Already processed

            // Wrap pre in a relative container
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper relative group mb-6';
            pre.parentNode?.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            // Create button
            const button = document.createElement('button');
            button.className = 'absolute top-2 right-2 p-2 rounded-md bg-zinc-700/50 hover:bg-zinc-600 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200';
            button.setAttribute('aria-label', 'Copy code');

            const copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
            const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

            button.innerHTML = copyIcon;

            button.onclick = () => {
                const code = pre.querySelector('code')?.innerText || '';
                navigator.clipboard.writeText(code);

                button.innerHTML = checkIcon;
                button.classList.add('text-green-400');

                setTimeout(() => {
                    button.innerHTML = copyIcon;
                    button.classList.remove('text-green-400');
                }, 2000);
            };

            wrapper.appendChild(button);
        });

        // Process Admonitions (Blockquotes)
        const blockquotes = document.querySelectorAll('blockquote');
        blockquotes.forEach(blockquote => {
            if (blockquote.classList.contains('admonition-processed')) return;

            const p = blockquote.querySelector('p');
            if (!p) return;

            const text = p.innerHTML;
            // Match "Note:", "Warning:", etc. at the start of the blockquote
            const match = text.match(/^(Note|Warning|Tip|Important|Caution):\s*(.*)/i);

            if (match) {
                const type = match[1].toLowerCase();
                const content = match[2];

                // Create Admonition Wrapper
                const wrapper = document.createElement('div');

                // Styles based on type
                let bgClass = '';
                let borderClass = '';
                let textClass = '';
                let iconHtml = '';

                switch (type) {
                    case 'note':
                        bgClass = 'bg-blue-50 dark:bg-blue-900/20';
                        borderClass = 'border-blue-500';
                        textClass = 'text-blue-800 dark:text-blue-200';
                        iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
                        break;
                    case 'warning':
                        bgClass = 'bg-yellow-50 dark:bg-yellow-900/20';
                        borderClass = 'border-yellow-500';
                        textClass = 'text-yellow-800 dark:text-yellow-200';
                        iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500 mt-0.5 flex-shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
                        break;
                    case 'tip':
                        bgClass = 'bg-green-50 dark:bg-green-900/20';
                        borderClass = 'border-green-500';
                        textClass = 'text-green-800 dark:text-green-200';
                        iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mt-0.5 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
                        break;
                    case 'important':
                        bgClass = 'bg-purple-50 dark:bg-purple-900/20';
                        borderClass = 'border-purple-500';
                        textClass = 'text-purple-800 dark:text-purple-200';
                        iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
                        break;
                    case 'caution':
                        bgClass = 'bg-red-50 dark:bg-red-900/20';
                        borderClass = 'border-red-500';
                        textClass = 'text-red-800 dark:text-red-200';
                        iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
                        break;
                    default:
                        bgClass = 'bg-gray-50 dark:bg-zinc-800';
                        borderClass = 'border-gray-500';
                        textClass = 'text-gray-800 dark:text-gray-200';
                }

                wrapper.className = `admonition admonition-${type} my-6 p-4 rounded-lg border-l-4 flex items-start space-x-3 ${bgClass} ${borderClass}`;

                wrapper.innerHTML = `
                    ${iconHtml}
                    <div class="flex-1">
                        <p class="font-bold text-sm uppercase tracking-wider mb-1 ${textClass}">${type}</p>
                        <div class="${textClass} text-sm leading-relaxed">${content}</div>
                    </div>
                `;

                blockquote.parentNode?.replaceChild(wrapper, blockquote);
            }
        });

    }, [activeDoc, processedContent]);

    // Sync state when URL/Server Prop changes
    useEffect(() => {
        setActiveDoc(initialDoc);
        if (initialDoc.category) {
            setOpenCategories(prev => ({ ...prev, [initialDoc.category]: true }));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [initialDoc]);

    const handleNavigate = (id: string) => {
        router.push(`/?doc=${id}`);
        setIsMobileMenuOpen(false);
        setSearchQuery('');
    };

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const categories = useMemo(() => {
        return navItems.reduce((acc: Record<string, Doc[]>, item: Doc) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});
    }, [navItems]);

    const sortedCategories = useMemo(() => {
        return Object.entries(categories).sort(([a], [b]) => {
            const indexA = CATEGORY_ORDER.indexOf(a);
            const indexB = CATEGORY_ORDER.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });
    }, [categories]);

    const sortedDocs = useMemo(() => {
        return sortedCategories.flatMap(([_, items]) => items);
    }, [sortedCategories]);

    const { prevDoc, nextDoc } = useMemo(() => {
        const currentIndex = sortedDocs.findIndex(doc => doc.id === activeDoc.id);
        if (currentIndex === -1) return { prevDoc: null, nextDoc: null };

        const prev = currentIndex > 0 ? sortedDocs[currentIndex - 1] : null;
        const next = currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : null;
        return { prevDoc: prev, nextDoc: next };
    }, [activeDoc.id, sortedDocs]);

    const filteredDocs = navItems.filter((doc: Doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const SidebarContent = () => (
        <div className="p-6">
            {sortedCategories.map(([category, items]: [string, Doc[]]) => (
                <div key={category} className="mb-4">
                    <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-gray-500 uppercase tracking-wider hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        <span>{category}</span>
                        {openCategories[category] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>

                    {openCategories[category] && (
                        <div className="space-y-1 mt-1 pl-2 border-l border-zinc-200 dark:border-zinc-800 ml-3">
                            {items.map((item: Doc) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigate(item.id)}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${activeDoc.id === item.id
                                        ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                                        : 'text-zinc-600 dark:text-gray-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                                        }`}
                                >
                                    <span className={`${activeDoc.id === item.id ? 'text-yellow-600 dark:text-yellow-500' : 'text-zinc-400 dark:text-gray-500 group-hover:text-zinc-900 dark:group-hover:text-white'}`}>
                                        {getIconForCategory(item.category)}
                                    </span>
                                    <span className="font-medium text-sm text-left line-clamp-1">{item.title}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white font-sans selection:bg-yellow-500/30 transition-colors duration-300">

            {/* Top Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-50 h-16 flex items-center justify-between px-4 lg:px-8 transition-colors duration-300">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xl">
                            Z
                        </div>
                        <span className="font-bold text-lg tracking-tight hidden sm:block">Zcash Docs</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4 flex-1 max-w-xl mx-4">
                    <div className="relative w-full group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-zinc-400 dark:text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg leading-5 bg-zinc-100 dark:bg-zinc-900/50 text-zinc-900 dark:text-gray-300 placeholder-zinc-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-black focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-all"
                        />
                        {/* Search Dropdown Results */}
                        {searchQuery && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50">
                                {filteredDocs.length > 0 ? (
                                    filteredDocs.map((doc: Doc) => (
                                        <button
                                            key={doc.id}
                                            onClick={() => handleNavigate(doc.id)}
                                            className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-0 flex items-center space-x-3"
                                        >
                                            <span className="text-zinc-400 dark:text-gray-400">{getIconForCategory(doc.category)}</span>
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900 dark:text-white">{doc.title}</p>
                                                <p className="text-xs text-zinc-500 dark:text-gray-500">{doc.category}</p>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-sm text-zinc-500 dark:text-gray-500">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <a href="https://github.com/Electric-Coin-Company/zcash-docs" target="_blank" rel="noreferrer" className="text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition hidden sm:block">
                        <Github size={20} />
                    </a>
                    <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>
                    <button className="text-yellow-600 dark:text-yellow-500 text-sm font-medium hover:text-yellow-500 dark:hover:text-yellow-400 transition">
                        v6.10.0
                    </button>
                </div>
            </nav>

            <div className="pt-16 flex max-w-8xl mx-auto">

                {/* Sidebar Desktop */}
                <aside className="hidden lg:block w-80 fixed h-[calc(100vh-4rem)] border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] transition-colors duration-300 flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                        <SidebarContent />
                    </div>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <a href="https://zcash.readthedocs.io/en/latest/rtd_pages/zcashd.html" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-500 flex items-center gap-2 transition-colors">
                            <BookOpen size={14} />
                            <span>Based on official Zcash Docs</span>
                        </a>
                    </div>
                </aside>

                {/* Sidebar Mobile */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-40 lg:hidden">
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                        <aside className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out flex flex-col">
                            <div className="flex-1 overflow-y-auto">
                                <SidebarContent />
                            </div>
                            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                                <a href="https://zcash.readthedocs.io/en/latest/rtd_pages/zcashd.html" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-500 flex items-center gap-2 transition-colors">
                                    <BookOpen size={14} />
                                    <span>Based on official Zcash Docs</span>
                                </a>
                            </div>
                        </aside>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 lg:pl-80 min-h-[calc(100vh-4rem)] transition-colors duration-300 flex">
                    <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-10 lg:py-12">
                        {/* Breadcrumbs */}
                        <div className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-gray-500 mb-8">
                            <span>Docs</span>
                            <ChevronRight size={14} />
                            <span>{activeDoc.category}</span>
                            <ChevronRight size={14} />
                            <span className="text-yellow-600 dark:text-yellow-500">{activeDoc.title}</span>
                        </div>

                        {/* Content Render */}
                        {activeDoc.id === 'source/index' ? (
                            <WelcomePage onNavigate={handleNavigate} />
                        ) : (
                            <article
                                className="prose prose-lg prose-zinc dark:prose-invert max-w-none 
                                prose-headings:text-zinc-900 dark:prose-headings:text-white 
                                prose-p:text-zinc-700 dark:prose-p:text-gray-300 
                                prose-a:text-yellow-600 dark:prose-a:text-yellow-500
                                prose-strong:text-zinc-900 dark:prose-strong:text-white"
                                dangerouslySetInnerHTML={{ __html: processedContent || activeDoc.contentHtml || '' }}
                            />
                        )}

                        {/* Pagination / Next Steps */}
                        {activeDoc.id !== 'source/index' && (
                            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => prevDoc && handleNavigate(prevDoc.id)}
                                    disabled={!prevDoc}
                                    className={`group flex flex-col items-start p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all ${prevDoc ? 'hover:border-yellow-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                >
                                    <span className="text-sm text-zinc-500 dark:text-gray-500 mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-500">Previous</span>
                                    <span className="font-semibold text-zinc-700 dark:text-gray-300 group-hover:text-zinc-900 dark:group-hover:text-white">{prevDoc ? prevDoc.title : 'None'}</span>
                                </button>
                                <button
                                    onClick={() => nextDoc && handleNavigate(nextDoc.id)}
                                    disabled={!nextDoc}
                                    className={`group flex flex-col items-end p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all ${nextDoc ? 'hover:border-yellow-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                >
                                    <span className="text-sm text-zinc-500 dark:text-gray-500 mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-500">Next</span>
                                    <span className="font-semibold text-zinc-700 dark:text-gray-300 group-hover:text-zinc-900 dark:group-hover:text-white">{nextDoc ? nextDoc.title : 'None'}</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Table of Contents */}
                    <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6 border-l border-zinc-200 dark:border-zinc-800">
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                <List size={16} />
                                On This Page
                            </h3>
                        </div>
                        <nav className="space-y-1">
                            {toc.map((heading) => (
                                <a
                                    key={heading.id}
                                    href={`#${heading.id}`}
                                    className={`block text-sm transition-colors duration-200 ${heading.level === 2
                                        ? 'text-zinc-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-500 font-medium'
                                        : 'text-zinc-500 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-500 pl-4'
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {heading.text}
                                </a>
                            ))}
                        </nav>
                    </aside>
                </main>
            </div>
        </div>
    );
}