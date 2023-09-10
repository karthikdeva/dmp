import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { InputSwitch } from 'primereact/inputswitch';

import Header from "./Header";
import { MENUITEMS } from "../lib/constants/common.constants"
import { handleSidebarToggle, handleSidebarMouseEvent } from './redux/actions/sidebar.action';
const SidebarMenu = () => {
    const dispatch = useDispatch();
    const sidebarStatus = useSelector(state => state.sidebar.sidebarStatus);
    const sidebarClassName = useSelector(state => state.sidebar.sidebarClassName);
    const [menuListItems, setMenuListItems] = useState([]);

    useEffect(() => {
         dispatch(handleSidebarToggle(true)); 
         setMenuListItems(generateMenuItems(MENUITEMS));
        return () => { }
    },[])

    const toggleSidebar = (e) => {
        dispatch(handleSidebarToggle(e.value));
    }

    const handleMouseEvent = (e) => {
        if (!sidebarStatus) {
            dispatch(handleSidebarMouseEvent(e.type));
        }
    }

    const generateLink = (menu)=>{
        let {page, path} = menu;
        path = path? path :'#';
        page = page? page :'#';
        return (
            <NavLink className={({ isActive }) => isActive? "active": ''} to={page} path={path}> 
                {menu.icon && <i className={menu.icon}></i>}
                <span className="link-text">{menu.label}</span>
            </NavLink>
        )
    }

    const generateMenuItems = (menuList, className='menu-list')=>{
        const menuClassName = `${className}`
       return( <ul className={menuClassName}>
                    {menuList.map((menu, index) => (
                        <li key={index}>
                            {generateLink(menu)}
                            { menu.childrens && generateMenuItems(menu.childrens, 'sub-menu')} 
                        </li>
                    ))}
             </ul>)
    }
   
    return (
        <section className="menubar-wrapper">
            <Header />
            <aside className={sidebarClassName} onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseEvent}>
                <div className="sidebar-logo"></div>
                <div className="layout-menu-container">
                    {menuListItems}
                </div>
                <div className="sidebar-toggler-wrapper">
                    <InputSwitch checked={sidebarStatus} onChange={toggleSidebar} />
                </div>
            </aside>
        </section>
    );
}

export default SidebarMenu;