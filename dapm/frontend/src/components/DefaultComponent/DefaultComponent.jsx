import React from 'react'
import HeaderComponent from '../HeaderCompoent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import DarkMode from '../DarkMode/DarkMode'
import { useState } from 'react'
import '../DefaultComponent/DefaultComponent.css'

const DefaultComponent = ({children}) => {
  const [isDark, setDarkMode] = useState(false);
  return (
    <div>
        <HeaderComponent />
        <DarkMode isChecked={isDark} toggleTheme= {() => setDarkMode(!isDark)}/>
        <div className='App' data-theme={isDark ? "dark" : "light"}>
          <div className='title'>
            {children} 
          </div>
        </div>
        
   
        <FooterComponent/>
    </div>
  )
}

export default DefaultComponent