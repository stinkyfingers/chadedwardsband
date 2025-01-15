import React from 'react';
import Error from './Error';
import Map from './Map';
import '../css/tour.css';

// values that alter the calendar row style
const oblique = ['canceled', 'cancelled', 'postponed'];
const updated = ['updated', 'changed'];

const renderTable = (dates, calendarType) => {
    if (!dates.length) return null;
    // styleEventSummary returns different style strings if the summary contains keywords. 
    const styleEventSummary = (summary, calendarType) => {
        if (oblique.some((val) => (summary.toLowerCase().includes(val)))) {
            return calendarType === 'past' ? 'hidden' : 'oblique';
        }
        if (updated.some((val) => (summary.toLowerCase().includes(val)))) {
            return 'bold';
        }
        return '';
    };
    dates = dates.sort((a, b) => {
        const aStart = a.start.dateTime ? Date.parse(a.start.dateTime) : Date.parse(a.start.date);
        const bStart = b.start.dateTime ? Date.parse(b.start.dateTime) : Date.parse(b.start.date);
        return calendarType === 'past' ?  aStart > bStart ? -1 : 1 : aStart > bStart ? 1 : -1;
    });
    return <table className={'calendar'}>
        <thead>
        <tr>
            <th>Date</th><th>Time</th><th>Event</th><th>Location</th>
        </tr>
        </thead>
        <tbody>
        {dates.map(event => {
            const date = event.start.dateTime ? new Date(event.start.dateTime).toLocaleDateString() :
              new Date(new Date(event.start.date).getTime() + new Date(event.start.date).getTimezoneOffset() * 60000).toLocaleDateString();
            const time = event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) : 'TBA';
            const endTime = event.end.dateTime ? new Date(event.end.dateTime).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) : null;
            return <tr key={event.id} className={`eventRow ${ styleEventSummary(event.summary, calendarType)}`}>
                <td>{date}</td>
                <td>{time} {endTime ? ` - ${endTime}` : ''}</td>
                <td>{event.summary}</td>
                <td><a href={`http://maps.google.com/?q=${event.location}`} target='_'>{event.location}</a></td>
            </tr>
        })}
        </tbody>
    </table>
};

export const PastDates = ({ dates }) => (
    <div className={'pastDates'}>
        <h3 className={'pastDates'}>Past Dates</h3>
        {renderTable(dates, 'past')}
    </div>
);

export const UpcomingDates = ({ dates }) => (
    <div className={'upcomingDates'}>
        <h3 className={'upcomingDates'}>Upcoming Dates</h3>
        {renderTable(dates, 'upcoming')}
    </div>
);

const Tour = ({ pastDates, upcomingDates, err }) => {
    const [showMap, setShowMap] = React.useState(true);
    if (!upcomingDates || !upcomingDates.length) return;
    return <div className={'Tour'}>
      { err && <Error err={err} /> }
      { showMap ? (
        <div>
            <Map upcomingDates={upcomingDates}/>
        </div>
        ) : null }
      <div>
          <button
             className='mapButton'
             onClick={() => setShowMap(!showMap)}
          >
              {showMap ? 'Hide Tour Map' : 'Show Tour Map'}
          </button>
      </div>
      <UpcomingDates dates={upcomingDates} />
      <PastDates dates={pastDates} />
  </div>
};

export default Tour;