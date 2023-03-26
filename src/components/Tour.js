import React from 'react';
import Error from './Error';
import '../css/tour.css';

// values that alter the calendar row style
const oblique = ['canceled', 'cancelled', 'postponed'];
const updated = ['updated', 'changed'];

const Tour = ({ pastDates, upcomingDates, err }) => {
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
    
    const renderTable = (dates, calendarType) => {
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
                    return <tr key={event.id} className={`eventRow ${ styleEventSummary(event.summary, calendarType)}`}>
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
      { err && <Error err={err} /> }
      <div className={'calendar'}>
          <h3 className={'upcomfingDates'}>Upcoming Dates</h3>
         {renderTable(upcomingDates, 'upcoming')}
      </div>
      <div className={'pastDates'}>
          <h3 className={'pastDates'}>Past Dates</h3>
          {renderTable(pastDates, 'past')}
      </div>
  </div>
};

export default Tour;