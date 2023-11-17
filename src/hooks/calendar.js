import React from 'react';
import { gapi } from 'gapi-script';

const calendarID = process.env.REACT_APP_CALENDAR_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const useCalendar = () => {
  const [upcomingDates, setUpcomingDates] = React.useState([]);
  const [pastDates, setPastDates] = React.useState([]);
  const [err, setErr] = React.useState();
  React.useEffect(() => {
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
      }).catch(setErr)
    };
    gapi.load("client", start);
  }, [setErr]);
  return [pastDates, upcomingDates, err];
};

export default useCalendar;