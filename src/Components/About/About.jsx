import React from 'react'
import './About.css'
import about_img from '../../assets/agtech.jpg'
import play_icon from '../../assets/play.png'

const About = () => {
  return (
    <div className='about'>
      <div className="about-left">
        <img src={about_img} alt="" className='about-img'/>
        <img src={play_icon} alt="" className='play-icon'/>
      </div>
      <div className="about-right">
        <h3>ABOUT US</h3>
        <h2>OurHarvestTech</h2>
        <p>OurHarvestTech is a social enterprise dedicated to advancing sustainable agriculture through technology and data-driven solutions. A global effort we focus on addressing ecological and environmental challenges faced by local farmers.</p>
        <p>Our mission is to empower communities with innovative tools, research, and education to improve productivity, reduce environmental impact, and promote long-term sustainability.</p>
        <p>By collaborating with farmers, researchers, and policymakers, we strive to create a healthier, more resilient agricultural ecosystem for future generations.</p>
      </div>
    </div>
  )
}

export default About
