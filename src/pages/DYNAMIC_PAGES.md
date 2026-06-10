# Dynamic Pages System

This system allows you to create dynamic pages based on URL slugs that fetch data from Strapi.

## Files Created

### 1. `/pages/[slug].tsx` - Simple Dynamic Route
**URL Pattern**: `/{slug}`
- Example: `/about`, `/contact`, `/services`
- Uses `getBySlug()` to fetch data directly

**Pros:**
- Simple implementation
- No extra lookup needed

**Cons:**
- Slightly slower (queries by slug every time)

### 2. `/pages/page/[slug].tsx` - Optimized Dynamic Route
**URL Pattern**: `/page/{slug}`
- Example: `/page/about`, `/page/contact`, `/page/services`
- Uses mapping to get documentId, then fetches by ID

**Pros:**
- Faster (uses documentId for direct lookup)
- More efficient for large page collections

**Cons:**
- Requires extra mapping step

### 3. `/utils/pageMapping.ts` - Slug to DocumentId Mapping
Utility functions for creating and using slug-to-documentId mappings.

## Usage Examples

### Example 1: Using Simple Dynamic Route

```typescript
// Access a page at: yoursite.com/about
// The slug "about" is passed to [slug].tsx
// Page data is fetched using pageService.getBySlug("about")
```

### Example 2: Using Optimized Dynamic Route

```typescript
// Access a page at: yoursite.com/page/about
// The slug "about" is passed to page/[slug].tsx
// System creates mapping: { "about": "abc123documentId..." }
// Page data is fetched using pageService.getById("abc123documentId...")
```

### Example 3: Using Page Mapping Utility

```typescript
import { getPageMapping, getDocumentIdBySlug } from "@/utils/pageMapping";

// Get all pages mapping
const mapping = await getPageMapping();
// Result: { "trang-chu": "zpqsb7nwluiskl69m1v3k53z", "about": "xyz789..." }

// Get documentId for a specific slug
const docId = getDocumentIdBySlug(mapping, "trang-chu");
// Result: "zpqsb7nwluiskl69m1v3k53z"

// Fetch page using documentId
const pageData = await pageService.getById(docId, { populate: {...} });
```

## How It Works

### Static Generation Flow

1. **Build Time (`getStaticPaths`)**:
   - Fetch all pages from Strapi
   - Extract slugs
   - Generate static HTML for each slug
   - Result: Pre-rendered pages for fast loading

2. **Request Time (`getStaticProps`)**:
   - Receive slug from URL
   - Fetch page data by slug (or by documentId via mapping)
   - Return page props
   - Result: Page rendered with correct data

3. **Runtime (ISR - Incremental Static Regeneration)**:
   - `revalidate: 60` means pages refresh every 60 seconds
   - First request after 60s triggers background regeneration
   - Subsequent requests get fresh data
   - Result: Always up-to-date content without full rebuild

### Fallback Modes

```typescript
fallback: "blocking" // Recommended
```

**Benefits:**
- Pages not pre-rendered will be generated on first request
- User waits for page to generate (better SEO)
- Once generated, cached for future requests

**Alternatives:**
- `fallback: false` - 404 for non-pre-rendered pages
- `fallback: true` - Shows loading state, then loads page (worse for SEO)

## Customization

### Change URL Pattern

**Option 1**: Root-level pages (`/about`)
- Use `/pages/[slug].tsx`

**Option 2**: Nested pages (`/page/about`)
- Use `/pages/page/[slug].tsx`

**Option 3**: Multi-level pages (`/pages/category/about`)
- Create `/pages/pages/[...slug].tsx` (catch-all route)

### Change Populate Fields

Edit the `populate` object in `getStaticProps`:

```typescript
const pageResponse = await pageService.getBySlug(slug, {
  populate: {
    // Add or remove fields as needed
    background: true,
    sections: {
      populate: {
        about: { populate: "*" },
        // Add more nested populates
      },
    },
  },
});
```

### Change Revalidation Time

```typescript
return {
  props: { ... },
  revalidate: 300, // Change to 5 minutes (300 seconds)
};
```

### Add Locale Support

```typescript
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = [];

  for (const locale of locales || ["vi-VN"]) {
    const pageMapping = await getPageMapping();
    const slugs = Object.keys(pageMapping);

    slugs.forEach((slug) => {
      paths.push({ params: { slug }, locale });
    });
  }

  return { paths, fallback: "blocking" };
};
```

## Performance Comparison

### Method 1: Direct Slug Query
```
Request → getBySlug("about") → Query DB with filter → Return data
Time: ~100-200ms
```

### Method 2: DocumentId Lookup
```
Request → Get mapping → Find documentId → getById(docId) → Return data
Time: ~50-100ms (faster, no filter needed)
```

## Which One Should You Use?

### Use Simple Route (`/pages/[slug].tsx`) if:
- You have < 50 pages
- Simplicity is more important than optimization
- You don't want extra complexity

### Use Optimized Route (`/pages/page/[slug].tsx`) if:
- You have > 50 pages
- Performance is critical
- You're comfortable with the mapping pattern

### Use Both:
- Simple route for special pages (home, about, contact)
- Optimized route for blog posts, articles, dynamic content

## Excluding Specific Slugs

If you want to exclude the home page or other specific pages:

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  const pageMapping = await getPageMapping();
  const slugs = Object.keys(pageMapping);

  // Filter out specific slugs
  const filteredSlugs = slugs.filter(
    (slug) => !["trang-chu", "home"].includes(slug)
  );

  const paths = filteredSlugs.map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: "blocking" };
};
```

## Debugging

Add logging to see what's happening:

```typescript
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  console.log("=== Dynamic Page Debug ===");
  console.log("Slug:", slug);

  const pageMapping = await getPageMapping();
  console.log("Available slugs:", Object.keys(pageMapping));

  const documentId = getDocumentIdBySlug(pageMapping, slug);
  console.log("DocumentId:", documentId);

  // ... rest of code
};
```

## Testing

1. **Development Mode**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/about (or /page/about)
   ```

2. **Production Build**:
   ```bash
   npm run build
   npm run start
   # Check .next/server/pages for pre-rendered HTML
   ```

3. **Verify Static Generation**:
   Look for these files after build:
   - `.next/server/pages/[slug].html`
   - `.next/server/pages/page/[slug].html`

## Troubleshooting

### Pages Return 404
- Check that slug exists in Strapi
- Verify `publicationState: "live"`
- Ensure locale matches (`vi-VN` vs `en`)

### Slow Page Loads
- Use optimized route with documentId lookup
- Reduce populate depth
- Increase `revalidate` time

### Stale Data
- Decrease `revalidate` time
- Or use `fallback: "blocking"` with on-demand revalidation

## Next Steps

1. Choose which route pattern you prefer
2. Customize the page rendering in the component
3. Add styling for sections
4. Configure revalidation settings
5. Test with your Strapi data
