import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReadMemes() {
    const { id } = useParams();
    const [meme, setMeme] = useState([]);

    useEffect(() => {
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
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className='p-8'> 
                <h2>Meme Detail</h2>
                {meme && meme.id && (
                    <>
                        <h2>{meme.id}</h2>
                        <h2>{`http://localhost:4000/${meme.image}`}</h2>
                        <h2>{meme.textCaption}</h2>
                    </>
                )}
                </div>
                <Link to="/" className='btn btn-primary me-2'>Back</Link>
                <Link to={`/edit/${meme.id}`} className='btn btn-primary'>Edit</Link>
                
            </div>
        </div>
    );
}

export default ReadMemes;
