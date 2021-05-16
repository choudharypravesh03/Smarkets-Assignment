import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EventDetails from '../pages/EventDetails'
import { getEventStats } from '../services/events'
import { ERROR_MESSAGE, NO_EVENTS_FOUND, NO_STATS_FOUND } from '../constants';

const successStatsResponse = {
    "event_stats": [
      {
        "event_id": "1824106",
        "stats": {
          "away": {
            "attacks": 50,
            "corners": 3,
            "dangerous_attacks": 40,
            "goals": 4,
            "possession": 47,
            "shots_off_target": 4,
            "shots_on_target": 5,
            "substitutions": 3,
            "yellow_cards": 1
          },
          "home": {
            "attacks": 66,
            "corners": 6,
            "dangerous_attacks": 59,
            "goals": 1,
            "possession": 53,
            "shots_off_target": 10,
            "shots_on_target": 8,
            "substitutions": 3,
            "yellow_cards": 1
          },
          "last_incident": {
            "minute": 91,
            "period": "FINISHED",
            "side": "unknown",
            "type": "PERIOD_SCORE_CONFIRMED"
          },
          "minute": 91,
          "status": "FINISHED",
          "timeline": [
            {
              "confirmed": true,
              "description": "shot",
              "minute": 26,
              "period": "1ST_HALF",
              "player": "S. Mané",
              "score": [
                0,
                1
              ],
              "side": "away",
              "timestamp": "2019-04-17T19:28:09Z",
              "type": "goal"
            },
            {
              "description": "foul",
              "minute": 32,
              "period": "1ST_HALF",
              "player": "S. Mané",
              "side": "away",
              "timestamp": "2019-04-17T19:34:16Z",
              "type": "yellow_card"
            },
            {
              "description": "foul",
              "minute": 36,
              "period": "1ST_HALF",
              "player": "Pepe",
              "side": "home",
              "timestamp": "2019-04-17T19:37:50Z",
              "type": "yellow_card"
            },
            {
              "added": 2,
              "minute": 46,
              "period": "1ST_HALF",
              "timestamp": "2019-04-17T19:47:30Z",
              "type": "stoppage_time"
            },
            {
              "minute": 45,
              "period": "PAUSE",
              "score": [
                0,
                1
              ],
              "timestamp": "2019-04-17T19:49:48Z",
              "type": "period_transition"
            },
            {
              "minute": 45,
              "off": "Otavinho",
              "on": "Tiquinho",
              "period": "PAUSE",
              "side": "home",
              "timestamp": "2019-04-17T20:04:39Z",
              "type": "substitution"
            },
            {
              "minute": 45,
              "off": "D. Origi",
              "on": "Roberto Firmino",
              "period": "PAUSE",
              "side": "away",
              "timestamp": "2019-04-17T20:04:48Z",
              "type": "substitution"
            },
            {
              "confirmed": true,
              "description": "shot",
              "minute": 65,
              "period": "2ND_HALF",
              "player": "Mohamed Salah",
              "score": [
                0,
                2
              ],
              "side": "away",
              "timestamp": "2019-04-17T20:24:41Z",
              "type": "goal"
            },
            {
              "minute": 66,
              "off": "T. Alexander-Arnold",
              "on": "J. Gomez",
              "period": "2ND_HALF",
              "side": "away",
              "timestamp": "2019-04-17T20:25:54Z",
              "type": "substitution"
            },
            {
              "confirmed": true,
              "description": "header",
              "minute": 68,
              "period": "2ND_HALF",
              "player": "Éder Militão",
              "score": [
                1,
                2
              ],
              "side": "home",
              "timestamp": "2019-04-17T20:27:53Z",
              "type": "goal"
            },
            {
              "minute": 71,
              "off": "A. Robertson",
              "on": "J. Henderson",
              "period": "2ND_HALF",
              "side": "away",
              "timestamp": "2019-04-17T20:30:13Z",
              "type": "substitution"
            },
            {
              "confirmed": true,
              "description": "header",
              "minute": 77,
              "period": "2ND_HALF",
              "player": "Roberto Firmino",
              "score": [
                1,
                3
              ],
              "side": "away",
              "timestamp": "2019-04-17T20:36:33Z",
              "type": "goal"
            },
            {
              "minute": 78,
              "off": "J. Corona",
              "on": "Fernando",
              "period": "2ND_HALF",
              "side": "home",
              "timestamp": "2019-04-17T20:37:29Z",
              "type": "substitution"
            },
            {
              "minute": 81,
              "off": "Y. Brahimi",
              "on": "Bruno Costa",
              "period": "2ND_HALF",
              "side": "home",
              "timestamp": "2019-04-17T20:40:25Z",
              "type": "substitution"
            },
            {
              "confirmed": true,
              "description": "header",
              "minute": 84,
              "period": "2ND_HALF",
              "player": "V. van Dijk",
              "score": [
                1,
                4
              ],
              "side": "away",
              "timestamp": "2019-04-17T20:43:28Z",
              "type": "goal"
            },
            {
              "added": 0,
              "minute": 91,
              "period": "2ND_HALF",
              "timestamp": "2019-04-17T20:50:49Z",
              "type": "stoppage_time"
            },
            {
              "minute": 92,
              "period": "FINISHED",
              "score": [
                1,
                4
              ],
              "timestamp": "2019-04-17T20:52:18Z",
              "type": "period_transition"
            }
          ]
        }
      }
    ]
  }

const eventState = 
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

jest.mock("../services/events", () => {
    return {
        getEventStats: jest.fn(() => Promise.resolve({data: successStatsResponse, status: 200})),
    };
});

describe('Event Stats', () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })
    it('should show event stats when stats present for the selected event', async () => {
        const { getByText } = render(<Router><EventDetails location={{
            pathname: `/game${eventState.full_slug}`,
            state: {
                eventInfo: {...eventState, time: 'mock-time'},
            },
        }} /></Router>)
        await waitFor(() => {
            expect(getByText('Minutes: 91')).toBeTruthy()
            expect(getByText('Status: FINISHED')).toBeTruthy()
            expect(getByText('Attacks: 66')).toBeTruthy()
            expect(getByText('Attacks: 50')).toBeTruthy()
        });
    })

    it('should show event stats when stats present for the selected event', async () => {
        getEventStats.mockImplementation(() => Promise.resolve({data: {event_stats: []}, status: 200}))
        const { getByText } = render(<Router><EventDetails location={{
            pathname: `/game${eventState.full_slug}`,
            state: {
                eventInfo: {...eventState, time: 'mock-time'},
            },
        }} /></Router>)
        await waitFor(() => {
            expect(getByText(NO_STATS_FOUND)).toBeTruthy()
        });
    })

    it('should show event stats when stats present for the selected event', async () => {
        getEventStats.mockImplementation(() => Promise.resolve({data: {event_stats: []}, status: 500}))
        const { getByText } = render(<Router><EventDetails location={{
            pathname: `/game${eventState.full_slug}`,
            state: {
                eventInfo: {...eventState, time: 'mock-time'},
            },
        }} /></Router>)
        await waitFor(() => {
            expect(getByText(ERROR_MESSAGE)).toBeTruthy()
        });
    })
}) 