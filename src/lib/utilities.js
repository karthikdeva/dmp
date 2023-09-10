import * as moment from 'moment'
import React from "react";
import { API_ENDPOINT_GPQL } from '../lib/constants/common.constants';
import noImage from '../assets/images/no-image.jpg';

export const formatDate = (value) => {
    return moment(new Date(value)).format("DD-MMM-YYYY");
}

export const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.node.modifiedAt);
}
export const defaultBodyTemplate = () => {
    return "--";
}


export const imageBodyTemplate = (rowData) => {
    const imagePath = `${API_ENDPOINT_GPQL}media/${rowData.node.image}`;
    return ( 
        <div className='img-thumbnail text-center'>
             <img src={imagePath} alt = { rowData.node.firstName } onError={(e)=>e.currentTarget.src=noImage}/>
        </div>
    )
}
export const getAuthInfo = () => {
        const authInfo = localStorage.getItem('authInfo') ? JSON.parse(localStorage.getItem('authInfo')) : '';
        return authInfo;
}

export const clearSessionAndSignout=()=>{
    localStorage.removeItem('authInfo');}

export const setAuthTokenInLocalStorage = (userInfo) => {
    localStorage.setItem('authInfo', JSON.stringify(userInfo));
}

