# Strapi API Client

Reusable React code for calling Strapi APIs using `@strapi/client`.

## Structure

```
src/lib/strapi/
├── config.ts                 # Strapi client configuration
├── types.ts                  # TypeScript types and interfaces
├── hooks/
│   ├── useFetchCollection.ts # Hook for fetching collections
│   └── useFetchSingle.ts     # Hook for fetching single entries
├── services/
│   ├── articleService.ts     # Article CRUD operations
│   ├── userService.ts        # User operations
│   ├── globalService.ts      # Global settings
│   └── authService.ts        # Authentication operations
├── index.ts                  # Main export file
└── README.md                 # This file
```

## Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_STRAPI_URL=https://dev.cms.banchanxanh.com
NEXT_PUBLIC_STRAPI_TOKEN=your-api-token-here
```

## Usage Examples

### 1. Using Services Directly

```typescript
import { articleService } from '@/lib/strapi';

// Get all articles
const articles = await articleService.getAll({
  pagination: { page: 1, pageSize: 10 },
  populate: ['author', 'coverImage'],
  sort: ['createdAt:desc'],
});

// Get single article by ID
const article = await articleService.getById(1, {
  populate: '*',
});

// Get article by slug
const article = await articleService.getBySlug('my-article-slug');

// Create article (requires authentication)
const newArticle = await articleService.create(
  {
    title: 'New Article',
    content: 'Article content here',
    slug: 'new-article',
  },
  token
);

// Update article
await articleService.update(1, { title: 'Updated Title' }, token);

// Delete article
await articleService.delete(1, token);
```

### 2. Using Hooks in Components

```typescript
import { useFetchCollection } from '@/lib/strapi';
import { articleService } from '@/lib/strapi';

function ArticleList() {
  const { data, loading, error, refetch, pagination } = useFetchCollection(
    articleService.getAll,
    {
      pagination: { page: 1, pageSize: 10 },
      populate: ['author', 'coverImage'],
      sort: ['createdAt:desc'],
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

### 3. Using Single Entry Hook

```typescript
import { useFetchSingle } from '@/lib/strapi';
import { articleService } from '@/lib/strapi';

function ArticleDetail({ id }: { id: number }) {
  const { data, loading, error, refetch } = useFetchSingle(
    articleService.getById,
    id,
    { populate: '*' }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Article not found</div>;

  return (
    <div>
      <h1>{data.attributes.title}</h1>
      <div>{data.attributes.content}</div>
    </div>
  );
}
```

### 4. Authentication

```typescript
import { authService } from '@/lib/strapi';

// Login
const loginUser = async () => {
  try {
    const response = await authService.login({
      identifier: 'user@example.com',
      password: 'password123',
    });
    console.log('Logged in:', response.user);
    console.log('JWT:', response.jwt);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const registerUser = async () => {
  try {
    const response = await authService.register({
      username: 'newuser',
      email: 'user@example.com',
      password: 'password123',
    });
    console.log('Registered:', response.user);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const user = await authService.getMe();
    console.log('Current user:', user);
  } catch (error) {
    console.error('Not authenticated');
  }
};

// Logout
authService.logout();

// Check authentication status
const isLoggedIn = authService.isAuthenticated();
```

### 5. Global Settings

```typescript
import { globalService } from '@/lib/strapi';

// Get global settings
const settings = await globalService.get({
  populate: '*',
});

console.log(settings.siteName);
console.log(settings.email);
```

### 6. User Operations

```typescript
import { userService } from '@/lib/strapi';

const token = authService.getToken();

// Get all users (requires admin permissions)
const users = await userService.getAll(token);

// Get current user
const me = await userService.getMe(token);

// Update user profile
await userService.update(userId, { username: 'newusername' }, token);
```

## Advanced Usage

### Custom Query Parameters

```typescript
// Complex filters
const articles = await articleService.getAll({
  filters: {
    title: { $contains: 'React' },
    publishedAt: { $notNull: true },
    author: {
      name: { $eq: 'John Doe' },
    },
  },
  sort: ['publishedAt:desc', 'title:asc'],
  populate: {
    author: {
      fields: ['name', 'email'],
    },
    coverImage: {
      fields: ['url', 'alternativeText'],
    },
  },
  pagination: {
    page: 1,
    pageSize: 20,
  },
});
```

### Manual Refetch with Hook

```typescript
function ArticleList() {
  const { data, loading, refetch } = useFetchCollection(
    articleService.getAll,
    { pagination: { pageSize: 10 } },
    { autoFetch: false } // Don't fetch on mount
  );

  useEffect(() => {
    // Fetch manually when needed
    refetch();
  }, [someCondition]);

  return <div>{/* ... */}</div>;
}
```

## Extending the Services

To add a new service (e.g., `categoryService.ts`):

1. Create the service file in `src/lib/strapi/services/`
2. Follow the same pattern as `articleService.ts`
3. Add type definitions in `types.ts`
4. Export the service in `index.ts`

Example:

```typescript
// services/categoryService.ts
import axios from 'axios';
import { getStrapiUrl, getStrapiHeaders } from '../config';
import { StrapiCollectionResponse, StrapiQueryParams } from '../types';

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

class CategoryService {
  private readonly endpoint = '/api/categories';

  async getAll(params?: StrapiQueryParams): Promise<StrapiCollectionResponse<Category>> {
    const response = await axios.get(getStrapiUrl(this.endpoint), {
      headers: getStrapiHeaders(),
      params,
    });
    return response.data;
  }

  // Add more methods as needed...
}

export default new CategoryService();
```

Then export it in `index.ts`:

```typescript
export { default as categoryService } from './services/categoryService';
```

## Notes

- All services handle errors consistently and return formatted error objects
- Authentication tokens are stored in localStorage (consider using httpOnly cookies for production)
- The `useFetchCollection` and `useFetchSingle` hooks provide automatic loading/error states
- All services are singletons (instantiated once and exported)
- The configuration supports environment variables for easy deployment

