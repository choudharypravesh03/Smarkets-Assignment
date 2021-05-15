// impor

import ApiClient from "../client/ApiClient";

export const getPopularFootballEventIds = async () => {
    try {
        return ApiClient.get('popular/event_ids/sport/football')
    } catch (error) {
        return error
    }
}


export const getEventsForIds = async () => {
    const response = await getPopularFootballEventIds()
    if (response.status === 200) {
        const eventIds = response.data?.popular_event_ids.join()
        console.log("🚀 ~ file: events.js ~ line 18 ~ getEventsForIds ~ eventIds", eventIds)
        return ApiClient.get(`events/${eventIds}`)
    } else {
        // Can show some toast at the bottom
        throw('Some error occured. Please try again')
    }
}