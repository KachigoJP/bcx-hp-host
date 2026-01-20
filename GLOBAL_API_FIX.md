# Global API Populate Fix

## Problem

The Global API endpoint was returning a validation error:
```json
{
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Invalid key logo"
  }
}
```

This happened when making requests like:
```
http://localhost:1337/api/global?populate[logo][populate]=*&populate[headerMenus][populate]=*...
```

## Root Cause

The code was trying to populate fields that **don't exist** in the Strapi Global schema.

### Actual Global Schema
```json
{
  "siteName": "string",
  "siteDescription": "text",
  "favicon": "media",
  "contact": "component (repeatable)"
}
```

### Fields Code Was Trying to Populate (Don't Exist!)
- ❌ `logo`
- ❌ `headerMenus`
- ❌ `rightButtons`
- ❌ `footerMenus`
- ❌ `footerQuicklinks`

## Solution

### 1. Fixed Populate Syntax (18 files)

**Before:**
```typescript
globalService.get({
  populate: {
    "populate[logo][populate]": "*",
    "populate[headerMenus][populate]": "*",
    "populate[rightButtons][populate]": "*",
    "populate[footerMenus][populate]": "*",
    "populate[footerQuicklinks][populate]": "*",
  },
});
```

**After:**
```typescript
globalService.get({
  populate: "*",
});
```

This now populates all actual fields: `siteName`, `siteDescription`, `favicon`, and `contact`.

### 2. Updated TypeScript Interface

**File:** `src/utils/interfaces/global.ts`

**Before:**
```typescript
export interface GlobalInfo {
  siteName?: string;
  siteDescription?: string;
  logo?: StrapiImage;
  footerSlogan?: string;
  email?: string;
  // ... other non-existent fields
}
```

**After:**
```typescript
export interface ContactInfo {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface GlobalInfo {
  siteName: string;
  siteDescription: string;
  favicon?: {
    data: {
      id: number;
      attributes: StrapiImage;
    };
  };
  contact?: ContactInfo[];
  [key: string]: any; // For backward compatibility
}
```

## Files Modified

18 page files fixed:
1. `src/pages/404.tsx`
2. `src/pages/about.tsx`
3. `src/pages/achievement.tsx`
4. `src/pages/activity.tsx`
5. `src/pages/camping.tsx`
6. `src/pages/contact.tsx`
7. `src/pages/donate.tsx`
8. `src/pages/hiking.tsx`
9. `src/pages/join.tsx`
10. `src/pages/login.tsx`
11. `src/pages/new.tsx`
12. `src/pages/policy.tsx`
13. `src/pages/privacy.tsx`
14. `src/pages/register.tsx`
15. `src/pages/report.tsx`
16. `src/pages/team.tsx`
17. `src/pages/term.tsx`
18. `src/pages/workshop.tsx`

Plus:
- `src/utils/interfaces/global.ts` - Interface updated

## API Calls Now Work

### Before (Error)
```
GET http://localhost:1337/api/global?populate[logo][populate]=*...
→ 400 ValidationError: Invalid key logo
```

### After (Success)
```
GET http://localhost:1337/api/global?populate=*
→ 200 OK
{
  "data": {
    "siteName": "Bàn Chân Xanh",
    "siteDescription": "...",
    "favicon": { ... },
    "contact": [ ... ]
  }
}
```

## Testing

To verify the fix:

```bash
# Test the API directly
curl "http://localhost:1337/api/global?populate=*"

# Or visit any page in the app
npm run dev
# Visit http://localhost:3000/about
```

## Notes

- The `[key: string]: any` in GlobalInfo maintains backward compatibility
- If you need navigation menus, create separate content types in Strapi
- Contact information is now properly structured as a repeatable component

## Future Improvements

If you need the removed fields (logo, menus, etc.), you should:

1. **Add them to Strapi schema**: Edit `/bcx-strapi/src/api/global/content-types/global/schema.json`
2. **Create proper components**: For menus, buttons, etc.
3. **Update the interface**: Match the new Strapi schema
4. **Update populate calls**: Include the new fields

Example of adding a logo field to Strapi:
```json
{
  "logo": {
    "type": "media",
    "multiple": false,
    "allowedTypes": ["images"]
  }
}
```
