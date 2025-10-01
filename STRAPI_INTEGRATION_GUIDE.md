# Strapi Integration Guide

This project includes a comprehensive, reusable Strapi API client built with TypeScript and React hooks.

## 📁 File Structure

```
src/lib/strapi/
├── config.ts                      # Strapi client configuration
├── types.ts                       # TypeScript type definitions
├── index.ts                       # Main export file
├── hooks/
│   ├── useFetchCollection.ts      # Hook for fetching collections
│   └── useFetchSingle.ts          # Hook for fetching single entries
├── services/
│   ├── articleService.ts          # Article CRUD operations
│   ├── userService.ts             # User operations
│   ├── globalService.ts           # Global settings (single type)
│   └── authService.ts             # Authentication operations
├── examples/
│   └── usage-examples.tsx         # Practical usage examples
└── README.md                      # Detailed documentation
```

## 🚀 Quick Start

### 1. Environment Setup

The configuration is already set up to use the following defaults (see `src/lib/strapi/config.ts`):
- Strapi URL: `https://dev.cms.banchanxanh.com`
- API Token: Already configured

To override, create a `.env.local` file:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-url.com
NEXT_PUBLIC_STRAPI_TOKEN=your-api-token-here
```

### 2. Import Services and Hooks

```typescript
import { 
  articleService, 
  globalService, 
  authService,
  useFetchCollection,
  useFetchSingle 
} from '@/lib/strapi';

// Or with relative path:
import { articleService } from '../../../lib/strapi';
```

## 📖 Usage Examples

### Example 1: Fetch Data with Hook

```typescript
import { useFetchCollection, articleService } from '@/lib/strapi';

