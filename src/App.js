import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import About from './components/About';
import Tour from './components/Tour';
import Media from './components/Media';
import SongList from './components/SongList';
import Home from './components/Home';

import './App.css';

function App() {
    const [err, setErr] = React.useState();
    
    return (
        <div className="App">
            <BrowserRouter>
            <Header err={err} />
                <Routes>
                    <Route path='/about' element={<About />} />
                    <Route path='/tour' element={<Tour />} />
                    <Route path='/media' element={<Media setErr={ setErr } />} />
                    <Route path='/songs' element={<SongList setErr={ setErr } />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        
        </div>
    );
}

export default App;
