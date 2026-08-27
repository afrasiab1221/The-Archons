/**
 * Loads all blog posts from `src/content/posts/*.md` at build time using
 * Vite's `import.meta.glob`. Each post's frontmatter (title, date, slug,
 * excerpt, etc.) is parsed once; the raw markdown body is returned to the
 * renderer on demand.
 *
 * Adding a new post:
 *   1. Drop a `.md` file into `src/content/posts/`
 *   2. Add the frontmatter (title, slug, date, excerpt, author, tags)
 *   3. Done — Vite picks it up at next build, no manual import needed.
 */

const modules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/**
 * Parse a minimal YAML-ish frontmatter block.
 * Supports strings, simple arrays (`['a', 'b']`), and numbers.
 * Real YAML is overkill for the metadata we use.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: raw }

  const [, fmBlock, body] = match
  const frontmatter = {}

  for (const line of fmBlock.split('\n')) {
    const m = line.match(/^([a-zA-Z]+):\s*(.*)$/)
    if (!m) continue
    const [, key, raw] = m
    let value = raw.trim()

    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    // Parse arrays: ['a', 'b']
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    }

    frontmatter[key] = value
  }

  return { frontmatter, body: body.trim() }
}

/**
 * Public: list of all posts, sorted newest first.
 * `body` is omitted from the listing to keep the bundle smaller.
 */
export function getAllPosts() {
  const posts = []

  for (const [path, raw] of Object.entries(modules)) {
    const { frontmatter, body } = parseFrontmatter(raw)
    if (!frontmatter.slug) continue

    posts.push({
      slug: frontmatter.slug,
      title: frontmatter.title || frontmatter.slug,
      date: frontmatter.date || '',
      // Accept either `excerpt` or `description` as the listing summary.
      // Some posts use `description` (SEO-style) instead of `excerpt`.
      excerpt: frontmatter.excerpt || frontmatter.description || '',
      author: frontmatter.author || 'The Archons',
      authorRole: frontmatter.authorRole || '',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      cover: frontmatter.cover || '',
      coverCaption: frontmatter.coverCaption || frontmatter.cover_caption || '',
      readingTime: frontmatter.readingTime || '',
      body,
      _path: path,
    })
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  return posts
}

/**
 * Public: load one post by slug. Returns the full object including body.
 */
export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null
}
