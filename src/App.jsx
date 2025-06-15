import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Title from './Components/Title/Title'
import About from './Components/About/About'
import Campus from './Components/Campus/Campus'
import Testimonials from './Components/Testimonials/Testimonials'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import VideoPlayer from './Components/VideoPlayer/VideoPlayer'
import ProgramsPage from './Components/ProgramsPage/ProgramsPage'
import GalleryPage from './Components/GalleryPage/GalleryPage'
import News from './Components/News/News'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'

const App = () => {
  const [playState, setPlayState] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <div id="hero">
                <Hero />
              </div>
              <div className="container">
                <div id="about">
                  <About setPlayState={setPlayState} />
                </div>
                <div id="campus">
                  <Title subTitle='Gallery' title='Project Photos' />
                  <Campus />
                </div>
                <div id="news">
                  <Title subTitle='Latest Updates' title='Agricultural News' />
                  <News />
                </div>
                <div id="testimonials">
                  <Title subTitle='TEAM' title='Our Team' />
                  <Testimonials />
                </div>
                <div id="contact">
                  <Title subTitle='Contact Us' title='Get in Touch' />
                  <Contact />
                </div>
              </div>
            </>
          } />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
        <Footer />
        <VideoPlayer playState={playState} setPlayState={setPlayState} />
      </div>
    </Router>
  )
}

export default App
