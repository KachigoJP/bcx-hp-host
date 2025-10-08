import qs from "qs";

/**
 * Build camping page populate query with dynamic zone support
 * For dynamic zones, we can only use populate: "*" at second level
 * Cannot target specific nested fields due to Strapi polymorphic limitations
 */
export function buildCampingPopulateQuery() {
  return qs.stringify(
    {
      populate: {
        pageIntro: {
          populate: "*",
        },
        heroSection: {
          populate: "*",
        },
        sections: {
          // For dynamic zones, use 'on' to specify population per component type
          on: {
            "ui.camping-types-section": {
              populate: {
                sectionIntro: "*",
                items: {
                  populate: {
                    image: {
                      populate: "*",
                    },
                    activities: "*",
                    equipments: "*",
                  },
                },
              },
            },
            "ui.camping-sites-section": {
              populate: {
                sectionIntro: "*",
                items: {
                  populate: "*",
                },
              },
            },
            "common.section-detail-image-section-icon-list-text-items": {
              populate: {
                sectionIntro: "*",
                image: {
                  populate: "*",
                },
                items: {
                  populate: {
                    items: "*",
                  },
                },
              },
            },
            "common.section-detail-section-icon-items": {
              populate: {
                sectionIntro: "*",
                items: "*",
              },
            },
          },
        },
        joinSection: {
          populate: "*",
        },
      },
    },
    { encodeValuesOnly: true }
  );
}
