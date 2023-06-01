import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles/Datagrid.css"

const DataGrid = () => {
  const [data, setData] = useState([]);

  // Fetch data from the API and update the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.spacexdata.com/v3/rockets");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  // Calculate the indexes of the items to display based on the current page
  const currentItems = data;

  return (
    <>
      <main className="data-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="grid-item" style={{ backgroundImage: `url(${item.flickr_images[0]})` }}>
            {/* Render the item data */}
            <h3>{item.rocket_name}</h3>
            <div className="grid-item-content">
              <p>{item.description}</p>
              <p>{item.first_flight}</p>
              <p>$ {item.cost_per_launch}/-</p>
              {/* <img src={item.flickr_images[0]} alt='' /> */}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default DataGrid;
