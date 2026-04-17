# SASS/SCSS Style Guide & Optimization Standards

This document outlines the SASS/SCSS conventions and optimization rules for this project. Follow these standards when reviewing, creating, or modifying SASS files.

## Table of Contents
- [Core Principles](#core-principles)
- [Formatting Standards](#formatting-standards)
- [Nesting Guidelines](#nesting-guidelines)
- [Media Query Organization](#media-query-organization)
- [Avoiding Duplication](#avoiding-duplication)
- [Vendor Prefixes](#vendor-prefixes)
- [Common Patterns](#common-patterns)

---

## Core Principles

1. **DRY (Don't Repeat Yourself)**: Never duplicate code that's already inherited from parent selectors
2. **Proper Nesting**: Use SASS nesting to organize related styles logically
3. **Media Query Consolidation**: Nest media queries within their parent selectors, not scattered at file bottom
4. **Autoprefixer First**: Don't manually add vendor prefixes - let build tools handle them
5. **Readability**: Consistent spacing, formatting, and organization

---

## Formatting Standards

### Spacing & Indentation
```scss
// ✅ GOOD - Consistent spacing
.selector {
  property: value;

  @media (max-width: 991px) {
    property: value;
  }

  .nested-selector {
    property: value;
  }
}

// ❌ BAD - Inconsistent spacing
.selector{
  property:value;
  @media(max-width:991px){
    property:value;
  }
}
```

### Selector Formatting
```scss
// ✅ GOOD - Space before opening brace
.selector {
  property: value;
}

// ❌ BAD - No space
.selector{
  property: value;
}
```

### Multiple Selectors
```scss
// ✅ GOOD - One per line
.selector-1,
.selector-2,
.selector-3 {
  property: value;
}

// ❌ BAD - All on one line
.selector-1, .selector-2, .selector-3 {
  property: value;
}
```

---

## Nesting Guidelines

### Proper Nesting Depth
```scss
// ✅ GOOD - Max 3-4 levels deep
.parent {
  property: value;

  .child {
    property: value;

    .grandchild {
      property: value;
    }
  }
}

// ❌ BAD - Too deep (5+ levels)
.parent {
  .child {
    .grandchild {
      .great-grandchild {
        .great-great-grandchild {
          property: value;
        }
      }
    }
  }
}
```

### Using & for Pseudo-elements and Modifiers
```scss
// ✅ GOOD - Use & for pseudo-elements and states
.button {
  background: blue;

  &:hover {
    background: darkblue;
  }

  &::before {
    content: "";
  }

  &.is-active {
    background: red;
  }
}

// ❌ BAD - Repeating the selector
.button {
  background: blue;
}
.button:hover {
  background: darkblue;
}
```

---

## Media Query Organization

### Nest Media Queries Within Selectors
```scss
// ✅ GOOD - Media queries nested inside
.hero-section {
  height: 900px;
  background: #fff;

  @media (max-width: 1400px) {
    height: 700px;
  }

  @media (max-width: 991px) {
    height: 500px;
    background: #f0f0f0;
  }

  .hero-title {
    font-size: 60px;

    @media (max-width: 991px) {
      font-size: 40px;
    }
  }
}

// ❌ BAD - Media queries at file bottom
.hero-section {
  height: 900px;
  background: #fff;
}

.hero-section .hero-title {
  font-size: 60px;
}

// Scattered at bottom
@media (max-width: 1400px) {
  .hero-section {
    height: 700px;
  }
}

@media (max-width: 991px) {
  .hero-section {
    height: 500px;
  }
  .hero-section .hero-title {
    font-size: 40px;
  }
}
```

---

## Avoiding Duplication

### Understanding Inheritance
**CRITICAL**: When multiple selectors share base styles, child selectors inherit those properties.

```scss
// ✅ GOOD - Base styles defined once
.wpo-hero-section-1,
.wpo-hero-section-2,
.wpo-hero-section-3 {
  height: 900px;
  display: flex;

  @media (max-width: 1400px) {
    height: 700px;
    border-bottom: 1px solid #ebebeb;
  }

  @media (max-width: 991px) {
    height: 500px;
    background: #ebfcfa;
    border-bottom: 0;
  }

  @media (max-width: 767px) {
    height: 450px;
  }
}

// Child only needs DIFFERENT values
.wpo-hero-section-2 {
  height: 950px;  // ✅ Override only base height
  background: url(/images/bg.jpg);

  // ❌ DON'T repeat inherited media queries
  // @media (max-width: 1400px) {
  //   height: 700px;  // Already inherited!
  // }
}

// Only override if DIFFERENT from parent
.wpo-hero-section-6 {
  height: 1000px;  // ✅ Different base

  @media (max-width: 991px) {
    height: 600px;  // ✅ KEEP - Different from parent (500px)
    // border-bottom: 0;  // ❌ REMOVE - Same as parent
  }

  @media (max-width: 767px) {
    height: 550px;  // ✅ KEEP - Different from parent (450px)
  }
}
```

### Checklist for Media Queries
Before adding a media query to a child selector, ask:
1. ✅ Is this selector in a parent group selector?
2. ✅ Does the parent already define this media query?
3. ✅ Are the values DIFFERENT from the parent?
4. ⚠️ If values are identical → DELETE (it's redundant)
5. ✅ If values are different → KEEP

### Common Redundancy Patterns
```scss
// ❌ BAD - Duplicate declarations
.parent-group-1,
.parent-group-2 {
  height: 900px;

  @media (max-width: 991px) {
    height: 500px;
    border-bottom: 0;
  }
}

.parent-group-2 {
  // ❌ REDUNDANT - Already inherited!
  @media (max-width: 991px) {
    height: 500px;
    border-bottom: 0;
  }
}

// ✅ GOOD - Only override what's different
.parent-group-1,
.parent-group-2 {
  height: 900px;

  @media (max-width: 991px) {
    height: 500px;
    border-bottom: 0;
  }
}

.parent-group-2 {
  background: url(/image.jpg);  // ✅ Only new styles
}
```

---

## Vendor Prefixes

### Don't Add Manual Prefixes
We use Autoprefixer in the build process. Manual prefixes create maintenance burden.

```scss
// ✅ GOOD - Let autoprefixer handle it
.element {
  transform: rotate(45deg);
  animation: fadeIn 1s;
  transition: all 0.3s;
  border-radius: 50%;
}

// ❌ BAD - Manual prefixes
.element {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);

  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}
```

### Keyframes
```scss
// ✅ GOOD - Single definition
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ❌ BAD - Duplicate with prefix
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
    -webkit-transform: translateY(20px);
  }
  to {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Common Patterns

### Component Structure
```scss
.component {
  // Base styles first
  display: flex;
  padding: 20px;

  // Media queries after base styles
  @media (max-width: 991px) {
    padding: 10px;
  }

  // Nested elements
  &__element {
    color: blue;

    @media (max-width: 991px) {
      color: red;
    }
  }

  // Modifiers
  &--variant {
    background: gray;
  }

  // States
  &:hover {
    opacity: 0.8;
  }

  &.is-active {
    border: 2px solid blue;
  }
}
```

### Mixins Usage
```scss
// ✅ GOOD - Use project mixins
.element {
  @include media-query(991px) {
    font-size: 14px;
  }

  @include rounded-border(50%);
  @include transition-time(0.3s);
}

// ❌ BAD - Hardcoded media queries
.element {
  @media (max-width: 991px) {
    font-size: 14px;
  }
}
```

---

## File Organization

### Layout Files Structure
- Keep related components together
- Group similar hero sections
- Separate base styles from overrides
- Comment section headers clearly

```scss
/*--------------------------------------------------------------
3. Hero Sections
--------------------------------------------------------------*/

/*3.1 Base Hero Styles*/
.wpo-hero-section-1,
.wpo-hero-section-2,
.wpo-hero-section-3 {
  // Shared base styles
}

/*3.2 Hero Section Variants*/
.wpo-hero-section-2 {
  // Section 2 specific overrides
}

.wpo-hero-section-3 {
  // Section 3 specific overrides
}
```

---

## Optimization Checklist

When reviewing or creating SASS files:

- [ ] Remove duplicate selectors
- [ ] Consolidate scattered media queries into parent selectors
- [ ] Remove redundant media query declarations (check inheritance)
- [ ] Remove vendor prefixes (trust autoprefixer)
- [ ] Check for duplicate properties (e.g., `display: flex` twice)
- [ ] Ensure consistent spacing and formatting
- [ ] Use SASS nesting appropriately (max 3-4 levels)
- [ ] Use `&` for pseudo-elements and modifiers
- [ ] Remove duplicate declarations like `border-radius: none; border-radius: 10px;`
- [ ] Verify all media queries are necessary (not inherited)

---

## Examples from Recent Optimizations

### header.scss
- Consolidated `.topbar` duplicate selectors into one nested block
- Merged `.wpo-site-header` duplicate blocks
- Nested media queries within parent selectors
- Removed duplicate `.header-right` declarations
- Cleaned up vendor prefixes

### hero-slider.scss
- Removed redundant media queries from `.wpo-hero-section-2` through `-5` (inherited from parent)
- Kept only different height values in `-6` and `-7`
- Removed duplicate `border-bottom: 0` declarations
- Consolidated `.wpo-hero-slider` duplicate blocks
- Removed `-webkit-` prefixes from animations
- Cleaned up duplicate keyframe definitions

---

## Questions to Ask Before Adding Code

1. **Is this already defined in a parent selector?**
2. **Can this be nested instead of repeated?**
3. **Is this media query value different from the parent?**
4. **Am I adding vendor prefixes that autoprefixer handles?**
5. **Is this property duplicated elsewhere in the same selector?**

---

## Maintenance Notes

- **Always read the entire file before making changes** to understand inheritance
- **Test after removing redundant code** to ensure no regressions
- **Use linters** to catch formatting issues automatically
- **Document complex overrides** if they're truly necessary
- **Review inheritance chain** when working with grouped selectors

---

**Last Updated**: 2026-03-28
**Maintained by**: Development Team
