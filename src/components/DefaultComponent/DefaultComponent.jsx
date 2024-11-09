import React from 'react'
import HeaderComponent from '../Others/Header/HeaderComponent/HeaderComponent'
import MainMenuComponent from '../Others/Header/MainMenuComponent/MainMenuComponent'
import FooterComponent from '../Others/Footer/FooterComponent/FooterComponent'
import { Footer } from 'antd/es/layout/layout'

const DefaultComponent = ({children}) => {
  return (
    <div>
    <HeaderComponent></HeaderComponent>
    <MainMenuComponent></MainMenuComponent>
    {children}
    <FooterComponent></FooterComponent>
    </div>
  )
}

export default DefaultComponent