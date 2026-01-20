# Error (404) Content Type Setup

## Current Status

The 404 page is working with **hardcoded default content**. The `/api/error` endpoint returns 404 because the content type doesn't exist in Strapi yet.

**This is not a bug** - the page gracefully falls back to default content. You can leave it as-is or follow this guide to manage 404 content from Strapi CMS.

## What's Happening

When you visit a non-existent page:
1. App tries to fetch error content from `/api/error`
2. Strapi returns 404 (content type doesn't exist)
3. App catches the error and uses default content
4. User sees a working 404 page ✅

## Option 1: Keep Using Default Content (Recommended)

If you're happy with the current 404 page, **do nothing**. The page works perfectly with the hardcoded content defined in `src/pages/404.tsx`:

```typescript
const defaultErrorContent: ErrorContent = {
  mainTitle: "Ôi! Bạn đã lạc đường rồi",
  subtitle: "Không tìm thấy trang",
  description: "Trang bạn đang tìm kiếm không tồn tại...",
  primaryButton: { text: "Về trang chủ", link: "/" },
  secondaryButton: { text: "Khám phá hoạt động", link: "/activity" },
  // ... quick links
}
```

**Pros:**
- No setup needed
- Works immediately
- One less thing to manage in Strapi
- Faster (no API call)

**Cons:**
- Need to edit code to change 404 content
- Requires developer to update

## Option 2: Create Error Content Type in Strapi

If you want to manage 404 content from the Strapi admin panel, follow these steps:

### Step 1: Create the Content Type in Strapi

1. **Go to Strapi Admin**: http://localhost:1337/admin
2. **Content-Type Builder** → **Create new single type**
3. **Display name**: `Error`
4. **Click Continue**

### Step 2: Add Fields

Add these fields one by one:

| Field Name | Type | Settings |
|------------|------|----------|
| `mainTitle` | Text (Short text) | Required |
| `subtitle` | Text (Short text) | Optional |
| `description` | Text (Long text) | Optional |
| `primaryButton` | Component | New component: `ui.button` |
| `secondaryButton` | Component | Reuse: `ui.button` |
| `quickLinksTitle` | Text (Short text) | Optional |
| `quickLinks` | Component (Repeatable) | New component: `ui.link` |

### Step 3: Create Button Component

When adding `primaryButton`, create a new component:

**Component name**: `ui.button`
**Fields**:
- `text` - Text (Short text) - Required
- `link` - Text (Short text) - Required

### Step 4: Create Link Component

When adding `quickLinks`, create a new component:

**Component name**: `ui.link`
**Fields**:
- `title` - Text (Short text) - Required
- `link` - Text (Short text) - Required
- `icon` - Text (Short text) - Optional (e.g., "ti-angle-right")

### Step 5: Save and Publish

1. Click **Save**
2. Go to **Content Manager** → **Error**
3. Add your content
4. Click **Publish**

### Step 6: Set Permissions

1. Go to **Settings** → **Roles** → **Public**
2. Find **Error** in the list
3. Check **find** permission
4. Click **Save**

### Step 7: Test

Visit a non-existent page like http://localhost:3000/this-does-not-exist

The page should now use content from Strapi!

## Strapi Schema (For Reference)

If you want to create the schema manually, create this file:

**File**: `/bcx-strapi/src/api/error/content-types/error/schema.json`

```json
{
  "kind": "singleType",
  "collectionName": "errors",
  "info": {
    "singularName": "error",
    "pluralName": "errors",
    "displayName": "Error (404 Page)",
    "description": "Content for 404 error page"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "mainTitle": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "subtitle": {
      "type": "string",
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "description": {
      "type": "text",
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "primaryButton": {
      "type": "component",
      "component": "ui.button",
      "required": true
    },
    "secondaryButton": {
      "type": "component",
      "component": "ui.button"
    },
    "quickLinksTitle": {
      "type": "string",
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "quickLinks": {
      "type": "component",
      "component": "ui.link",
      "repeatable": true
    }
  }
}
```

Then create the components:

**File**: `/bcx-strapi/src/components/ui/button.json`
```json
{
  "collectionName": "components_ui_buttons",
  "info": {
    "displayName": "Button",
    "description": "Call to action button"
  },
  "options": {},
  "attributes": {
    "text": {
      "type": "string",
      "required": true
    },
    "link": {
      "type": "string",
      "required": true
    }
  }
}
```

**File**: `/bcx-strapi/src/components/ui/link.json`
```json
{
  "collectionName": "components_ui_links",
  "info": {
    "displayName": "Link",
    "description": "Simple link with optional icon"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "link": {
      "type": "string",
      "required": true
    },
    "icon": {
      "type": "string"
    }
  }
}
```

After creating the files, restart Strapi:
```bash
cd bcx-strapi
npm run develop
```

## Troubleshooting

### Still getting 404 error?

1. **Check content exists**: Go to Content Manager → Error → Make sure content is created
2. **Check it's published**: Click "Publish" button
3. **Check permissions**: Settings → Roles → Public → Error → find ✅
4. **Restart Strapi**: Sometimes needed after schema changes
5. **Check API directly**: Visit http://localhost:1337/api/error?populate=*

### Content not showing?

1. **Clear browser cache**
2. **Check browser console** for errors
3. **Verify Strapi is running** on port 1337
4. **Check error logs** in terminal

## Recommendation

**For now, keep using the default content.** The 404 page works perfectly as-is. Only create the Strapi content type if you:
- Need non-technical staff to update 404 content
- Want different 404 content per language/locale
- Have multiple 404 pages with different content

Otherwise, the hardcoded approach is simpler and faster! 🚀
