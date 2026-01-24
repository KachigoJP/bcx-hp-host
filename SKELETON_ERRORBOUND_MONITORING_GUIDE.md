# Skeleton Screens, Error Boundaries & Monitoring - Complete Guide

## Overview

This guide shows how to use the three key features together for a better user experience:
1. **Skeleton Screens** - Show loading placeholders
2. **Error Boundaries** - Catch and handle errors gracefully
3. **Data Monitoring** - Track performance and fallback usage

## ✅ What's Been Implemented

### 1. Skeleton Components (`src/components/common/Skeleton/`)
- `<Skeleton />` - Basic skeleton element
- `<SkeletonCard />` - Card-style placeholder
- `<SkeletonHero />` - Hero section placeholder
- `<SkeletonList />` - List items placeholder
- `<SkeletonText />` - Text paragraphs placeholder
- `<SkeletonGrid />` - Grid layout placeholder
- `<SkeletonPage />` - Full page placeholder

### 2. Error Boundary (`src/components/common/ErrorBoundary/`)
- `<ErrorBoundary />` - React error boundary component
- Catches JavaScript errors in child components
- Shows fallback UI with retry option
- Logs errors automatically

### 3. Data Monitoring (`src/utils/dataMonitoring.ts`)
- `trackSuccess()` - Track successful data fetches
- `trackFailure()` - Track failed fetches
- `trackFallbackUsage()` - Track when defaults are used
- `monitoredFetch()` - Wrapper for automatic tracking
- `getMetricsSummary()` - Get performance stats

## 🚀 Quick Start

### Basic Usage - All Three Together

```typescript
import { useState, useEffect } from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { SkeletonPage } from "@/components/common/Skeleton";
import { monitoredFetch } from "@/utils/dataMonitoring";
import { defaultActivities } from "@/data";

export default function MyPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use monitored fetch for automatic tracking
    monitoredFetch("my-page", () => fetchData(), defaultActivities)
      .then((result) => {
        setData(result.data);
        setError(result.error);
        setIsLoading(false);
      });
  }, []);

  // Show skeleton while loading
  if (isLoading) {
    return <SkeletonPage />;
  }

  // Wrap content in error boundary
  return (
    <ErrorBoundary fallback={<DefaultContent />}>
      {error && <ErrorBanner error={error} />}
      <Content data={data} />
    </ErrorBoundary>
  );
}
```

## 📚 Detailed Examples

### Example 1: Homepage with Loading States

```typescript
// src/pages/index.tsx
import { useState, useEffect } from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { SkeletonPage, SkeletonHero, SkeletonGrid } from "@/components/common/Skeleton";
import { fetchPageOptimized } from "@/utils/pageData";
import { getDefaultHero, defaultActivities } from "@/data";

export default function HomePage() {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPageOptimized("trang-chu")
      .then((result) => {
        setPageData(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        // Monitoring automatically tracks this failure
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <SkeletonHero />
        <SkeletonGrid items={6} columns={3} />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Hero data={pageData?.hero || getDefaultHero()} />
      <Activities data={pageData?.activities || defaultActivities} />
    </ErrorBoundary>
  );
}
```

### Example 2: Component with Error Handling

```typescript
// src/components/ActivityList.tsx
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { SkeletonCard } from "@/components/common/Skeleton";
import { defaultActivities } from "@/data";

interface ActivityListProps {
  activities?: Activity[];
  isLoading?: boolean;
}

export function ActivityList({ activities, isLoading }: ActivityListProps) {
  if (isLoading) {
    return (
      <div className="grid">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const data = activities || defaultActivities;

  return (
    <ErrorBoundary fallback={<DefaultActivityList />}>
      <div className="grid">
        {data.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </ErrorBoundary>
  );
}
```

### Example 3: Custom Skeleton for Specific Layout

```typescript
// src/components/CustomSkeleton.tsx
import { Skeleton } from "@/components/common/Skeleton";

export function ArticleSkeleton() {
  return (
    <div className="article-skeleton">
      {/* Article header */}
      <Skeleton width="80%" height={40} />
      <Skeleton width="40%" height={20} className="mt-2" />

      {/* Featured image */}
      <Skeleton variant="rectangular" height={400} className="mt-4" />

      {/* Article body */}
      <div className="mt-4">
        <Skeleton width="100%" height={16} />
        <Skeleton width="95%" height={16} />
        <Skeleton width="98%" height={16} />
        <Skeleton width="85%" height={16} />
      </div>

      {/* Author info */}
      <div className="mt-4 flex items-center gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div>
          <Skeleton width={120} height={16} />
          <Skeleton width={80} height={14} />
        </div>
      </div>
    </div>
  );
}
```

