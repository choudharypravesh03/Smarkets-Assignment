import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
import Layout from '../components/Layout';
import Loader from '../components/Loader'
import { getEventsForIds } from '../services/events';

const TopEvents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
        const response = await getEventsForIds()
        console.log("🚀 ~ file: TopEvents.js ~ line 20 ~ getEvents ~ response", response)
        setData(response.data?.events)
        setIsLoading(false)
    } catch (error) {
        // Can show some toast to user for error
        console.log('error -> ', error)
    }
  }

  const getTimeInHours = (start_time) => {
    const currentTime = moment(Date.now())
    const startTime = moment(start_time)
    const diff = currentTime.diff(startTime, 'h')
    if (diff < 0) {
        return `Played ${diff*(-1)} hours ago`
    }
    return `In ${diff} hour(s)`
  }

  return (
    <Layout>
      {!isLoading ?
        <TopEventsContainer>
            <div className="popular-events-container">
                <div className="header">
                    <h1>Soccer Odds</h1><br/>
                    <p>Trade and bet on a variety of football betting markets, including those on the Premier League, Champions League, La Liga, Bundesliga and MLS.</p>
                </div>
                <h2 className="event-header">Popular</h2>
                <ul className="event-list list-view  football">
                    {data.map(item => {
                        return(
                            <li key={item.id} className="item-tile event-tile popular layout-row">
                                <Link to={{
                                    pathname: `/game${item.full_slug}`,
                                    state: {
                                        eventInfo: {...item, time: getTimeInHours(item.start_datetime)},
                                    },
                                }}>
                                    <div className="event-info-container">
                                        <h4 className="event-name">{item.name}</h4>
                                        <div className="time-info">
                                            <p className="state">{item.state}</p>
                                            <p className="time">{getTimeInHours(item.start_datetime)}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </TopEventsContainer>
      : <Loader />}
    </Layout>
  );
}

const TopEventsContainer = styled.div`
    .header {
        margin-bottom: 3rem;
    }
    .event-header {
        margin-bottom: 2rem;
    }
    .popular-events-container {
        max-width: 1000px;
        margin: auto;
        .list-view {
            margin: 0;
            padding: 0;
            list-style-type: none;
            a {
                text-decoration: none;
                color: #000000;
            }
            .event-info-container {
                margin-bottom: 1rem;
                border-left: 4px solid rgb(21, 21, 21);
                box-shadow: rgb(0 0 0 / 16%) 0px 4px 12px;
                align-content: center;
                border-radius: 2px;
                flex-direction: row;
                min-height: 50px;
                padding: 1rem;
                transition: all 0.25s linear 0s;
                :hover {
                    background-color: #000000;
                    color: #ffffff;
                }
                .event-name {
                    margin-bottom: 0.5rem;
                }
                .time-info {
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
        }
    }
` 


export default TopEvents;