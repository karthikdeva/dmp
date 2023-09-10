import React, {useRef} from "react"; //useEffect, useState
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { COMPANY_NAME } from "../lib/constants/common.constants";
import {  useSelector } from "react-redux";
import logo from '../assets/images/logo.png';
import { clearSessionAndSignout } from "../lib/utilities";

const Header = () => {
    const navigate  = useNavigate();
    const currentUser = useSelector(state => state.authentication.user);
    const menu = useRef(null);
    const fullName = `${currentUser?.userInfo?.firstName} ${currentUser?.userInfo?.lastName}`
   
    const gotoProfile=()=>{
        navigate('/profile');
    }
    const logout =()=>{
        clearSessionAndSignout(navigate('/signin'))     
    }
    const items =  [
        {
            label: 'Profile',
            icon: 'fas fa-user-cog',
            command: () => { gotoProfile() }
        },
        {
            label: 'Logout',
            icon: 'fas fa-sign-out-alt',
            command:()=> logout()
        }];
  

    return (
        <nav className="navbar top-menu drop-shadow-md flex justify-between bg-skin-fill   p-3">
            <NavLink className="navbar-brand text-skin-base"  to="/" path="/"> <img src={logo} width={70} alt={COMPANY_NAME} /> </NavLink>
            <div className="header-right">
                <Menu model={items} popup ref={menu} id="user-control" />
                <Button className="p-button-outlined bg-skin-button label-user border-0" iconPos="right" icon="fas fa-user-circle" label={fullName}  onClick={(event) => menu.current.toggle(event)} aria-controls="user-control" aria-haspopup />
            </div>
        </nav >
    )
}
export default Header;