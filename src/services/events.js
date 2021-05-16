// impor

import ApiClient from "../client/ApiClient";
import { ERROR_MESSAGE } from "../constants";

export const getPopularFootballEventIds = async () => {
    try {
        return ApiClient.get('popular/event_ids/sport/football')
    } catch (error) {
        return error
    }
}


export const getEventsForIds = async () => {
    console.log('coming into getEventsForIds')
    const response = await getPopularFootballEventIds()
    console.log('response -> ', response)
    if (response.status === 200) {
        const eventIds = response.data?.popular_event_ids.join()
        return ApiClient.get(`events/${eventIds}`)
    } else {
        // Can show some toast at the bottom
        return new Error(ERROR_MESSAGE)
    }
}

export const getEventStats = (id) => {
    return ApiClient.get(`events/${id}/stats`)
}