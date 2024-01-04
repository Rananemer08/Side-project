import React, { useEffect, useState } from 'react';
import './Memespage.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Memespage = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8100/api/memes");
        setMemes(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="product-page">
      <h2 className='title-meme'>Memes</h2>
      <div className="meme-list">
        {memes && memes.map((item, index) => (
          <div key={index} className="meme-card">
            <img src={`http://localhost:8100/${item.image}`} alt="Meme Image" />
            <div className="caption">
              <h3>{item.textCaption}</h3>
              <Link to={`/getOneMeme/${item.id}`}>View meme</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memespage;
