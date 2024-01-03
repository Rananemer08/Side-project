import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './Dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [memes, setMemes] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8100/api/memes"
                );
                setMemes(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(); 
    }, []); 
    const handleDelete = (id) =>{
        axios.delete(`http://localhost:8100/api/memes/${id}`)
      console.log( response =>response.data.data)
     .then(response =>setMemes(response.data.data))
     .catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <title> Memes List</title>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className=' btn btn-success'> Create +</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>  
                            <th>Images</th> 
                            <th>Text Caption</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(memes) && memes.length > 0 ? (
                            memes.map((meme, index) => (
                                <tr key={index}>
                                    <td>{meme.id}</td>
                                    <td><img src={`http://localhost:4000/${meme.image}`}  /></td>
                                    <td>{meme.textCaption}</td>
                                    <td> 
                                    <Link to={`/read/${meme.id}`} className='btn btn-sm btn-info'>Read</Link>
                                        <Link to={`/edit/${meme.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                        <Link onClick={() => handleDelete(meme.id)} className='btn btn-sm btn-danger'>Delete</Link>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No memes found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
