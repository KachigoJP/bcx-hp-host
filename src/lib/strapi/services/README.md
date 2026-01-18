# Strapi Services Architecture

A well-organized, maintainable service layer for Strapi CMS API interactions using the Factory Pattern.

## Directory Structure

```
services/
├── base/                    # Core service classes
│   ├── BaseService.ts       # Abstract base with shared functionality
│   ├── SingleTypeService.ts # For single-type content (about, contact, etc.)
│   ├── CollectionService.ts # For collections (articles, pages, etc.)
│   └── index.ts            # Barrel export
│
├── factory/                 # Service factory
│   ├── serviceFactory.ts    # Creates 20+ standard services
│   └── index.ts            # Barrel export
│
├── custom/                  # Services with specialized methods
│   ├── campingService.ts    # Extends SingleTypeService + custom method
│   ├── seoService.ts        # Extends SingleTypeService + custom method
│   ├── pageService.ts       # Extends CollectionService + custom method
│   └── index.ts            # Barrel export
│
├── auth/                    # Authentication & user management
│   ├── authService.ts       # Login, register, password management
│   ├── userService.ts       # User CRUD operations
│   └── index.ts            # Barrel export
│
├── utils/                   # Shared utilities
│   └── errorHandler.ts      # Unified error handling
│
└── index.ts                # Main barrel export (use this for imports!)
```

## Usage

### Import Services

All services are available from the main barrel export:

```typescript
import {
  // Factory-created services
  aboutService,
  articleService,
  globalService,

  // Custom services
  campingService,
  seoService,
  pageService,

  // Auth services
  authService,
  userService,

  // Base classes (for creating new services)
  BaseService,
  SingleTypeService,
  CollectionService
} from "@/lib/strapi/services";
```

### Using Services

#### Single-Type Services (from factory)
```typescript
// Get single-type content
const about = await aboutService.get({
  populate: '*'
});

// Update single-type content
await aboutService.update(data, authToken);
```

#### Collection Services (from factory)
```typescript
// Get all items
const articles = await articleService.getAll({
  filters: { published: true },
  pagination: { page: 1, pageSize: 10 }
});

// Get by ID
const article = await articleService.getById(1, { populate: '*' });

// Get by slug (NEW - works for any collection!)
const article = await articleService.getBySlug('my-article-slug');

// CRUD operations
await articleService.create(data, token);
await articleService.update(id, data, token);
await articleService.delete(id, token);
```

#### Custom Services
```typescript
// Page service with custom getByUrl
const page = await pageService.getByUrl('home-page', { populate: '*' });

// Camping service with custom query string method
const camping = await campingService.getWithQueryString(complexQueryString);

// SEO service with convenience method
const seo = await seoService.getByPageCode('about');
```

## Available Services

### Factory-Created Services (20 total)

**Single-Type Services:**
- `aboutService` - About page content
- `achievementService` - Achievement page content
- `activityService` - Activity page content
- `contactService` - Contact page content
- `donateService` - Donate page content
- `errorService` - 404 page content
- `globalService` - Global settings
- `hikingService` - Hiking page content
- `joinService` - Join page content
- `loginService` - Login page content
- `newsService` - News page content
- `policyService` - Policy page content
- `privacyService` - Privacy page content
- `registerService` - Register page content
- `reportService` - Report page content
- `teamService` - Team page content
- `termService` - Terms page content
- `workshopService` - Workshop page content

**Collection Services:**
- `articleService` - Articles collection (with getBySlug)
- `pageService` - Pages collection (with getBySlug)

### Custom Services (3 total)

- **`campingService`** - Extends SingleTypeService
  - Custom method: `getWithQueryString(queryString)` for complex dynamic zone queries

- **`seoService`** - Extends SingleTypeService
  - Custom method: `getByPageCode(pageCode)` for SEO lookups by page code

- **`pageService`** - Extends CollectionService
  - Custom method: `getByUrl(url)` for finding pages by URL field
  - Inherits: `getAll()`, `getById()`, `getBySlug()`, `create()`, `update()`, `delete()`

### Auth Services (2 total)

- **`authService`** - Authentication operations
  - Methods: `login()`, `register()`, `logout()`, `forgotPassword()`, `resetPassword()`, `changePassword()`, `getMe()`, `isAuthenticated()`, `getToken()`, `getUser()`

- **`userService`** - User management
  - Methods: `getAll()`, `getById()`, `getMe()`, `update()`, `delete()`, `getCount()`

## Creating New Services

### Add a Standard Service

Just add one line to [factory/serviceFactory.ts](factory/serviceFactory.ts):

```typescript
// For single-type content
export const myService = new SingleTypeService<MyContent>('/api/my-endpoint');

// For collection-type content
export const myCollectionService = new CollectionService<MyItem>('/api/my-items');
```

Then export it from [factory/index.ts](factory/index.ts) and [index.ts](index.ts).

### Create a Custom Service

If you need specialized methods, extend a base class:

```typescript
// custom/myCustomService.ts
import { SingleTypeService } from "../base";
import { MyContent } from "@/utils/interfaces";

class MyCustomService extends SingleTypeService<MyContent> {
  constructor() {
    super("/api/my-endpoint");
  }

  // Add your custom method
  async customMethod(param: string): Promise<MyContent> {
    // Custom logic here
    return this.get({ filters: { param } });
  }
}

const myCustomService = new MyCustomService();
export default myCustomService;
```

## Key Features

✅ **Generic `getBySlug()`** - Available on all collection services
✅ **Unified error handling** - Consistent across all services
✅ **Type-safe** - Full TypeScript support with generics
✅ **DRY principles** - Zero code duplication
✅ **Easy to extend** - Add new services with minimal code
✅ **Well-organized** - Logical folder structure by purpose
✅ **Factory Pattern** - 20 services in 1 file instead of 20 files

## Architecture Benefits

1. **Maintainability**: Changes to base functionality automatically apply to all services
2. **Scalability**: Adding new services requires minimal code
3. **Discoverability**: Clear folder structure makes it easy to find services
4. **Testability**: Base classes can be tested once and inherited behavior is guaranteed
5. **Consistency**: All services follow the same patterns and conventions

## Migration Notes

If migrating from the old structure:
- Old imports like `import aboutService from "@/lib/strapi/services/aboutService"`
- New imports: `import { aboutService } from "@/lib/strapi/services"`

All existing imports have been updated across the codebase.
