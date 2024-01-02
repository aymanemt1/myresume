import { useContext } from "react"
import { LangueContext } from "../../Context/LangueContext"
import "./Services.css"
import { Translate } from "./ServiceTranslate"
export default function Services(){
    const {langue}=useContext(LangueContext)
  
    const Service = Translate.Services.find((lang)=>(
       lang.id == langue
     ))
    return(
        <>
             <h1><span style={{borderBottom:'3px solid #6856E0'}}> {Service.title} </span></h1>
      <h4  className='topServices'>{Service.sous_title}</h4>
     
        <div className="services" >
            <div className="fullstack-card" data-aos="zoom-out" 
     data-aos-duration="700">
                <h3 className="headCards">{Service.head_leftcard}</h3>
                <p>
               {Service.content_leftcard}
                    </p>
            </div>
            <div className="ui-ux-card" data-aos="zoom-out" 
     data-aos-duration="700">
                <h3 className="headCards">{Service.head_centercard}</h3>
                <p>
                {Service.content_leftcard}

                     </p>
            </div>
            <div className="responsive-mobile-card" data-aos="zoom-out" 
     data-aos-duration="700">
                <h3 className="headCards">{Service.head_rightcard}</h3>
                <p>
{Service.content_rightcard}
</p>
            </div>
        </div>
    </>
    
    )
}