### Example 4: Monitoring Data Fetches

```typescript
// src/utils/api.ts
import { trackSuccess, trackFailure } from "@/utils/dataMonitoring";

export async function fetchArticles() {
  const startTime = performance.now();

  try {
    const response = await fetch("/api/articles");
    const data = await response.json();

    const duration = performance.now() - startTime;
    trackSuccess("articles", "strapi", duration);

    return data;
  } catch (error) {
    const duration = performance.now() - startTime;
    trackFailure("articles", error as Error, duration);
    throw error;
  }
}
```

### Example 5: Error Boundary with Custom Fallback

```typescript
// src/pages/about.tsx
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { defaultAbout } from "@/data";

function DefaultAboutPage() {
  return (
    <div>
      <h1>{defaultAbout.about.title}</h1>
      <p>{defaultAbout.about.description}</p>
      <p className="warning">
        ⚠️ Không thể tải nội dung từ server. Đang hiển thị nội dung mặc định.
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <ErrorBoundary fallback={<DefaultAboutPage />}>
      <DynamicAboutContent />
    </ErrorBoundary>
  );
}
```

## 🎨 Skeleton Variants

### Text Skeleton
```typescript
<Skeleton width={200} height={20} variant="text" />
```

### Circular (Avatar)
```typescript
<Skeleton width={40} height={40} variant="circular" />
```

### Rectangular (Image)
```typescript
<Skeleton width="100%" height={300} variant="rectangular" />
```

### Rounded (Button/Card)
```typescript
<Skeleton width={120} height={40} variant="rounded" />
```

### Custom Animation
```typescript
<Skeleton animation="wave" /> // Shimmer effect
<Skeleton animation="pulse" /> // Fade in/out
<Skeleton animation="none" /> // No animation
```

## 🛡️ Error Boundary Features

