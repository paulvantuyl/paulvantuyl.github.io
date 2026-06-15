import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const POSTS_PER_PAGE = Number.parseInt(process.env.POSTS_PER_PAGE ?? '12', 10);

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const projectRoot = path.resolve(scriptDir, '..');
const postsDir = path.join(projectRoot, 'src', 'content', 'posts');
const outputDir = path.join(projectRoot, 'public', 'weblog');

function stripQuotes(value) {
    if (!value) {
        return '';
    }

    const trimmed = value.trim();
    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"'))
        || (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed.slice(1, -1);
    }

    return trimmed;
}

function parseScalar(value) {
    const unquoted = stripQuotes(value);

    if (unquoted === 'true') {
        return true;
    }

    if (unquoted === 'false') {
        return false;
    }

    return unquoted;
}

function parseFrontmatter(fileContent) {
    if (!fileContent.startsWith('---')) {
        return { frontmatter: {}, body: fileContent.trim() };
    }

    const endIndex = fileContent.indexOf('\n---', 4);
    if (endIndex === -1) {
        return { frontmatter: {}, body: fileContent.trim() };
    }

    const rawFrontmatter = fileContent.slice(3, endIndex).trim();
    const body = fileContent.slice(endIndex + 4).trim();

    const frontmatter = {};
    const lines = rawFrontmatter.split(/\r?\n/);
    let currentListKey = null;

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) {
            continue;
        }

        const listItemMatch = /^-\s+(.+)$/.exec(trimmed);
        if (listItemMatch && currentListKey) {
            frontmatter[currentListKey].push(parseScalar(listItemMatch[1]));
            continue;
        }

        const keyValueMatch = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(trimmed);
        if (!keyValueMatch) {
            continue;
        }

        const key = keyValueMatch[1];
        const rawValue = keyValueMatch[2];

        if (rawValue === '') {
            currentListKey = key;
            frontmatter[key] = [];
            continue;
        }

        currentListKey = null;
        frontmatter[key] = parseScalar(rawValue);
    }

    return { frontmatter, body };
}

function extractDateForSort(post) {
    const value = post.date;
    if (typeof value === 'string' && value.length > 0) {
        const isoLike = value.includes(' ') ? value.replace(' ', 'T') : value;
        const parsed = Date.parse(isoLike);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }

    const filenameDate = /^([0-9]{4}-[0-9]{1,2}-[0-9]{1,2})/.exec(post.sourceFile);
    if (filenameDate) {
        const parsed = Date.parse(filenameDate[1]);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }

    return 0;
}

function createSlug(fileName) {
    return fileName
        .replace(/\.md$/i, '')
        .replace(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}-/, '');
}

function toPostSummary(fileName, frontmatter, body) {
    const excerpt = body.split(/\n\s*\n/)[0]?.trim() ?? '';
    const tags = Array.isArray(frontmatter.tags)
        ? frontmatter.tags
        : frontmatter.tags
            ? [frontmatter.tags]
            : [];

    return {
        sourceFile: fileName,
        slug: createSlug(fileName),
        title: typeof frontmatter.title === 'string' ? frontmatter.title : createSlug(fileName),
        date: typeof frontmatter.date === 'string' ? frontmatter.date : null,
        published: frontmatter.published !== false,
        category: typeof frontmatter.category === 'string' ? frontmatter.category : null,
        tags,
        active: typeof frontmatter.active === 'string' ? frontmatter.active : null,
        image_thumb: typeof frontmatter.image_thumb === 'string' ? frontmatter.image_thumb : null,
        image: typeof frontmatter.image === 'string' ? frontmatter.image : null,
        link_destination: typeof frontmatter.link_destination === 'string' ? frontmatter.link_destination : null,
        excerpt,
    };
}

async function getPostFiles() {
    const entries = await fs.readdir(postsDir, { withFileTypes: true });
    return entries
        .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
        .map((entry) => entry.name);
}

async function buildPosts() {
    const files = await getPostFiles();
    const posts = [];

    for (const fileName of files) {
        const filePath = path.join(postsDir, fileName);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { frontmatter, body } = parseFrontmatter(fileContent);
        const post = toPostSummary(fileName, frontmatter, body);

        if (post.published && post.active === 'blog') {
            posts.push(post);
        }
    }

    posts.sort((a, b) => extractDateForSort(b) - extractDateForSort(a));
    return posts;
}

function paginatePosts(posts) {
    const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
    const pages = [];

    for (let index = 0; index < totalPages; index += 1) {
        const pageNumber = index + 1;
        const start = index * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;
        pages.push({
            page: pageNumber,
            totalPages,
            totalPosts: posts.length,
            postsPerPage: POSTS_PER_PAGE,
            posts: posts.slice(start, end),
        });
    }

    return pages;
}

async function writePaginationFiles(pages) {
    await fs.mkdir(outputDir, { recursive: true });

    const pageFiles = [];
    for (const page of pages) {
        const fileName = `posts-page-${page.page}.json`;
        const pagePath = path.join(outputDir, fileName);
        await fs.writeFile(pagePath, `${JSON.stringify(page, null, 2)}\n`, 'utf8');
        pageFiles.push(fileName);
    }

    const manifest = {
        generatedAt: new Date().toISOString(),
        totalPosts: pages[0]?.totalPosts ?? 0,
        totalPages: pages[0]?.totalPages ?? 1,
        postsPerPage: POSTS_PER_PAGE,
        pageFiles,
        allPostsFile: 'posts-all.json',
    };

    const manifestPath = path.join(outputDir, 'posts-manifest.json');
    await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

async function writeAllPostsFile(posts) {
    const allPostsPath = path.join(outputDir, 'posts-all.json');
    const allPostsPayload = {
        generatedAt: new Date().toISOString(),
        totalPosts: posts.length,
        posts,
    };

    await fs.writeFile(allPostsPath, `${JSON.stringify(allPostsPayload, null, 2)}\n`, 'utf8');
}

async function generateBlogData() {
    const posts = await buildPosts();
    const pages = paginatePosts(posts);
    await writePaginationFiles(pages);
    await writeAllPostsFile(posts);

    console.log(`Generated ${posts.length} blog posts across ${pages.length} pages.`);
    console.log(`Output written to ${path.relative(projectRoot, outputDir)}`);
}

generateBlogData().catch((error) => {
    console.error('Failed to generate blog data.', error);
    process.exitCode = 1;
});
