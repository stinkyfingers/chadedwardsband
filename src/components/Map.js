import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { geocode } from '../Api';

const containerStyle = {
  width: '100vw',
  height: '70vh'
};

const defaultZoom = 8;

const center = {
  lat: 44.96299772831755,
  lng: -92.76016943115937
};

const coordKey = (coords) => {
  return `${coords.lat}-${coords.lng}`;
};

function Map({ upcomingDates }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const [markers, setMarkers] = React.useState([]);
  const [eventsWithCoords, setEventsWithCoords] = React.useState({});
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(defaultZoom);
  }, []);

  React.useEffect(() => {
    upcomingDates.forEach((event) => {
      return geocode(event.location?.replace(/\n/g, ' '))
        .then(res => {
          if (!res || !res.results || !res.results.length) return;
          if (!res.results[0].geometry) return;
          const coords = res.results[0].geometry.location;
          event.coords = coords;
          setEventsWithCoords(events => {
            const existing = events[coordKey(coords)];
            if (existing && existing.start.dateTime < event.start.dateTime) return events;
            return ({ ...events, [coordKey(event.coords)]: event })
          });
        })
        .catch(error => console.error('Error', error));
    });
  }, [upcomingDates]);
  React.useEffect(() => {
    setMarkers(Object.values(eventsWithCoords).map((event) => {
      const date = new Date(event.start?.dateTime);
      const dateTime = date ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : '';
      return ({
        ...event,
        dateTime,
        position: event.coords
      })
    }))
  }, [eventsWithCoords]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };
  
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={defaultZoom}
        onLoad={onLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        {selectedMarker ? (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h3>{selectedMarker.summary}</h3>
              <p>{selectedMarker.location}</p>
              <p>{selectedMarker.dateTime}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  ) : <></>
}

export default React.memo(Map)