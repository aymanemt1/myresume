import React, { useContext, useState } from 'react'
import './Contact.css'
import axios from 'axios';
import { LangueContext } from '../../Context/LangueContext';
import { Translate } from './ContactTranslate';
export const Contact = () => {

    const {langue}=useContext(LangueContext)
  
    const Contact = Translate.Contact.find((lang)=>(
       lang.id == langue
     ))
   
     const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
    
        const mailtoLink = `mailto:moutouteayman10@gmail.com?subject=New Message&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
        
        window.location.href = mailtoLink;
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

  return (
    <>
      <h1><span style={{borderBottom:'3px solid #6856E0'}}> {Contact.title} </span></h1>
      <h4  className='topContact'>{Contact.sous_title} </h4>
    <div id='contactme'>
            <form onSubmit={handleSubmit}>
        <div className="input-group">
            <div className='top-form'>
 <div><input  onChange={handleChange} required="" type="text" name="name" autoComplete="off" className="name" placeholder={Contact.name} /></div>
 <div ><input onChange={handleChange} required="" type="email" name="email" autoComplete="off" className="email"  placeholder={Contact.email} /></div>
 </div>

 <div style={{marginTop:"30px"}}>
 <textarea onChange={handleChange} required="" type="text" name="message" autoComplete="off" className="message"  placeholder={Contact.message} />
 </div>
 <div>
 <button type='submit' className="buttonSend" > 
   {Contact.button_text}
</button>
 </div>

        </div>
        </form>
    </div>
    </>

  )
}
