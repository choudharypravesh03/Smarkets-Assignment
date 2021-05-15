import React, { useState, useEffect } from 'react'
import { getPopularFootballEvents } from '../services/events';

const TopEvents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const response = await getPopularFootballEvents()
    if (response.status === 200) {
        setData(response.data?.popular_event_ids)
    } else {
        alert('Some error occured. Please try again!')
    }
    console.log("🚀 ~ file: TopEvents.js ~ line 14 ~ getEvents ~ response", response)
    setIsLoading(false)
  }

  return (
    <>
      {!isLoading &&
        data.map((id, index) => {
          return <h5 key={index}>{id}</h5>;
        })}
    </>
  );
}


export default TopEvents;