import React, { useState } from 'react';
import axios from 'axios';
import "./styles/SearchForm.css";

const SearchForm = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [showPopupScroll, setShowPopupScroll] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    axios.get("https://api.spacexdata.com/v3/rockets").then((response) => {
      // setSearchResults(response);
      const rocket = response.data;
      const data = [];
      rocket.forEach((rocket) => {
        if (rocket.rocket_name === searchTerm) {
          data.push(rocket);
          console.log(data);
        }
      })
      setSearchResults(data)
      setShowPopup(true);

      setShowPopupScroll(true);
      document.body.classList.add('disable-scroll');
    })
      .catch((error) => {
        console.log(error);
        setSearchResults([]);
        setShowPopup(false);
      })
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSearchTerm('');
    setShowPopupScroll(false);
    document.body.classList.remove('disable-scroll'); // Remove disable-scroll class from body
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };



  return (
    <section className="search-form">
      <form onSubmit={handleSearch}>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          className='search-input'
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder='Rocket Name'
        />

        <button type="submit" className='search-btn'>Search</button>
      </form>


      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={handlePopupClose}>
              Close
            </button>
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <div key={item.id} className='popup-container'>
                  <h1>{item.rocket_name}</h1>
                  <p>{item.description}</p>
                  <p>{item.active}</p>
                  <img src={item.flickr_images[0]} alt='' />
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchForm;
