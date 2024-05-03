import React, { useContext } from 'react'
import './Footer.css'
import { LangueContext } from '../../Context/LangueContext'
import { Translate } from './FooterTranslate'
import { Link } from 'react-scroll'
export const Footer = () => {
    const { langue } = useContext(LangueContext)

    const Footer = Translate.Footer.find((lang) => (
        lang.id == langue
    ))

    return (
        <div className='contact-info'>
	<Link to="homeParent" smooth={true} offset={-100}  id="logofotter">Moutoute.</Link>
          
            <div className='info-personnel'>
                <div>
                    <h3 >{Footer.text}</h3>
                    <div className='icons'>
                        <i className="fa-brands fa-instagram" id='insta-icon'></i>
                        <a href=''><i className="fa-brands fa-facebook" id='fb-icon'></i> </a>
                        <a href='https://linkedin.com/in/aymanemoutoute1'><i className="fa-brands fa-linkedin" id='linkdein-icon'></i> </a>
                        <a href='https://github.com/aymanemt1'><i className="fa-brands fa-github" id='github-icon'></i></a>
                    </div>

                </div>
                <div id='info_personnel' >
                    <p><i className="fa-solid fa-location-dot" id='adress-icon'></i>Tangier, Morocco</p>
                    <p><i className="fa-solid fa-envelope" id='mail-icon'></i>moutouteayman10@gmail.com</p>
                    <p><i className="fa-solid fa-phone" id='phone-icon' ></i>+212 718788365</p>
                </div>

            </div>
        </div>
    )
}
