import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo2.png'
import menu_icon from '../../assets/menu-icon.png'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { scroller } from 'react-scroll'
import blank from '../../assets/blank.png'

const Navbar = () => {
    const [sticky, setSticky] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const isHomePage = location.pathname === '/'

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setSticky(true) : setSticky(false)
        })
    }, [])

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu)
    }

    const handleNavigation = (section) => {
        if (!isHomePage) {
            navigate('/', { state: { scrollTo: section } });
            setTimeout(() => {
                scroller.scrollTo(section, {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    offset: section === 'hero' ? 0 : -260
                });
            }, 100);
        }
    }

    return (
        <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
            <RouterLink to="/" onClick={() => handleNavigation('hero')}>
                <img src={logo} alt="" className='logo' />
            </RouterLink>
            <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
                <li>
                    {isHomePage ? (
                        <ScrollLink to='hero' smooth={true} offset={0}>Home</ScrollLink>
                    ) : (
                        <div onClick={() => handleNavigation('hero')} style={{ cursor: 'pointer' }}>Home</div>
                    )}
                </li>
                <li>
                    {isHomePage ? (
                        <ScrollLink to='about' smooth={true} offset={-150}>About us</ScrollLink>
                    ) : (
                        <div onClick={() => handleNavigation('about')} style={{ cursor: 'pointer' }}>About us</div>
                    )}
                </li>
                <li>
                    {isHomePage ? (
                        <ScrollLink to='campus' smooth={true} offset={-260}>Projects</ScrollLink>
                    ) : (
                        <div onClick={() => handleNavigation('campus')} style={{ cursor: 'pointer' }}>Projects</div>
                    )}
                </li>
                <li>
                    {isHomePage ? (
                        <ScrollLink to='news' smooth={true} offset={-260}>News</ScrollLink>
                    ) : (
                        <div onClick={() => handleNavigation('news')} style={{ cursor: 'pointer' }}>News</div>
                    )}
                </li>
                <li>
                    {isHomePage ? (
                        <ScrollLink to='testimonials' smooth={true} offset={-260}>Team</ScrollLink>
                    ) : (
                        <div onClick={() => handleNavigation('testimonials')} style={{ cursor: 'pointer' }}>Team</div>
                    )}
                </li>
                <li>
                    <RouterLink to="/programs">Program</RouterLink>
                </li>
                <li>
                    {isHomePage ? (
                        <ScrollLink to='contact' smooth={true} offset={-260}><span className='btn'>Contact us</span></ScrollLink>
                    ) : (
                        <div onClick={() => handleNavigation('contact')} style={{ cursor: 'pointer' }}><span className='btn'>Contact us</span></div>
                    )}
                </li>
            </ul>
            <img src={blank} alt="" className='menu-icon' onClick={toggleMenu} />
        </nav>
    )
}

export default Navbar
