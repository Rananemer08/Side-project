


import React from 'react'
import './meme.css'
function meme({data}) {
  return (
    <div>
       <section className="memes">
          
          <div className="meme-card">
            <img src={`http://localhost:4001/${data.image}`}alt="meme image" />
            <h3>{data.textCaption}</h3>
            
            
          </div>
        </section>
       

    </div>
  )
}

export default meme


  
