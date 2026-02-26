import React, { useState } from 'react';

export default function ImagePopup(props){

      
    return(
   
      <div className="popup__container-image">
       


        <img src={props.link}

          alt="Imagem ampliada"
          className="popup__image"
        />
        <p className="popup__image-title">{props.name}</p>
      </div>
  
      
      

    )
}