import React, { useState } from 'react';
import ButtonSearchComponet from '../../Header/ButtonSearchComponent/ButtonSearchComponet';
import { WrapperHeader } from './style';
import { Col, Image, Menu } from 'antd';
import {NewMenu2, MenuSpan,HotlineContainer, Icon, Label, PhoneNumber, Separator, SearchCol, LowText, FunCol ,NewMenu,MenuItem2} from "./style";
import logovot from '../../../../images/Logo.svg';
import bino from '../../../../images/bino.svg';
import user from '../../../../images/user.svg';
import cart from '../../../../images/cart.svg';
import MiniCartComponent from '../MiniCartComponent/MiniCartComponent';
import SuggestSearchComponent from '../SuggestSearchComponent/SuggestSearchComponent';
import { Link, useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);


  const focusSearch = () => {
    setIsMenuVisible(true);
    
  };

  const blurSearch = () => {
    setIsMenuVisible(false);
    
  };
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.clear();
          navigate("/");
  }
  return (
    <div>
      <WrapperHeader justify="center" align="middle">
        <div style={{marginRight:'30px', marginLeft:'30px'}} >
          <Image preview= {false} width={50} src={logovot} />
        </div>
        <div style={{marginRight:'3%'}}>
          <HotlineContainer>
            <Icon>📞</Icon>
            <Label>HOTLINE:</Label>
            <PhoneNumber>0977508430</PhoneNumber>
            <Separator>|</Separator>
            <PhoneNumber>0792677415</PhoneNumber>
          </HotlineContainer>
        </div>
        <Col style={{marginRight:'30px', marginLeft:'30px' ,textAlign: 'center',position:'relative'}}>

        
          <ButtonSearchComponet onFocus ={focusSearch} onBlur={blurSearch}/>
          
        
          

          <NewMenu2 className="menu" isVisible={isMenuVisible}  >
          <SuggestSearchComponent></SuggestSearchComponent>
         
        </NewMenu2>
       
        </Col>
        
        <FunCol style={{ marginRight:'12px', marginLeft:'30px' }}>
          <Image width={25} src={bino}  preview={false}/>
          <LowText>TRA CỨU</LowText>
          <NewMenu className="menu" >
          <MenuItem2><MenuSpan>Kiểm tra đơn hàng</MenuSpan></MenuItem2>
          <MenuItem2><MenuSpan>Kiểm tra bảo hành</MenuSpan></MenuItem2>
        </NewMenu>
        </FunCol>
        <FunCol style={{ marginRight:'12px', marginLeft:'12px' }}>
          <Image width={25} src={user} preview={false} />
          
          <LowText>TÀI KHOẢN</LowText>
          <NewMenu className="menu" >
          <Link style={{textDecoration:'none'}} to = '/account'>
          <MenuItem2 style={{width:'100px'}}><MenuSpan>Trang cá nhân</MenuSpan></MenuItem2>
          </Link>

          <Link style={{textDecoration:'none'}} to = '/admin'>
          <MenuItem2 style={{width:'100px'}}><MenuSpan>Quản lý web</MenuSpan></MenuItem2>
          </Link>
          <Link style={{textDecoration:'none'}} to = '/login'>
          <MenuItem2 style={{width:'100px'}}><MenuSpan>Đăng nhập</MenuSpan></MenuItem2>
          </Link>
          <Link style={{textDecoration:'none'}} to = '/signin'>
          <MenuItem2 style={{width:'100px'}}><MenuSpan>Đăng kí</MenuSpan></MenuItem2>
          </Link>
          <MenuItem2 style={{width:'100px'}} onClick={handleLogout}><MenuSpan>Thoát</MenuSpan></MenuItem2>
        </NewMenu>
          
        </FunCol>
        
        <FunCol style={{ marginRight:'12px', marginLeft:'12px' }}>
        <Link style={{textDecoration:'none'}} to = '/cart'>
          <Image width={25} src={cart} preview={false} />
          <LowText>GIỎ HÀNG</LowText>
          </Link>
          <NewMenu2 className="menu" >
          
          <MiniCartComponent ></MiniCartComponent>
        </NewMenu2>
          
        </FunCol>
       
      </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;
