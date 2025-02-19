import { EventItemData } from "../../../interfaces";

export interface EventPostProps {
    data: {
        eventJson: EventItemData;
    };
    location: Location;
    pageContext: any;
}
