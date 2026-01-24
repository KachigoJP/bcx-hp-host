# Logging System Guide

This project includes a comprehensive logging system to help with debugging and monitoring.

## Features

- **Multiple Log Levels**: DEBUG, INFO, WARN, ERROR, NONE
- **Environment-based Configuration**: Automatic level adjustment based on NODE_ENV
- **Structured Logging**: Log messages with contextual data
- **Namespacing**: Organize logs by module/component
- **Colorized Output**: Easy-to-read colored console output (Node.js)
- **Timestamps**: Track when events occur
- **Type-safe**: Full TypeScript support

## Quick Start

### 1. Import the Logger

```typescript
import { createLogger } from '@/utils/logger';

// Create a logger for your module
const logger = createLogger('MyComponent');
```

### 2. Use Different Log Levels

```typescript
// Debug - detailed information for debugging
logger.debug('User data loaded', { userId: 123, name: 'John' });

// Info - general informational messages
logger.info('Page rendered successfully', { page: '/home' });

// Warn - warning messages
logger.warn('API response slow', { responseTime: 3000 });

// Error - error messages with error object
logger.error('Failed to fetch data', error, { endpoint: '/api/users' });
```

## Configuration

### Environment Variables

Add to your `.env.local` file:

```bash
# Log levels: DEBUG, INFO, WARN, ERROR, NONE
NEXT_PUBLIC_LOG_LEVEL=DEBUG
```

### Log Levels by Environment

**Development (default)**:
- `DEBUG` - Shows all logs (debug, info, warn, error)

**Production (recommended)**:
- `WARN` - Shows only warnings and errors

**Testing**:
- `ERROR` - Shows only errors

## Usage Examples

### 1. In Components

```typescript
// src/components/UserProfile.tsx
import { createLogger } from '@/utils/logger';

const logger = createLogger('Components:UserProfile');

export function UserProfile({ userId }: { userId: string }) {
  useEffect(() => {
    logger.info('UserProfile mounted', { userId });

    fetchUserData(userId)
      .then(data => {
        logger.debug('User data loaded', { userId, data });
      })
      .catch(error => {
        logger.error('Failed to load user data', error, { userId });
      });
  }, [userId]);

  return <div>...</div>;
}
```

### 2. In API Services

```typescript
// src/services/api.ts
import { createLogger } from '@/utils/logger';

const logger = createLogger('API:UserService');

export async function getUser(id: string) {
  logger.debug('Fetching user', { id });

  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      logger.warn('User fetch returned non-200 status', {
        id,
        status: response.status,
      });
    }

    const data = await response.json();
    logger.info('User fetched successfully', { id });
    return data;
  } catch (error) {
    logger.error('User fetch failed', error as Error, { id });
    throw error;
  }
}
```

### 3. In Next.js Pages

```typescript
// src/pages/users/[id].tsx
import { GetServerSideProps } from 'next';
import { createLogger } from '@/utils/logger';

const logger = createLogger('Pages:UserDetail');

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  logger.info('Rendering user detail page', { id });

  try {
    const user = await fetchUser(id);
    logger.debug('User data fetched for SSR', { id, user });

    return {
      props: { user },
    };
  } catch (error) {
    logger.error('Failed to fetch user for SSR', error as Error, { id });
    return {
      notFound: true,
    };
  }
};
```

### 4. In Strapi Services (Already Implemented)

```typescript
// src/lib/strapi/services/base/CollectionService.ts
import { createLogger } from '@/utils/logger';

export class CollectionService<T> extends BaseService<T> {
  protected logger;

  constructor(endpoint: string) {
    super(endpoint);
    this.logger = createLogger(`Strapi:Collection:${endpoint}`);
  }

  async getBySlug(slug: string, params?: StrapiQueryParams) {
    this.logger.debug('Fetching item by slug', { slug, params });

    try {
      const response = await axios.get(url, config);
      this.logger.debug('Item fetched successfully', {
        slug,
        status: response.status,
      });
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch item', error as Error, { slug });
      throw error;
    }
  }
}
```

## Pre-configured Loggers

For convenience, some loggers are pre-configured:

```typescript
import { loggers } from '@/utils/logger';

// Use pre-configured loggers
loggers.strapi.info('Connected to Strapi');
loggers.api.debug('API call made', { endpoint: '/users' });
loggers.pages.info('Page rendered', { path: '/home' });
loggers.components.debug('Component mounted', { name: 'Header' });
loggers.utils.debug('Utility function called', { fn: 'formatDate' });
```

## Child Loggers

Create child loggers for sub-modules:

