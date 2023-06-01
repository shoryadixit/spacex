import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Carousel.css'; // Import a CSS file for custom styles if needed

const RocketCarousel = () => {
  const [images, setImages] = useState([]);
  const [name, setNames] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v3/rockets')
      .then((response) => {
        const flickrImages = response.data.map((rocket) => rocket.flickr_images).flat();
        const rocketNames = response.data.map((rocket) => rocket.rocket_name).flat();
        setImages([...flickrImages]); // Update the state with the images array
        setNames([...rocketNames]);
      })
      .catch((error) => {
        console.error('Error:', error);
        setImages([]); // Update the state with an empty array in case of an error
      });
  }, []);

  console.log(name);

  return (
    <Carousel
      interval={4000} // Set the interval for automatic scrolling in milliseconds (e.g., 3000ms = 3 seconds)
      pause={false} // Disable pausing on hover
      indicators={false} // Hide the slide indicators
      wrap={true} // Enable wrapping of slides
      fade={false} // Use fade transition between slides
    >
      {images.map((imageUrl, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100 carousel-image" src={imageUrl} alt={`Image ${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default RocketCarousel;
