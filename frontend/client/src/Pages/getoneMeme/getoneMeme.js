import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

function GetOneMeme() {
  const { id } = useParams();
  const [meme, setMeme] = useState([]); 

  useEffect(() => {
    console.log("ID received:", id); 
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:8100/api/memes/${id}`
          );
          setMeme(response.data.data); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [id]);
  

  return (
    <div  className="for-background">
    <div className=" vh-100 bg-primary justify-content-center align-items-center">
      <h2 className='title-meme'>Meme</h2>
      <div className="meme-list meme-one">
        {meme && ( 
          <div className="meme-card meme-one">
            <img src={`http://localhost:8100/${meme.image}`} alt="Meme Image" />
            <div className="caption">
              <h3>{meme.textCaption}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default GetOneMeme;