```typescript
const parentLogger = createLogger('Auth');
const loginLogger = parentLogger.child('Login');
const signupLogger = parentLogger.child('Signup');

loginLogger.info('User logged in'); // [Auth:Login] User logged in
signupLogger.info('User signed up'); // [Auth:Signup] User signed up
```

## Best Practices

### 1. Use Appropriate Log Levels

- **DEBUG**: Detailed information for debugging (variable values, execution flow)
- **INFO**: General informational messages (successful operations, state changes)
- **WARN**: Warning messages (recoverable errors, deprecations, slow performance)
- **ERROR**: Error messages (exceptions, failures, critical issues)

### 2. Include Context

Always include relevant context data:

```typescript
// ❌ Bad
logger.error('Failed to save user');

// ✅ Good
logger.error('Failed to save user', error, {
  userId: user.id,
  operation: 'update',
  fields: changedFields,
});
```

### 3. Use Consistent Naming

Follow a consistent naming pattern for loggers:

```typescript
// Module-based
createLogger('Auth:Login')
createLogger('Strapi:PageService')

// Component-based
createLogger('Components:Header')
createLogger('Pages:UserDetail')

// Feature-based
createLogger('Cart:Checkout')
createLogger('Payment:Processing')
```

### 4. Avoid Logging Sensitive Data

Never log passwords, tokens, or personal information:

```typescript
// ❌ Bad - logs sensitive data
logger.debug('User authenticated', { password, token });

// ✅ Good - logs only safe data
logger.debug('User authenticated', { userId, email: maskEmail(email) });
```

### 5. Set Production Log Level

In production, use WARN or ERROR level:

```bash
# .env.production
NEXT_PUBLIC_LOG_LEVEL=WARN
```

## Troubleshooting

### Logs Not Appearing

1. **Check log level**: Ensure `NEXT_PUBLIC_LOG_LEVEL` allows your log level
   ```bash
   # If set to ERROR, you won't see DEBUG/INFO/WARN logs
   NEXT_PUBLIC_LOG_LEVEL=DEBUG
   ```

2. **Restart dev server**: Changes to `.env` files require restart
   ```bash
   npm run dev
   ```

3. **Check environment**: Verify the environment variable is loaded
   ```typescript
   console.log('Log level:', process.env.NEXT_PUBLIC_LOG_LEVEL);
   ```

### Too Many Logs

Increase the log level to reduce noise:

```bash
# Show only warnings and errors
NEXT_PUBLIC_LOG_LEVEL=WARN

# Show only errors
NEXT_PUBLIC_LOG_LEVEL=ERROR

# Disable all logs
NEXT_PUBLIC_LOG_LEVEL=NONE
```

## Examples by Use Case

### API Error Tracking

```typescript
const logger = createLogger('API');

async function apiCall(endpoint: string) {
  const startTime = Date.now();

  logger.debug('API call started', { endpoint });

  try {
    const response = await fetch(endpoint);
    const duration = Date.now() - startTime;

    if (duration > 2000) {
      logger.warn('Slow API response', { endpoint, duration });
    }

    logger.info('API call completed', { endpoint, duration, status: response.status });
    return response;
  } catch (error) {
    logger.error('API call failed', error as Error, {
      endpoint,
      duration: Date.now() - startTime,
    });
    throw error;
  }
}
```

### User Action Tracking

```typescript
const logger = createLogger('User:Actions');

function handleButtonClick(action: string, metadata: any) {
  logger.info('User action performed', {
    action,
    metadata,
    timestamp: new Date().toISOString(),
  });
}
```

### Performance Monitoring

```typescript
const logger = createLogger('Performance');

function measurePerformance(label: string, fn: () => void) {
  const start = performance.now();
  logger.debug(`${label} started`);

  fn();

  const duration = performance.now() - start;

  if (duration > 100) {
    logger.warn(`${label} took too long`, { duration });
  } else {
    logger.debug(`${label} completed`, { duration });
  }
}
```

## Migration from console.log

Replace existing console.log statements:

```typescript
// Before
console.log('Fetching user', userId);
console.error('Failed to fetch', error);

// After
import { createLogger } from '@/utils/logger';
const logger = createLogger('MyModule');

logger.debug('Fetching user', { userId });
logger.error('Failed to fetch', error, { userId });
```

## Summary

- Use `createLogger('YourModule')` to create a logger
- Log at appropriate levels: debug, info, warn, error
- Include context data with every log
- Configure log level via `NEXT_PUBLIC_LOG_LEVEL` environment variable
- Use WARN or ERROR level in production
- Never log sensitive information

For more information, see the logger implementation in `src/utils/logger.ts`.
