import React from 'react'
import './Campus.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/porjaidee_logo.jpg'
import sanhuali from '../../assets/sanhuali.jpg'
import robot from '../../assets/robot.jpg'
import ganzi from '../../assets/ganzi.jpg'
import white_arrow from '../../assets/white-arrow.png'

const Campus = () => {
  return (
    <div className='campus'>
      <div className="gallery">
        <img src={logo} alt="Porjaidee" />
        <img src={sanhuali} alt="SanHuaLi Data Science" />
        <img src={robot} alt="高空采摘机器人" />
        <img src={ganzi} alt="Jikayi Village" />
      </div>
      <Link to="/gallery">
        <button className='btn dark-btn'>See more here <img src={white_arrow} alt="" /></button>
      </Link>
    </div>
  )
}

export default Campus
