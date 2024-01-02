import React, { useContext, useEffect, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import './topbar.css'
import {Link} from 'react-scroll'
import {Translate} from './NavbarTranslate'
import { LangueContext } from '../../Context/LangueContext';

gsap.registerPlugin(ScrollTrigger);

export const TopBar = () => {
  
  const {langue,setlangue}=useContext(LangueContext)
  
    const Navbar = Translate.Navbar.find((lang)=>(
       lang.id == langue
     ))
   
  const handlLangue =(event)=>{
      event.preventDefault();
  }

  const navLinks = [
    { id:1, to: 'aboutParent', text:`${Navbar.link1}` },
    { id:2, to: 'servicesParent', text:`${Navbar.link2}` },
    { id:3, to: 'projectsPranet', text:`${Navbar.link3}` },
    { id:4, to: 'ContactParent', text:`${Navbar.link4}` },
  ];
  
  const renderNavLinks = navLinks.map((link) => (
  <li key={link.id}>
      <Link id={link.id} className='nav-link' to={link.to} smooth={true} offset={-100} duration={500}> {link.text}</Link>
    </li>
   
  ));

//MENU
const [showMenu, setShowMenu] = useState(false);

const toggleMenu = () => {
  setShowMenu(!showMenu);
};


  return (
    <>
   <header>
	<nav className="FixedNav">
		<ul>
	<li><Link to="homeParent" smooth={true} offset={-100}  id="logo">Moutoute.</Link></li>
 
  <ul id='rightNav' className={showMenu ? 'show' : ''}>
 
  {renderNavLinks}
  <form onSubmit={handlLangue} >
      <select onChange={(e)=>setlangue(e.target.value)} id='lang' value={langue}>
        <option value="en" className='option-en'>
          en
        </option>
        <option value="fr" className='option-fr'>
          fr
        </option>
      </select>
    </form>
  </ul>
  <button className='btnOpen' onClick={toggleMenu}>
  {showMenu ? (
        <i className="menu-btn fa-solid fa-xmark" />
        ) : (
          <i className="menu-btn fa-solid fa-bars" />
      )}
      </button>
		</ul>
	</nav>
</header>


    </>

  )
}
