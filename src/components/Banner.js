import React, { useState, useEffect } from 'react';
import "./styles/Banner.css";
import RocketCarousel from './Carousel';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
    const [rockets, setRockets] = useState([]);

    useEffect(() => {
        const fetchRockets = async () => {
            try {
                const response = await axios.get('https://api.spacexdata.com/v3/rockets');
                setRockets(response.data);
            } catch (error) {
                console.log('Error fetching rockets:', error);
            }
        };

        fetchRockets();
    }, []);

    return (
        <div className="banner">
            <div className='heading'>
                <h1 className="heading-text">Welcome to SpaceX</h1>
                <p className="lead">Explore Rockets and Capsules</p>
            </div>
            <div className="carousel-container">
                <RocketCarousel rockets={rockets} />
            </div>
        </div>
    );
}

export default Banner;
