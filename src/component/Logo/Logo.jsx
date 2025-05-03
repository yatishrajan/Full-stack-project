import React from 'react'
import image from './image.png';
function Logo({width='50px'}){
             return(
              <img
              src={image}
              alt='LOGO'
              className=' rounded-4xl'></img>
             )
 }
 export default Logo;