// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Meme from "../meme";


// function MemeCaresoul() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchMeme = async () => {
//       try {
//         const response = await axios.get('http://localhost:8100/api/memes');
//         console.log("res", response.data.data);
//         setData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     fetchMeme();
//   }, []);

//   const responsive = {
//     // Your responsive object here
//   };

//   return (
//     <Carousel
//       swipeable={true}
//       draggable={true}
//       showDots={true}
//       responsive={responsive}
//       ssr={true}
//       infinite={true}
//       autoPlaySpeed={1000}
//       keyBoardControl={true}
//       customTransition="all .5"
//       transitionDuration={500}
//       containerClass="carousel-container"
//       removeArrowOnDeviceType={["tablet", "mobile"]}
//       dotListClass="custom-dot-list-style"
//       itemClass="carousel-item-padding-40-px"
//     >
//       {data && data.map((item, index) => (
//         <Meme key={index} data={item} />
//       ))}
//     </Carousel>
//   );
// }

// export default MemeCaresoul;
