## Strapi Components Guide for Activity Pages (Hiking, Camping, Workshop)

This guide describes recommended Strapi components and content types to match the TypeScript interfaces under `src/utils/interfaces`.

### Shared Atoms (components)
- shared.image: media with url/alt/width/height
- shared.icon: string (icon name) or media if preferred
- shared.list-text-item: text
- shared.button: label, url, target
- shared.section-intro: eyebrow, title, description

### Shared Mixins (components)
- shared.has-image: component(shared.image)
- shared.has-icon: component(shared.icon)
- shared.has-duration: string
- shared.has-distance: string
- shared.has-difficulty: string
- shared.has-age-group: string
- shared.has-location: string
- shared.has-participants: string
- shared.has-date: date
- shared.has-time: string
- shared.has-items-list: repeatable(shared.list-text-item)
- shared.has-features-list: repeatable(shared.list-text-item)

### Generic Section (component)
- sections.list-section
  - sectionIntro: component(shared.section-intro)
  - items: dynamic zone (accepts item components for each domain)

### Domain Item Components
Create these as components combining the mixins above:

Hiking
- hiking.route-item: has-image, has-icon, has-duration, has-distance, has-difficulty, has-age-group, features(list)
- hiking.popular-route-item: has-image, has-duration, location, participants, button
- hiking.safety-equipment-item: has-icon, items(list)
- hiking.environmental-action-item: has-icon

Camping
- camping.type-item: has-image, has-icon, has-duration, has-age-group, activities(list), equipment(list)
- camping.site-item: has-image, has-location, has-duration, has-participants, environment, optional button
- camping.activity-skill-item: has-icon, items(list)
- camping.equipment-item: has-icon
- camping.environmental-principle-item: has-icon

Workshop
- workshop.category-item: has-image, has-icon, has-duration, topics(list)
- workshop.upcoming-item: has-image, has-date, has-time, has-participants, has-location, optional button
- workshop.training-method-item: has-icon
- workshop.expert-trainer-item: has-icon
- workshop.certification-benefit-item: has-icon

### Page Content Types
Create one content type per activity page (e.g. `hiking-page`, `camping-page`, `workshop-page`). Each page contains:
- hero: has-image + features(list)
- sections: repeatable component(sections.list-section) where the items dynamic zone includes the domain-specific item components for that page
- activityType: enumeration [hiking, camping, workshop] (optional but recommended)

### TS Mapping
The TS mixins and `ListSection<TItem>` in `src/utils/interfaces/activity-shared.ts` directly map to the components above.
Keep field names consistent to minimize mapping code between Strapi responses and TS interfaces.


