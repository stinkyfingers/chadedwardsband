import React from 'react';
import { gapi } from 'gapi-script';

import '../css/tour.css';

const calendarID = process.env.REACT_APP_CALENDAR_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const Tour = () => {
    const [dates, setDates] = React.useState([]);
    
    const start = () => {
        gapi.client.init({
            apiKey: apiKey
        }).then(() => {
            return gapi.client.request({
                path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
            })
        }).then(resp => {
            setDates(resp.result.items);
        })
    };
    
    React.useEffect(() => {
        gapi.load("client", start);
    }, []);
    
    const renderTable = () => {
        return <table className={'calendar'}>
            <thead>
                <tr>
                    <th>Date</th><th>Time</th><th>Event</th><th>Location</th>
                </tr>
            </thead>
            <tbody>
                {dates.map(date => <tr key={date.id}>
                    <td>{new Date(date.start.dateTime).toLocaleDateString()}</td>
                    <td>{new Date(date.start.dateTime).toLocaleTimeString()}</td>
                    <td>{date.summary}</td>
                    <td>{date.location}</td>
                </tr>)}
            </tbody>
        </table>
    }
    
  return <div className={'Tour'}>
      <div className={'calendar'}>
         {renderTable()}
      </div>
  </div>
};

export default Tour;