import React, { useEffect } from 'react'
import './Modal.css'
import $ from 'jquery'
export const ModalVid = () => {

    useEffect(()=>{
        // $(document).foundation();
    },[])

  return (
<div>
  <div className="column text-center">
    <div className="medium reveal" id="modal-video" data-reveal data-reset-on-close="true" data-animation-in="fade-in" data-animation-out="fade-out">
      <div className="flex-video widescreen vimeo">
        {/* <iframe src="https://player.vimeo.com/video/60122989" width={400} height={225} frameBorder={0} webkitallowfullscreen mozallowfullscreen allowFullScreen /> */}
      </div>
      <button className="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div className="button large success" data-toggle="modal-video">Show Video</div>
  </div>
</div>
  )
}
