import React from 'react';
import { gapi } from 'gapi-script';

import '../css/tour.css';

const calendarID = process.env.REACT_APP_CALENDAR_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const Tour = () => {
    const [upcomingDates, setUpcomingDates] = React.useState([]);
    const [pastDates, setPastDates] = React.useState([]);
    
    const start = () => {
        gapi.client.init({
            apiKey: apiKey
        }).then(() => {
            return gapi.client.request({
                path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
            })
        }).then(resp => {
            setPastDates([]);
            setUpcomingDates([]);
            if (!resp.result?.items) return;
            const now = new Date();
            return resp.result.items.map(event => {
                const date = event.start.dateTime ? Date.parse(event.start.dateTime) : Date.parse(event.start.date);
                if (date > now) {
                    setUpcomingDates(dates => [...dates, event]);
                } else {
                    setPastDates(dates => [...dates, event]);
                }
                return null;
            })
        })
    };
    
    React.useEffect(() => {
        gapi.load("client", start);
    }, []);
    
    const renderTable = (dates) => {
        if (!dates.length) return null;
        dates = dates.sort((a, b) => {
            const aStart = a.start.dateTime ? Date.parse(a.start.dateTime) : Date.parse(a.start.date);
            const bStart = b.start.dateTime ? Date.parse(b.start.dateTime) : Date.parse(b.start.date);
            return aStart > bStart ? 1 : -1;
        });
        return <table className={'calendar'}>
            <thead>
                <tr>
                    <th>Date</th><th>Time</th><th>Event</th><th>Location</th>
                </tr>
            </thead>
            <tbody>
                {dates.map(event => {
                    const date = event.start.dateTime ? new Date(event.start.dateTime).toLocaleDateString() : new Date(event.start.date).toLocaleDateString();
                    const time = event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) : 'TBA';
                    const endTime = event.end.dateTime ? new Date(event.end.dateTime).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) : null;
                    return <tr key={event.id} className={'eventRow'}>
                        <td>{date}</td>
                        <td>{time} {endTime ? ` - ${endTime}` : ''}</td>
                        <td>{event.summary}</td>
                        <td><a href={`http://maps.google.com/?q=${event.location}`} target='_'>{event.location}</a></td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    
  return <div className={'Tour'}>
      <div className={'calendar'}>
          <h3 className={'upcomfingDates'}>Upcoming Dates</h3>
         {renderTable(upcomingDates)}
      </div>
      <div className={'pastDates'}>
          <h3 className={'pastDates'}>Past Dates</h3>
          {renderTable(pastDates)}
      </div>
  </div>
};

export default Tour;