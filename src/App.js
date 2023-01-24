import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/Header';
import About from './components/About';
import Tour from './components/Tour';
import Photos from './components/Photos';
import Video from './components/Video';
import SongList from './components/SongList';
import Home from './components/Home';
import Tech from './components/Tech';
import './App.css';
import useSongList from './hooks/songlist';
import useCalendar from './hooks/calendar';

function App() {
  const [songlist, songErr] = useSongList();
  const [pastDates, upcomingDates, calendarErr] = useCalendar();
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
            <Routes>
              <Route path='/about' element={<About />} />
              <Route path='/tour' element={<Tour pastDates={pastDates} upcomingDates={upcomingDates} err={calendarErr} />} />
              <Route path='/photos' element={<Photos setErr={ setErr } />} />
              <Route path='/video' element={<Video />} />
              <Route path='/songs' element={<SongList songlist={songlist} err={songErr} />} />
              <Route path='/tech' element={<Tech />} />
              <Route path='/' element={<Home />} />
            </Routes>
            </div>
        </BrowserRouter>
      </div>
    );
}

export default App;
