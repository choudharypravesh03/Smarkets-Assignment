import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TopEvents from '../pages/TopEvents'
import { getPopularFootballEventIds, getEventsForIds } from '../services/events'
import { ERROR_MESSAGE, NO_EVENTS_FOUND } from '../constants';


const eventIds = {
    status: 200,
    data: {
        "popular_event_ids": [
            "42206253",
            "42206220",
            "42206221",
            "42206234",
            "42206233"
        ]
    }
}

const successResponse = [
    {   
        bet_allowed: true,
        bettable: true,
        chart_time_period: null,
        created: "2021-05-09T00:34:10.984003Z",
        description: null,
        display_order: 0,
        end_date: null,
        full_slug: "/sport/football/england-premier-league/2021/05/15/19-00/brighton-hove-albion-vs-west-ham",
        hidden: false,
        id: "42206221",
        inplay_enabled: true,
        modified: "2021-05-15T18:10:46.094621Z",
        name: "Brighton vs West Ham",
        parent_id: "25508311",
        seo_description: null,
        short_name: "BRI vs. WES",
        slug: "brighton-hove-albion-vs-west-ham",
        special_rules: null,
        start_date: "2021-05-15",
        start_datetime: "2021-05-15T19:00:00Z",
        state: "upcoming",
        type: "football_match"
    }
]

jest.mock("../services/events", () => {
    return {
        getPopularFootballEventIds: jest.fn(() => Promise.resolve(eventIds)),
        getEventsForIds: jest.fn(() => Promise.resolve({data: {events: successResponse}, status: 200}))
    };
});

describe('Popular Events', () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })
    it('should show events when more than zero', async () => {
        const { getByText } = render(<Router><TopEvents /></Router>)
        await waitFor(() => {
            expect(getByText('Brighton vs West Ham')).toBeTruthy()
        });
    })

    it('should show proper message when no events found', async () => {
        getPopularFootballEventIds.mockImplementation(() => Promise.resolve({data: {popular_event_ids: []}, status: 200}))
        getEventsForIds.mockImplementation(() => Promise.resolve({data: {events: []}, status: 200}))
        const { queryByText } = render(<Router><TopEvents /></Router>)
        await waitFor(() => {
            expect(queryByText(NO_EVENTS_FOUND)).toBeTruthy()
        });
    })

    it('Should show error message when error occured', async () => {
        getPopularFootballEventIds.mockImplementation(() => Promise.resolve({data: {popular_event_ids: []}, status: 500}))
        getEventsForIds.mockImplementation(() => Promise.resolve({data: {events: []}, status: 500}))
        const { queryByText } = render(<Router><TopEvents /></Router>)
        await waitFor(() => {
            expect(queryByText(ERROR_MESSAGE)).toBeTruthy()
        });
    })
}) 