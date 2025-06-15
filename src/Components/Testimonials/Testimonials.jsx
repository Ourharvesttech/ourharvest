import React, { useRef, useState } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/profile.png'
import user_2 from '../../assets/profile.png'
import user_3 from '../../assets/Michael.jpg'
import user_4 from '../../assets/profile.png'
import user_5 from '../../assets/Amy.jpg'

const Testimonials = () => {
    const slider = useRef();
    const [tx, setTx] = useState(0);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(true);

    const slideForward = () => {
        if(tx > -50){
            const newTx = tx - 25;
            setTx(newTx);
            slider.current.style.transform = `translateX(${newTx}%)`;
            setCanGoBack(true);
            if(newTx <= -50){
                setCanGoForward(false);
            }
        }
    }

    const slideBackward = () => {
        if(tx < 0){
            const newTx = tx + 25;
            setTx(newTx);
            slider.current.style.transform = `translateX(${newTx}%)`;
            setCanGoForward(true);
            if(newTx >= 0){
                setCanGoBack(false);
            }
        }
    }

    return (
        <div className='testimonials'>
            {canGoForward && <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>}
            {canGoBack && <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>}
            <div className="slider">
                <ul ref={slider}>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_1} alt="" />
                                <div>
                                    <h3>Jack</h3>
                                    <span>Wilbraham and Monson Academy</span>
                                </div>
                            </div>
                            <p>Founder of OurHarvestTech and also the technical director, led projects that involved data science and agriculture</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="" />
                                <div>
                                    <h3>Emma</h3>
                                    <span>International School Bangkok</span>
                                </div>
                            </div>
                            <p>Through the Our Harvest Tech platform, we hope to inspire more global small-scale farmers to take action and collectively create a more sustainable agricultural environment.</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_3} alt="" />
                                <div>
                                    <h3>Michael</h3>
                                    <span>交中IB课程中心</span>
                                </div>
                            </div>
                            <p>Hello, I'm Zhang Tianyue. When I was in my junior year of high school, I came up with the idea of replacing manual labor with robots after seeing an accident involving a farmer picking pine cones on the news, and designed a portable aerial picking robot. It can climb along irregular tree trunks, use AI to recognize fruits and plan picking paths to help fruit farmers improve efficiency and reduce losses. During the project, I not only challenged the robot path planning and stability, but also gained a deeper understanding of the actual needs of agriculture. I hope to use this platform to continue to explore the application of intelligent robots in agriculture, so that science and technology can truly serve production and life!</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_4} alt="" />
                                <div>
                                    <h3>Tim Dong</h3>
                                    <span>北京海淀凯文HKWA</span>
                                </div>
                            </div>
                            <p>Since I reside in Beijing, I typically encounter orchards and vegetable gardens that utilize advanced high-tech operations. These greenhouses allow diverse crops to thrive. However, when returning to my rural hometown - a less developed region compared to Beijing - limited by land and climatic constraints, only a few crop varieties can be cultivated annually on mountainous terrain. Therefore, through this platform, I aim to enhance smallholder farmers' agricultural knowledge, using our modest efforts to help them increase yields and improve economic competitiveness.</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_5} alt="" />
                                <div>
                                    <h3>Amy</h3>
                                    <span>MVA Shanghai</span>
                                </div>
                            </div>
                            <p>Growing up in Shanghai, I’ve always wanted to explore how agriculture connects people and cultures—something I don’t often encounter in my daily life. I hope to use this platform to dive deeper into the world of agriculture</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Testimonials
