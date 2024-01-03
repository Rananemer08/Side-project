import React, { useState, useEffect } from 'react';
import {  useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

function EditDashboard() {
    const { id } = useParams();
    const [meme, setMeme] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [textCaption, setTextCaption] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(
                        `http://localhost:8100/api/memes/${id}`
                    );
                    setMeme(response.data.data);
                    setImageFile(null);
                    setTextCaption(response.data.data.textCaption);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    // const handleImageChange = (e) => {
    //     setImageFile(e.target.files[0]);
    // };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('textCaption', textCaption);
            await axios.put(`http://localhost:8100/api/memes/${id}`, formData);
            navigate('/')
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Meme</h2>
                    <div className='mb-2'>
                        <label htmlFor='imageInput'>Image</label>
                        <input
                            type='file'
                            accept='image/*'
                            className='form-control'
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='captionInput'>Text Caption</label>
                        <input
                            type='text'
                            id='captionInput'
                            placeholder='Enter text caption'
                            className='form-control'
                            value={textCaption}
                            onChange={(e) => setTextCaption(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditDashboard;
