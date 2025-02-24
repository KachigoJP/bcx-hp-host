import { WindowLocation, NavigateOptions } from "@reach/router";

export interface BreadcrumbProps {
    title: string;
    crumbLabel?: string;
    location: WindowLocation;
    pageContext: any;
}
