# Strapi Rich Text / Blocks Renderer

Component for rendering Strapi v5 Blocks editor content and legacy rich text formats.

## Features

- ✅ Supports Strapi v5 **Blocks Editor** (structured JSON)
- ✅ Backward compatible with **legacy HTML/Markdown** (string format)
- ✅ Type-safe with TypeScript
- ✅ Handles all block types: paragraphs, headings, lists, quotes, code, images
- ✅ Supports text formatting: bold, italic, underline, strikethrough, code
- ✅ Supports links with proper attributes

## Usage

### Basic Example

```tsx
import { BlocksRenderer } from "@/components/RichText";
import { PageContent } from "@/utils/interfaces";

const MyPage: React.FC<{ pageData: PageContent }> = ({ pageData }) => {
  return (
    <div>
      <h1>{pageData.title}</h1>

      {/* Render the rich text content */}
      <BlocksRenderer content={pageData.content} />
    </div>
  );
};
```

### With Custom Class

```tsx
<BlocksRenderer
  content={pageData.content}
  className="my-custom-rich-text"
/>
```

### In Dynamic Pages

```tsx
// pages/page/[slug].tsx
import { BlocksRenderer } from "@/components/RichText";

const DynamicPage: React.FC<DynamicPageProps> = ({ pageData }) => {
  return (
    <Layout>
      <div className="page-content">
        <h1>{pageData.title}</h1>

        {/* Render rich text content */}
        {pageData.content && (
          <BlocksRenderer content={pageData.content} />
        )}
      </div>
    </Layout>
  );
};
```

## Supported Block Types

### Text Blocks
- **Paragraph** - Regular text paragraphs
- **Heading** - H1 through H6 headings
- **Quote** - Blockquotes
- **Code** - Code blocks with `<pre><code>`

### List Blocks
- **Ordered List** - Numbered lists (`<ol>`)
- **Unordered List** - Bullet lists (`<ul>`)

### Media Blocks
- **Image** - Images with captions and alt text

### Text Formatting
- **Bold** - `<strong>`
- **Italic** - `<em>`
- **Underline** - `<u>`
- **Strikethrough** - `<s>`
- **Code** - Inline `<code>`
- **Link** - `<a>` with proper attributes

## Data Format

### Blocks Editor Format (Strapi v5)

```typescript
[
  {
    type: "paragraph",
    children: [
      { type: "text", text: "This is " },
      { type: "text", text: "bold text", bold: true },
      { type: "text", text: " and " },
      { type: "text", text: "italic text", italic: true }
    ]
  },
  {
    type: "heading",
    level: 2,
    children: [
      { type: "text", text: "This is a heading" }
    ]
  },
  {
    type: "image",
    image: {
      url: "/uploads/image.jpg",
      alternativeText: "Description",
      width: 800,
      height: 600
    }
  }
]
```

### Legacy Format (HTML String)

```typescript
"<p>This is <strong>bold text</strong> and <em>italic text</em></p>"
```

Both formats are automatically detected and rendered correctly.

## Styling

Add CSS to style the rendered content:

```css
.rich-text-content {
  font-size: 16px;
  line-height: 1.6;
}

.rich-text-content h1,
.rich-text-content h2,
.rich-text-content h3 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.rich-text-content p {
  margin-bottom: 1em;
}

.rich-text-content img {
  max-width: 100%;
  height: auto;
}

.rich-text-content blockquote {
  border-left: 4px solid #ccc;
  padding-left: 1em;
  font-style: italic;
  color: #666;
}

.rich-text-content pre {
  background: #f5f5f5;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

.rich-text-content code {
  background: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.rich-text-content ul,
.rich-text-content ol {
  margin-left: 1.5em;
  margin-bottom: 1em;
}

.rich-text-content a {
  color: #0066cc;
  text-decoration: underline;
}

.rich-text-content figure {
  margin: 2em 0;
}

.rich-text-content figcaption {
  text-align: center;
  font-size: 0.875em;
  color: #666;
  margin-top: 0.5em;
}
```

## Type Definitions

The component uses these type definitions from `/utils/interfaces/strapi_blocks.ts`:

```typescript
// Rich text can be:
// 1. Array of blocks (new format)
// 2. String (legacy format)
// 3. null (no content)
type StrapiRichText = StrapiBlockContent[] | string | null;
```

See [strapi_blocks.ts](../../utils/interfaces/strapi_blocks.ts) for complete type definitions.

## Comparison: Old vs New

### Before (using dangerouslySetInnerHTML)

```tsx
{pageData.content && (
  <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
)}
```

**Issues:**
- ❌ XSS vulnerability
- ❌ No type safety
- ❌ Doesn't work with new Blocks format

### After (using BlocksRenderer)

```tsx
{pageData.content && (
  <BlocksRenderer content={pageData.content} />
)}
```

**Benefits:**
- ✅ Type-safe
- ✅ Works with both formats
- ✅ Safer (React escapes text automatically)
- ✅ More maintainable

## Advanced: Custom Block Rendering

If you need custom rendering for specific block types, you can extend the component:

```tsx
// Create CustomBlocksRenderer.tsx
import BlocksRenderer from "./BlocksRenderer";

const CustomBlocksRenderer = ({ content }) => {
  // Pre-process content if needed
  const processedContent = content?.map(block => {
    if (block.type === "custom-type") {
      // Handle custom block type
      return { ...block, processed: true };
    }
    return block;
  });

  return <BlocksRenderer content={processedContent} />;
};
```

## Migration Guide

If you're migrating from string-based rich text to Blocks:

1. **Update types** - Already done in `page.ts`
2. **Replace dangerouslySetInnerHTML** - Use `<BlocksRenderer />` instead
3. **Test both formats** - Component handles both automatically
4. **Update Strapi** - Switch to Blocks editor in Strapi admin

No changes needed in your code - the component detects the format automatically!

## Troubleshooting

### Content not rendering
- Check that `content` is not undefined or null
- Verify the content format matches expected types
- Check browser console for warnings

### Images not loading
- Verify `getStrapiImageUrl()` is working correctly
- Check that image URLs are properly formatted
- Ensure CORS is configured if using external Strapi

### Unknown block type warning
- Check if Strapi added a new block type
- Extend the component to handle custom types
- Report the block type in console for debugging
