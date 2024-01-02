import React, { useEffect } from 'react'
import $ from 'jquery';
import './cursor.css'
export const Cursor = () => {

    useEffect(()=>{
        $(window).mousemove(function (e) {
            $(".ring").css(
              
                "transform",
                `translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
            );
        });
       },[])

  return (
  
        
  <div id="cursor" className="cursor">
    <div className="ring">
      <div>{/*Border*/}</div>
    </div>
    <div className="ring">
      <div>{/*Pointer*/}</div>		
    </div>
  </div>
  )
}
