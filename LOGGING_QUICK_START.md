# Logging System - Quick Start

## ✅ What's Been Set Up

The logging system is now active in your project with:
- ✅ Logger utility created (`src/utils/logger.ts`)
- ✅ CollectionService updated to use logger
- ✅ BaseService updated to use logger
- ✅ Dynamic page route updated to use logger
- ✅ Environment configuration added

## 🚀 Quick Usage

### 1. Import and Create Logger

```typescript
import { createLogger } from '@/utils/logger';

const logger = createLogger('MyModule');
```

### 2. Log at Different Levels

```typescript
// Debug - detailed information (only in development)
logger.debug('Processing user data', { userId: 123 });

// Info - general information
logger.info('User logged in', { userId: 123, email: 'user@example.com' });

// Warn - warnings
logger.warn('Slow API response', { endpoint: '/api/users', time: 3000 });

// Error - errors with error object
logger.error('Failed to save user', error, { userId: 123 });
```

## 🔧 Configuration

### Set Log Level (Environment Variable)

Edit `.env.local`:

```bash
# Show all logs (development)
NEXT_PUBLIC_LOG_LEVEL=DEBUG

# Show only warnings and errors (production)
NEXT_PUBLIC_LOG_LEVEL=WARN

# Show only errors
NEXT_PUBLIC_LOG_LEVEL=ERROR

# Disable all logs
NEXT_PUBLIC_LOG_LEVEL=NONE
```

**Restart dev server after changing `.env.local`**

## 📋 Current Implementation

### Services Already Using Logger

1. **CollectionService** (`/api/pages`, `/api/articles`, etc.)
   ```
   [Strapi:Collection:/api/pages] Fetching item by slug
   ```

2. **BaseService** (all Strapi services)
   ```
   [Strapi:/api/about] Strapi API error
   ```

3. **Dynamic Pages** (`pages/page/[slug].tsx`)
   ```
   [Pages:DynamicPage] getStaticPaths started
   ```

## 📊 Log Output Example

```
2026-01-24T11:35:09.006Z [DEBUG] [Strapi:Collection:/api/pages] Fetching item by slug
Context: { slug: 'home', params: {...} }

2026-01-24T11:35:09.014Z [ERROR] [Strapi:Collection:/api/pages] Strapi API error
Error: Request failed with status code 403
Context: { endpoint: '/api/pages', status: 403 }
```

## 🎯 Best Practices

### ✅ DO

```typescript
// Include relevant context
logger.error('Failed to save', error, { userId, action: 'update' });

// Use appropriate log levels
logger.debug('Variable value', { value }); // Development only
logger.error('Critical failure', error); // Always shown
```

### ❌ DON'T

```typescript
// Don't log sensitive data
logger.debug('User auth', { password, token }); // BAD!

// Don't use console.log
console.log('User logged in'); // Use logger instead
```

## 🔍 Viewing Logs

### Development

Logs appear in your terminal where you run `npm run dev`:

```bash
npm run dev
# Logs appear here
```

### Check Current Log Level

```typescript
import { logger } from '@/utils/logger';
// The logger automatically uses the environment-configured level
```

## 📦 Migration from console.log

Replace existing console.log statements:

```typescript
// Before
console.log('Fetching user', userId);
console.error('Failed:', error);

// After
import { createLogger } from '@/utils/logger';
const logger = createLogger('MyModule');

logger.debug('Fetching user', { userId });
logger.error('Failed', error, { userId });
```

## 🎨 Pre-configured Loggers

Use ready-made loggers:

```typescript
import { loggers } from '@/utils/logger';

loggers.strapi.info('Connected to Strapi');
loggers.api.debug('API call', { endpoint: '/users' });
loggers.pages.info('Page rendered', { path: '/home' });
```

## 🐛 Troubleshooting

**Not seeing logs?**
1. Check `NEXT_PUBLIC_LOG_LEVEL` in `.env.local`
2. Restart dev server (`npm run dev`)
3. Ensure you're looking at the terminal (not browser console)

**Too many logs?**
```bash
# In .env.local, increase the log level
NEXT_PUBLIC_LOG_LEVEL=WARN  # Only show warnings and errors
```

**No logs at all?**
```bash
# Check the level isn't set to NONE
NEXT_PUBLIC_LOG_LEVEL=DEBUG
```

## 📚 Full Documentation

For detailed documentation, see:
- [LOGGING_GUIDE.md](LOGGING_GUIDE.md) - Complete guide with examples
- [src/utils/logger.ts](src/utils/logger.ts) - Implementation

## 🎯 Next Steps

1. **Set your log level** in `.env.local`
2. **Replace console.log** statements in your code
3. **Add loggers** to new modules as you create them
4. **Use WARN level** in production

---

**Current Status**: ✅ Logging system is active and working
**Test it**: Check your terminal while running `npm run dev`
