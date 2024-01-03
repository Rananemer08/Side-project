// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function CreateMemes() {
//   const [values, setValues] = useState({
//     image: '',
//     textCaption: ''
//   });
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', values.image);
//     formData.append('textCaption', values.textCaption);

//     axios.post("http://localhost:8100/api/memes", formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//       .then((response) => {
//         setValues(response.data);
//         navigate('/');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
//       <div className='w-50 bg-white rounded p-3'>
//         <form onSubmit={handleSubmit}>
//           <h2>Add Memes</h2>
//           <div className='mb-2'>
//             <label htmlFor='imageInput'>Image</label>
//             <input
//               type='file'
//               accept='image/*'
//               className='form-control'
//               onChange={e => setValues({ ...values, image: e.target.files[0] })}
//             />
//           </div>
//           <div className='mb-2'>
//             <label htmlFor='captionInput'>Text Caption</label>
//             <input
//               type='text'
//               id='captionInput'
//               placeholder='Enter text caption'
//               className='form-control'
//               onChange={e => setValues({ ...values, textCaption: e.target.value })}
//             />
//           </div>
//           <button className='btn btn-success'>Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateMemes;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateMemes() {
    const [values, setValues] = useState({
        image: '',
        textCaption: ''
    });
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8100/api/memes", values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            setValues(response.data);
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Memes</h2>
                    <div className='mb-2'>
                        <label htmlFor='imageInput'>Image</label>
                        <input
                            type='file'
                            accept='image/*'
                            className='form-control'
                            onChange={e => setValues({ ...values, image: e.target.files[0] })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='captionInput'>Text Caption</label>
                        <input
                            type='text'
                            id='captionInput'
                            placeholder='Enter text caption'
                            className='form-control'
                            onChange={e => setValues({ ...values, textCaption: e.target.value })}
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateMemes;
