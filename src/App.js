import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/Header';
import About from './components/About';
import Tour from './components/Tour';
import Photos from './components/Photos';
import Video from './components/Video';
import SongList from './components/SongList';
import Requests from './components/Requests';
import Home from './components/Home';
import Tech from './components/Tech';
import Chadlibs from './components/chadlibs/Chadlibs';
import ChadGPT from './components/chadgpt/ChadGPT';
import Admin from './components/admin/Admin';
import AdminPhotoUpload from './components/admin/PhotoUpload';
import AdminPhotos from './components/admin/Photos';
import './App.css';
import useSongList from './hooks/songlist';
import useCalendar from './hooks/calendar';

export const Router = ({ setErr }) => {
  const [songlist, songErr] = useSongList();
  const [pastDates, upcomingDates, calendarErr] = useCalendar();

  const location = useLocation();

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Monoton', 'Azeret Mono']
      }
    });
  }, []);
  React.useEffect(() => {
    const path = location.pathname.length > 1 ? ` - ${location.pathname.slice(1)}` : '';
    document.title = `Chad Edwards Band${path}`;
  }, [location])

  return (
    <Routes>
      <Route path='/about' element={<About />} />
      <Route path='/tour' element={<Tour pastDates={pastDates} upcomingDates={upcomingDates} err={calendarErr} />} />
      <Route path='/photos' element={<Photos setErr={ setErr } />} />
      <Route path='/video' element={<Video />} />
      <Route path='/songs' element={<SongList songlist={songlist} err={songErr} dates={[...pastDates, ...upcomingDates]} calendarErr={calendarErr}  />} />
      <Route path='/requests' element={<Requests />} />
      <Route path='/tech' element={<Tech />} />
      <Route path='/libs/*' element={<Chadlibs />} />
      <Route path='/gpt' element={<ChadGPT setErr={setErr} />} />
      <Route path='/admin' element={<Admin setErr={setErr} />}>
        <Route path='photos/upload' element={<AdminPhotoUpload setErr={setErr} />} />
        <Route path='photos' element={<AdminPhotos setErr={setErr} />} />
      </Route>
      <Route path='/' element={<Home pastDates={pastDates} upcomingDates={upcomingDates} err={calendarErr} />} />
    </Routes>
  );
}

function App() {
  const [err, setErr] = React.useState();
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Monoton', 'Azeret Mono']
      }
    });
  }, []);

  return (
      <div className="App">
        <BrowserRouter>
          <div className='sticky'>
            <Header err={err} />
          </div>
          <div />
          <div className='body'>
            <Router setErr={setErr} />
          </div>
        </BrowserRouter>
      </div>
    );
}

export default App;
