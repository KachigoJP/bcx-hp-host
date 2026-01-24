# Default Data Management Guide

## Overview

This directory contains all default/fallback content used throughout the application. This ensures users always see meaningful content even when:
- Strapi CMS is unavailable
- Network connection is lost
- Content hasn't been created yet
- Data is still loading

## Directory Structure

```
src/data/
├── defaultActivities.json      # Default activities/services
├── defaultAbout.json           # Default about section
├── defaultTestimonials.json    # Default testimonials
├── defaultAchievements.json    # Default achievement stats
├── defaultCTA.json             # Default call-to-action
├── defaultPartners.json        # Default partner list
├── index.ts                    # Main export file with utilities
└── README.md                   # This file
```

## Usage

### Import Default Data

```typescript
import {
  defaultActivities,
  defaultAbout,
  defaultTestimonials,
  getDefaultHero,
  getDefaultSEO,
} from "@/data";
```

### Use with Strapi Data

```typescript
// Option 1: Use default if Strapi data is null
const heroData = pageData?.heros ? transformHeroData(pageData) : getDefaultHero();

// Option 2: Use as fallback in array
const activities = strapiActivities?.length > 0 ? strapiActivities : defaultActivities;

// Option 3: Merge with defaults
import { mergeWithDefaults } from "@/data";
const finalData = mergeWithDefaults(strapiData, defaultData);
```

## Best Practices for Handling Missing Data

### 1. **Show Something Useful**
Never show a blank page. Always display default content that:
- Explains what the page is about
- Provides call-to-action buttons
- Shows placeholder content that makes sense

### 2. **Indicate Loading State**
When data is loading (not failed), show:
```typescript
{isLoading && <SkeletonLoader />}
{!isLoading && data && <ContentComponent data={data} />}
{!isLoading && !data && <ContentComponent data={defaultData} />}
```

### 3. **Handle Errors Gracefully**
```typescript
try {
  const data = await fetchData();
  return data;
} catch (error) {
  logger.error("Failed to fetch data", error);
  // Show default data with error banner
  return {
    data: defaultData,
    error: true,
    message: "Không thể tải dữ liệu. Đang hiển thị nội dung mặc định."
  };
}
```

### 4. **Provide Retry Options**
When data fetch fails:
```typescript
<ErrorBanner
  message="Không thể kết nối với máy chủ"
  onRetry={() => refetchData()}
  showDefault={true}
/>
```

### 5. **Cache Data Locally**
```typescript
// Store successfully fetched data in localStorage
const cachedData = localStorage.getItem('homepage-data');
if (cachedData) {
  return JSON.parse(cachedData);
}
```

## Data Strategies by Scenario

### Initial Page Load
```typescript
import { dataStrategies } from "@/data";

// Show skeleton loader while fetching
if (isInitialLoad) {
  return <SkeletonLoader />;
}
```

### Network Error
```typescript
// Show default content + error banner + retry button
return (
  <>
    <ErrorBanner
      message="Lỗi kết nối mạng"
      onRetry={handleRetry}
    />
    <ContentComponent data={defaultData} />
  </>
);
```

### No Data Available
```typescript
// Show default content without error (normal state)
return <ContentComponent data={defaultData} />;
```

### Offline Mode
```typescript
// Use cached data or defaults
const data = getCachedData() || defaultData;
return (
  <>
    <OfflineBanner />
    <ContentComponent data={data} />
  </>
);
```

## Updating Default Data

### When to Update
- After major content changes in production
- When adding new sections
- When default content becomes outdated
- After user feedback

### How to Update

1. **Edit JSON files directly**:
   ```bash
   # Edit the relevant JSON file
   vim src/data/defaultActivities.json
   ```

2. **Add new default data**:
   ```typescript
   // In src/data/index.ts
   import newDefault from "./defaultNewSection.json";
   export { newDefault };
   ```

3. **Update functions**:
   ```typescript
   export function getDefaultNewSection() {
     return {
       title: "New Section",
       // ... default data
     };
   }
   ```

## Error Messages

Use localized error messages from `errorMessages`:

```typescript
import { errorMessages } from "@/data";

// Network error
console.error(errorMessages.networkError.vi);
// Output: "Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối mạng của bạn."

// Server error
console.error(errorMessages.serverError.vi);
// Output: "Máy chủ đang gặp sự cố. Chúng tôi đang khắc phục vấn đề."
```

## Example: Complete Page Implementation

```typescript
import { useState, useEffect } from "react";
import {
  defaultActivities,
  defaultAbout,
  getDefaultSEO,
  dataStrategies,
  errorMessages,
} from "@/data";
import { fetchPageData } from "@/utils/api";

export default function HomePage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPageData("homepage")
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(errorMessages.networkError.vi);
        setError(err);
        setIsLoading(false);
        // Use default data as fallback
        setData({
          activities: defaultActivities,
          about: defaultAbout,
          seo: getDefaultSEO(),
        });
      });
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      {error && (
        <ErrorBanner
          message={errorMessages.networkError.vi}
          onRetry={() => window.location.reload()}
        />
      )}
      <SEO {...data.seo} />
      <About {...data.about} />
      <Activities data={data.activities} />
    </>
  );
}
```

## Testing Default Data

Always test your pages with:

1. **No Strapi connection**
   ```bash
   # Stop Strapi backend
   # Load page to see default data
   ```

2. **Slow network**
   ```bash
   # Chrome DevTools -> Network -> Slow 3G
   # Verify loading states work correctly
   ```

3. **Empty Strapi**
   ```bash
   # Clear all content in Strapi
   # Verify defaults show properly
   ```

## Maintenance

- Review default data quarterly
- Update based on actual content
- Remove outdated references
- Keep consistent with brand guidelines
- Ensure all text is properly localized

## Support

For questions about default data management:
- Check [LOGGING_GUIDE.md](../../LOGGING_GUIDE.md) for debugging
- See [pageData.ts](../utils/pageData.ts) for data fetching patterns
- Review component implementations for usage examples
