import React, { useState } from 'react'
import './GalleryPage.css'
import blank from '../../assets/blank.png'
import robot from '../../assets/robot.jpg'
import ganzi from '../../assets/ganzi.jpg'
import play_icon from '../../assets/play-icon.png'
import porjaidee_video from '../../assets/porjaidee.mp4'
import logo from '../../assets/porjaidee_logo.jpg'
import sanhuali from '../../assets/sanhuali.jpg'

const galleryData = [
  {
    type: 'video',
    videoUrl: porjaidee_video,
    thumbnail: logo,
    title: "Porjaidee",
    description: "Porjaidee is a social enterprise based in Chiang Mai, Thailand, dedicated to addressing the ecological and environmental challenges faced by Chiang Mai Province. In recent years, we have focused our research on the issue of air pollution in Chiang Mai and discovered that its primary source is agricultural practices. The local farmers mainly cultivate rice and corn. To maintain soil nutrients, they have long adopted the \"Slash and Burn\" method, where crop residues are burned and then buried in the soil. While this practice provides some nutrients in the short term, the burning process releases a large amount of PM2.5 particles, severely affecting air quality and causing persistent smog issues during Chiang Mai's dry season each year. Additionally, traditional agriculture heavily relies on chemical fertilizers, leading to significant water pollution in surrounding areas, threatening both local residents' health and the ecological balance. Faced with these environmental challenges, we actively seek more eco-friendly solutions. Locally, we organize workshops and training sessions in villages to educate farmers on sustainable agricultural practices and teach them how to produce organic fertilizers. The challenges faced by Chiang Mai are global issues."
  },
  {
    img: sanhuali,
    title: "SanHuaLi Data Science",
    description: "Agricultural productivity is influenced by a multitude of factors, ranging from natural environmental conditions to human-driven economic and policy interventions. Understanding these dynamics is essential for improving farm efficiency and sustainability. SanHuaLi plums, a regionally significant crop, provide an excellent case study for evaluating these relationships. Water availability and soil conditions determine plant health and fruit yield, while insecticide use plays a critical role in pest control but may also have unintended environmental consequences. At the same time, socioeconomic factors such as household income and education levels affect farmers’ ability to invest in better farming techniques and technologies. This research contributes to agricultural sustainability by integrating field data, household surveys, and policy analysis to develop an evidence-based approach to SanHuaLi plum farming. The findings will not only enhance scientific understanding of farming practices but also serve as a resource for policy- makers and farmers striving to balance productivity with ecological responsibility."
  },
  {
    img: robot,
    title: "高空采摘机器人",
    description: "随着我国科技实力不断提升，科技兴农成为建设社会主义现代化强国的重要目标。我国是树果种植的第一大生产国，也是第一大消费国。然而，在树果种植的整体流程中，采摘是一项非常耗时耗力的工作，同时也会影响树果品质和产量。目前大多数种类树生果实的采摘方式仍采用传统的手工作业方式，劳动强度大、劳动成本高、效率较低，特别是高空采摘具有一定的危险性。很多试验开发的农业采摘机器人并未在实际生产中得到广泛应用，其主要问题在于：1、爬树机械结构复杂笨重，难以适应不同直径的树种；2、缺少横向移动设计，难以解决有树枝分叉作业环境中的避障问题；3、果实识别的精准度和采摘方式方面仍存在很大的不足，难以成功采摘果实。因此，为了提高树果采摘的效率和质量，降低树果采摘的成本和风险，解决目前采摘机器人爬树以及识别精准度等问题，本课题设计了一种全新的高空树果采摘机器人全向移动结构的原型方案。本课题通过动力学分析探讨了机器人的固定结构与移动结构，使用3D建模和打印制作了机器人原型，实现其在树干上的上下左右全向移动，同时还运用了深度神经网络算法进行了树果的识别测试，实现了通过摄像头图像识别来确定果实位置和成熟程度，最后使用较为成熟的小型机械臂完成采摘工作。"
  },
  {
    img: ganzi,
    title: "Jikayi Village Abandoned Farmland Field Research Report",
    description: "On the second day of our summer project in the Jiarong Tibetan area, we took the forest school's mountain road and viewed the overall landscape of Jikayi Village in Danba County. A peculiar scene unfolded before our eyes: scattered and increasingly dense patches of abandoned farmland lay across the uneven mountainous fields from the center to the edges. Why have these lands been abandoned? Why are they mostly concentrated near the deep mountain forests? To uncover this series of mysteries, our team conducted a field survey to investigate the specific situation and underlying causes of the abandoned farmland, interviewing local villagers and seeking answers from nature."
  },
  // Add more images and descriptions here
]

const GalleryPage = () => {
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleVideoClick = (index) => {
    setPlayingVideo(playingVideo === index ? null : index);
  };

  const handleVideoPause = () => {
    setPlayingVideo(null);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Our Gallery</h1>
        <p>Explore our Projects</p>
      </div>
      <div className="gallery-grid">
        {galleryData.map((item, index) => (
          <div className={`gallery-item ${playingVideo === index ? 'playing' : ''}`} key={index}>
            {item.type === 'video' ? (
              <>
                <img src={item.thumbnail} alt={item.title} />
                <div className="play-button" onClick={() => handleVideoClick(index)}>
                  <img src={play_icon} alt="Play" />
                </div>
                {playingVideo === index && (
                  <div className="video-container">
                    <video 
                      src={item.videoUrl} 
                      controls 
                      autoPlay
                      onEnded={() => setPlayingVideo(null)}
                      onPause={handleVideoPause}
                    />
                  </div>
                )}
                <div className="overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </>
            ) : (
              <>
                <img src={item.img} alt={item.title} />
                <div className="overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GalleryPage
