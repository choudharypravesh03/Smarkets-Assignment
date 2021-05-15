import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import { getEventStats } from '../services/events'

const EventDetails = () => {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [eventData, setEventData] = useState()

    useEffect(() => {
        const eventInfo = location?.state?.eventInfo
        setEventData(eventInfo)
        getEventDetails(eventInfo.id)
    }, [location])

    const getEventDetails = async (id) => {
        try {
            const response = await getEventStats(id)
            if (response.data.event_stats[0]) {
                setStats(response.data?.event_stats[0].stats)
            }
            setIsLoading(false)
        } catch (error) {
            // Can show some toast to user for error
            console.log('error -> ', error)
        }
    }

    return (
        <Layout>
            {!isLoading ? <EventDetailsContainer>
                <div className="event-details-container">
                    <div className="header">
                        <h1>{eventData.name}</h1>
                        <div className="more-details">
                            <p className="state">{eventData.state}</p>
                            <p className="time">{eventData.time}</p>
                        </div>
                    </div>
                    {stats && stats.status !== "NOT_STARTED" ? <div className="event-stats">
                        <h4>Minutes: {stats.minute}</h4>
                        <h4>Status: {stats.status}</h4>
                        <div className="stats-tables">
                            <div className="box">
                                <h3>HOME</h3>
                                <p>Attacks: {stats.home.attacks}</p>
                                <p>Corners: {stats.home.corners}</p>
                                <p>Goals: {stats.home.goals}</p>
                                <p>Yellow Cards: {stats.home.yellow_cards}</p>
                                <p>Possessions: {stats.home.possession}</p>
                                <p>Shots off target: {stats.home.shots_off_target}</p>
                                <p>Shots on target: {stats.home.shots_on_target}</p>
                                <p>Substitutions: {stats.home.substitutions}</p>
                            </div>
                            <div className="box">
                                <h3>AWAY</h3>
                                <p>Attacks: {stats.away.attacks}</p>
                                <p>Corners: {stats.away.corners}</p>
                                <p>Goals: {stats.away.goals}</p>
                                <p>Yellow Cards: {stats.away.yellow_cards}</p>
                                <p>Possessions: {stats.away.possession}</p>
                                <p>Shots off target: {stats.away.shots_off_target}</p>
                                <p>Shots on target: {stats.away.shots_on_target}</p>
                                <p>Substitutions: {stats.away.substitutions}</p>
                            </div>
                        </div>
                    </div> : <h2 className="pad-top">Match has not started</h2>}
                </div>
            </EventDetailsContainer>: <Loader />}
        </Layout>
    )
}

const EventDetailsContainer = styled.div`
    .event-details-container {
        .header {
            .more-details {
                display: flex;
                .state {
                    margin-right: 1rem;
                }
                p {
                    text-transform: uppercase;
                    font-weight: bold;
                    font-size: 12px;
                }
            }
        }
        .event-stats {
            margin-top: 3rem;
            h4 {
                margin-bottom: 1rem;
            }
            .stats-tables {
                display: flex;
                .box {
                    width: 400px;
                    padding: 1rem;
                    border: 1px solid #000000;
                    margin-right: 2rem;
                    h3 {
                        margin-bottom: 1rem;
                    }
                    p {
                        margin-bottom: 0.5rem;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 786px) {
        .event-stats {
            .stats-tables {
                flex-wrap: wrap;
                .box {
                    width: 100%;
                    margin-bottom: 2rem;
                }
            }
        }
    }
`

export default EventDetails;