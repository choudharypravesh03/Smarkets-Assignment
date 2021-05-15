// impor

import ApiClient from "../client/ApiClient";

export const getPopularFootballEvents = async () => {
    try {
        return await ApiClient.get('popular/event_ids/sport/football')
    } catch (error) {
        return error
    }
}