### Basic Usage
```typescript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Custom Fallback
```typescript
<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>
```

### With Error Handler
```typescript
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Send to error tracking service
    sendToSentry(error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### Show Error Details (Development)
```typescript
<ErrorBoundary showError={process.env.NODE_ENV === "development"}>
  <YourComponent />
</ErrorBoundary>
```

## 📊 Monitoring Features

### Track Successful Fetch
```typescript
import { trackSuccess } from "@/utils/dataMonitoring";

trackSuccess("homepage", "strapi", 250); // 250ms duration
```

### Track Failed Fetch
```typescript
import { trackFailure } from "@/utils/dataMonitoring";

trackFailure("homepage", new Error("Network error"), 1500);
```

### Track Fallback Usage
```typescript
import { trackFallbackUsage } from "@/utils/dataMonitoring";

trackFallbackUsage({
  page: "homepage",
  reason: "network_error"
});
```

### Automatic Monitoring Wrapper
```typescript
import { monitoredFetch } from "@/utils/dataMonitoring";

const result = await monitoredFetch(
  "homepage",
  () => fetchFromStrapi(),
  defaultData
);

// result.data - The data (from Strapi or default)
// result.error - Error if fetch failed (or null)
// result.fromCache - Whether data came from cache
```

### Get Performance Summary
```typescript
import { getMetricsSummary } from "@/utils/dataMonitoring";

const stats = getMetricsSummary();
console.log(`Success rate: ${stats.successRate}%`);
console.log(`Average duration: ${stats.averageDuration}ms`);
console.log(`Fallback usage: ${stats.fallbackRate}%`);
```

## 🎯 Best Practices

### 1. Always Show Something
```typescript
// ❌ Bad - shows blank screen
if (isLoading) return null;

// ✅ Good - shows skeleton
if (isLoading) return <SkeletonPage />;
```

### 2. Wrap Risky Components
```typescript
// Wrap components that might fail
<ErrorBoundary>
  <DynamicContentFromAPI />
</ErrorBoundary>

// Don't wrap everything in one boundary
// Use multiple boundaries for better granularity
```

### 3. Monitor All Data Fetches
```typescript
// Track every important data fetch
const data = await monitoredFetch("page-name", fetchFn, defaultData);
```

### 4. Provide Retry Options
```typescript
<ErrorBoundary>
  <ContentWithRetry onRetry={() => refetch()} />
</ErrorBoundary>
```

### 5. Use Appropriate Skeletons
```typescript
// Match skeleton to content structure
<SkeletonCard /> // For card layouts
<SkeletonList /> // For list layouts
<SkeletonText /> // For text content
```

## 🔍 Debugging

### View Monitoring Data (Browser Console)
```javascript
// Get performance summary
import { getMetricsSummary } from "@/utils/dataMonitoring";
console.log(getMetricsSummary());

// View raw metrics
const metrics = JSON.parse(localStorage.getItem("data_fetch_metrics"));
console.table(metrics);

// View fallback usage
const fallbacks = JSON.parse(localStorage.getItem("fallback_usage"));
console.table(fallbacks);
```

### Clear Monitoring Data
```javascript
import { clearMetrics } from "@/utils/dataMonitoring";
clearMetrics();
```

### Test Error Boundary
```typescript
// Add a test button that throws an error
<button onClick={() => { throw new Error("Test error"); }}>
  Test Error Boundary
</button>
```

## 📱 Responsive Considerations

Skeletons automatically adapt to screen size:

```scss
// Automatically responsive
.skeletonGrid {
  @media (max-width: 768px) {
    grid-template-columns: 1fr !important;
  }
}
```

## 🌙 Dark Mode Support

All components support dark mode:

```scss
@media (prefers-color-scheme: dark) {
  .skeleton {
    background-color: #2a2a2a;
  }
}
```

## ⚡ Performance Tips

1. **Lazy load heavy components**
```typescript
const HeavyComponent = lazy(() => import("./HeavyComponent"));

<ErrorBoundary fallback={<Skeleton />}>
  <Suspense fallback={<SkeletonCard />}>
    <HeavyComponent />
  </Suspense>
</ErrorBoundary>
```

2. **Debounce monitoring calls**
```typescript
// Don't track every keystroke
const debouncedTrack = debounce(trackSuccess, 1000);
```

3. **Limit stored metrics**
```typescript
// Automatically limits to last 100 entries
// Clear old data periodically
```

## 🧪 Testing

### Test with Loading State
```typescript
// Simulate slow network
await new Promise(resolve => setTimeout(resolve, 3000));
```

### Test Error Boundary
```typescript
// Throw an error intentionally
if (testMode) {
  throw new Error("Test error");
}
```

### Test Monitoring
```typescript
// Check if metrics are being tracked
import { getMetricsSummary } from "@/utils/dataMonitoring";

test("should track data fetches", () => {
  const summary = getMetricsSummary();
  expect(summary.totalFetches).toBeGreaterThan(0);
});
```

## 📈 Monitoring Dashboard (Optional)

Create a simple dashboard to view metrics:

```typescript
// src/pages/admin/metrics.tsx
import { getMetricsSummary } from "@/utils/dataMonitoring";

export default function MetricsDashboard() {
  const stats = getMetricsSummary();

  return (
    <div>
      <h1>Performance Metrics</h1>
      <div className="stats">
        <Stat label="Total Fetches" value={stats.totalFetches} />
        <Stat label="Success Rate" value={`${stats.successRate.toFixed(1)}%`} />
        <Stat label="Avg Duration" value={`${stats.averageDuration.toFixed(0)}ms`} />
        <Stat label="Fallback Rate" value={`${stats.fallbackRate.toFixed(1)}%`} />
      </div>
    </div>
  );
}
```

## 🎓 Learning Path

1. Start with skeleton screens for loading states
2. Add error boundaries to critical components
3. Implement monitoring for key data fetches
4. Review metrics and optimize based on data
5. Add custom fallback UIs where needed

## ✅ Checklist

- [ ] All pages have loading skeletons
- [ ] Critical components wrapped in error boundaries
- [ ] Data fetches are monitored
- [ ] Fallback data is always available
- [ ] Error messages are user-friendly
- [ ] Retry options are provided
- [ ] Performance metrics are tracked
- [ ] Dark mode works correctly
- [ ] Mobile responsiveness verified
- [ ] Error cases tested

## 🆘 Support

- **Skeleton Components**: [src/components/common/Skeleton/](src/components/common/Skeleton/)
- **Error Boundary**: [src/components/common/ErrorBoundary/](src/components/common/ErrorBoundary/)
- **Monitoring Utils**: [src/utils/dataMonitoring.ts](src/utils/dataMonitoring.ts)
- **Logging**: See [LOGGING_GUIDE.md](LOGGING_GUIDE.md)
- **Default Data**: See [DEFAULT_DATA_STRATEGY.md](DEFAULT_DATA_STRATEGY.md)

---

**Status**: ✅ All features implemented and ready to use!