function ArticleList() {
  const { data, loading, error, refetch, pagination } = useFetchCollection(
    articleService.getAll,
    {
      pagination: { page: 1, pageSize: 10 },
      populate: ['author', 'coverImage'],
      sort: ['createdAt:desc']
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((article) => (
        <div key={article.id}>
          <h2>{article.attributes.title}</h2>
          <p>{article.attributes.content}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Example 2: Manual API Call

```typescript
import { globalService } from '@/lib/strapi';

useEffect(() => {
  globalService
    .get({ populate: "*" })
    .then((data) => {
      console.log("Global settings:", data);
      setSettings(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, []);
```

### Example 3: Authentication

```typescript
import { authService } from '@/lib/strapi';

// Login
const handleLogin = async () => {
  try {
    const response = await authService.login({
      identifier: 'user@example.com',
      password: 'password123'
    });
    console.log('Logged in:', response.user);
    // JWT is automatically stored in localStorage
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Check if authenticated
const isLoggedIn = authService.isAuthenticated();

// Get current user
const user = await authService.getMe();

// Logout
authService.logout();
```

### Example 4: CRUD Operations

```typescript
import { articleService, authService } from '@/lib/strapi';

const token = authService.getToken();

// Create
const newArticle = await articleService.create({
  title: 'New Article',
  content: 'Content here',
  slug: 'new-article'
}, token);

// Update
await articleService.update(1, { 
  title: 'Updated Title' 
}, token);

// Delete
await articleService.delete(1, token);
```

## 🔧 Advanced Features

### Complex Filtering

```typescript
const articles = await articleService.getAll({
  filters: {
    $or: [
      { title: { $containsi: 'react' } },
      { content: { $containsi: 'react' } }
    ],
    publishedAt: { $notNull: true },
    author: {
      name: { $eq: 'John Doe' }
    }
  },
  sort: ['publishedAt:desc', 'title:asc'],
  populate: {
    author: { fields: ['name', 'email'] },
    coverImage: { fields: ['url', 'alternativeText'] }
  },
  pagination: { page: 1, pageSize: 20 }
});
```

### Pagination

```typescript
function PaginatedList() {
  const [page, setPage] = useState(1);
  
  const { data, pagination } = useFetchCollection(
    articleService.getAll,
    {
      pagination: { page, pageSize: 10 }
    },
    { dependencies: [page] } // Refetch when page changes
  );

  return (
    <div>
      {/* ... display data ... */}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page} of {pagination?.pageCount}</span>
      <button onClick={() => setPage(page + 1)} disabled={page >= (pagination?.pageCount || 1)}>
        Next
      </button>
    </div>
  );
}
```

### Manual Refetch Control

```typescript
const { data, refetch } = useFetchCollection(
  articleService.getAll,
  { pagination: { pageSize: 10 } },
  { autoFetch: false } // Don't fetch automatically
);

// Fetch manually when needed
useEffect(() => {
  if (someCondition) {
    refetch();
  }
}, [someCondition]);
```

## 🎯 Creating New Services

To add a new content type (e.g., `categories`):

### 1. Define Types

Add to `src/lib/strapi/types.ts`:

```typescript
export interface Category {
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 2. Create Service

Create `src/lib/strapi/services/categoryService.ts`:

```typescript
import axios from 'axios';
import { getStrapiUrl, getStrapiHeaders } from '../config';
import { StrapiCollectionResponse, StrapiQueryParams } from '../types';
import type { Category } from '../types';

class CategoryService {
  private readonly endpoint = '/api/categories';

  async getAll(params?: StrapiQueryParams): Promise<StrapiCollectionResponse<Category>> {
    const response = await axios.get(getStrapiUrl(this.endpoint), {
      headers: getStrapiHeaders(),
      params: this.buildQueryParams(params)
    });
    return response.data;
  }

  // Add more methods: getById, create, update, delete...
  
  private buildQueryParams(params?: StrapiQueryParams): any {
    // Copy from articleService.ts
  }

  private handleError(error: any): StrapiError {
    // Copy from articleService.ts
  }
}

export default new CategoryService();
```

### 3. Export Service

Add to `src/lib/strapi/index.ts`:

```typescript
export { default as categoryService } from './services/categoryService';
```

### 4. Use It

```typescript
import { categoryService, useFetchCollection } from '@/lib/strapi';

const { data, loading } = useFetchCollection(
  categoryService.getAll,
  { sort: ['name:asc'] }
);
```

## 📋 Available Services

### `articleService`
- `getAll(params?)` - Get all articles
- `getById(id, params?)` - Get article by ID
- `getBySlug(slug, params?)` - Get article by slug
- `create(data, token)` - Create new article
- `update(id, data, token)` - Update article
- `delete(id, token)` - Delete article

### `userService`
- `getAll(token)` - Get all users
- `getById(id, token)` - Get user by ID
- `getMe(token)` - Get current user
- `update(id, data, token)` - Update user
- `delete(id, token)` - Delete user
- `getCount(token)` - Get user count

### `globalService`
- `get(params?)` - Get global settings
- `update(data, token)` - Update global settings

### `authService`
- `login(credentials)` - Login user
- `register(credentials)` - Register new user
- `logout()` - Logout user
- `getToken()` - Get JWT token
- `isAuthenticated()` - Check authentication status
- `getMe()` - Get current user info
- `forgotPassword(email)` - Request password reset
- `resetPassword(code, password, passwordConfirmation)` - Reset password
- `changePassword(currentPassword, newPassword, passwordConfirmation)` - Change password

## 🎨 TypeScript Support

All services and hooks are fully typed. The main types include:

- `StrapiCollectionResponse<T>` - Collection response structure
- `StrapiSingleResponse<T>` - Single entry response structure
- `StrapiQueryParams` - Query parameters for filtering, sorting, pagination
- `StrapiError` - Error response structure
- `AuthResponse` - Authentication response
- `Article`, `User`, `Global` - Content type interfaces

## 🔍 Real Example: Updated Footer Component

See `src/components/layout/Footer/index.tsx` for a real-world example of using the new Strapi client to replace direct axios calls.

## 📚 More Examples

Check `src/lib/strapi/examples/usage-examples.tsx` for comprehensive examples including:
- Fetch collections with hooks
- Fetch single entries
- Manual API calls
- Authentication flow
- CRUD operations
- Global settings
- Advanced filtering and pagination

## 🎯 Benefits

✅ **Type Safety** - Full TypeScript support  
✅ **Reusable** - Hooks and services can be used anywhere  
✅ **Consistent** - Standard patterns across all API calls  
✅ **Error Handling** - Built-in error formatting  
✅ **Extensible** - Easy to add new services  
✅ **Clean Code** - Separation of concerns (hooks, services, config)  
✅ **Best Practices** - Following React and TypeScript conventions

## 🚨 Migration Guide

To migrate existing API calls:

**Before:**
```typescript
import axios from 'axios';

useEffect(() => {
  axios('https://dev.cms.banchanxanh.com/api/global', {
    headers: {
      Authorization: 'Bearer token...'
    }
  }).then(response => {
    console.log(response.data.data);
    setData(response.data.data);
  });
}, []);
```

**After:**
```typescript
import { globalService } from '@/lib/strapi';

useEffect(() => {
  globalService.get({ populate: '*' })
    .then(data => {
      console.log(data);
      setData(data);
    })
    .catch(error => {
      console.error(error);
    });
}, []);
```

Or even better with hooks:
```typescript
import { useFetchSingle, globalService } from '@/lib/strapi';

const { data, loading, error } = useFetchSingle(
  globalService.get,
  '', // No ID needed for single types
  { populate: '*' }
);
```

## 📝 Notes

- JWT tokens are stored in `localStorage` by default
- For production, consider using httpOnly cookies for better security
- All services handle errors consistently
- The `@strapi/client` package is already installed
- Environment variables are optional (defaults are already configured)

---

For detailed API documentation, see `src/lib/strapi/README.md`

