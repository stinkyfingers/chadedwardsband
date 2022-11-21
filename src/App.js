import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import About from './components/About';
import Tour from './components/Tour';
import Media from './components/Media';
import SongList from './components/SongList';
import Home from './components/Home';
import './App.css';
import useSongList from './hooks/songlist';
import useCalendar from './hooks/calendar';

function App() {
  const [songlist, songErr] = useSongList();
  const [pastDates, upcomingDates, calendarErr] = useCalendar();
  const [err, setErr] = React.useState();

  return (
      <div className="App">
          <BrowserRouter>
          <Header err={err} />
              <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/tour' element={<Tour pastDates={pastDates} upcomingDates={upcomingDates} err={calendarErr} />} />
                  <Route path='/media' element={<Media setErr={ setErr } />} />
                  <Route path='/songs' element={<SongList songlist={songlist} err={songErr} />} />
                  <Route path='/' element={<Home />} />
              </Routes>
          </BrowserRouter>
      
      </div>
    );
}

export default App;
