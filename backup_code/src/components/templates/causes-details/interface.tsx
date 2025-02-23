import { CauseItemData } from "../../../interfaces";

export interface CausesDetailProps {
    data: {
        causesJson: CauseItemData;
    };
    location: Location;
    pageContext: any;
}
