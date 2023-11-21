import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

export const analyticsLogChangedCategory = (category) => {
    logEvent(analytics, 'select_content', {
        content_type: "Category",
        content_id: category
    })
}

export const analyticsLogChangedSort = (sort) => {
    logEvent(analytics, 'select_content', {
        content_type: "Sort",
        content_id: sort
    })
}

export const analyticsLogSelectedLoadMore = (loadMoreLocation) => {
    logEvent(analytics, 'select_content', {
        content_type: "Load more",
        content_id: loadMoreLocation
    })
}