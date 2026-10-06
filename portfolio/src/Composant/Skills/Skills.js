import React, { useContext } from 'react'
import { Skills } from './SkillsData';
import "./skills.css"
import { LangueContext } from '../../Context/LangueContext';
import { Translate } from '../About/AboutTranslate';

export const MySkills = () => {

  const {langue}=useContext(LangueContext)
  
  const Skill = Translate.About.find((lang)=>(
     lang.id == langue
   ))

    const filteredSkillsFront= Skills.filter((skill) => (
        skill.type === 'frontend'
      ));

      const renderSkill = (skill, index) => (
        <span key={index} className="skill-item" title={skill.text}>
          <i className={skill.icon} id='iconSkills'></i>
          <small className="skill-name">{skill.text}</small>
        </span>
      );

      const frontendSkills = filteredSkillsFront.map(renderSkill);
    const filteredSkillsBack= Skills.filter((skill) => (
        skill.type === 'backend'
      ));

      const backendSkills = filteredSkillsBack.map(renderSkill);

    const filteredSkillsOthers= Skills.filter((skill) => (
        skill.type === 'others'
      ));

      const OtherSkills = filteredSkillsOthers.map(renderSkill);
      
  return (
    <div id='skills'>
    <h2>{Skill.skill_head}</h2>
  
  <div className='skillsContent' >

<div className='frontend' data-aos="zoom-out" 
     data-aos-duration="700">
    <div className='skill'>
    
   {frontendSkills}
</div>
</div>
<div  className='backend' data-aos="zoom-out" 
     data-aos-duration="700">
    <div className='skill'>

   {backendSkills}
    </div>
</div>
<div  className='others' data-aos="zoom-out" 
     data-aos-duration="700">
    <div className='skill'>
   {OtherSkills}
    </div>

    <div>
    </div>
   
</div>
   
</div>

   </div>
  )
}
