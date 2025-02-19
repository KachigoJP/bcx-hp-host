import { ISetting } from "@interfaces/index";
import { graphql, useStaticQuery } from "gatsby";

export const useSettings = () => {
    const { allSetting } = useStaticQuery(
        graphql`
            query {
                allSetting {
                    nodes {
                        id
                        key
                        value
                        type
                        image {
                            gatsbyImage(width: 1000)
                        }
                        description
                    }
                }
            }
        `
    );

    const setting: Record<string, ISetting> = {};

    for (const item of allSetting.nodes) {
        setting[item.key] = item as ISetting;
    }

    return setting;
};
