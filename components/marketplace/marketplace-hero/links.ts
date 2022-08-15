import { EMarketplaceRoute } from "types/main-route";

export interface IBreadcrumbLink {
    path: string;
    title: string;
}

export const MARKETPLACE_BREADCRUMBS_LINKS: IBreadcrumbLink[] = [
    {
        path: EMarketplaceRoute.Main,
        title: 'Buy'
    },
    {
        path: EMarketplaceRoute.MyCourses,
        title: 'My Courses'
    },
    {
        path: EMarketplaceRoute.ManageCourses,
        title: 'Manage Courses'
    },
]
