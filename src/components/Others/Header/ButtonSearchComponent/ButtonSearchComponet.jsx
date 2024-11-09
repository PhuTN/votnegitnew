import { Button, Input } from 'antd'
import React, { useState } from 'react'
import {SearchOutlined } from '@ant-design/icons'
import {SearchButton,SearchIconButton,SearchInput} from './style'

const ButtonSearchComponet = (props) => {
    const {size, placeholder, textButton, onFocus,onBlur} = props
    
  return (
    <SearchButton>
        <SearchInput size={size} placeholder= {placeholder}  onFocus={onFocus}  onBlur={onBlur}/>
        <SearchIconButton size={size} icon = {<SearchOutlined />}>{textButton}</SearchIconButton>
    </SearchButton>
  )
}

export default ButtonSearchComponet