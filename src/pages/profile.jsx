import React from "react";
import {  useSelector } from "react-redux";

import { formatDate } from "../lib/utilities";


const Profile = () => {
    const currentUser = useSelector(state => state.authentication.user);
    const fullName = currentUser?.userInfo?.firstName? `${currentUser?.userInfo?.firstName} ${currentUser?.userInfo?.lastName}` :'';
    const lastLogin = currentUser?.userInfo?.lastLogin ? formatDate(currentUser?.userInfo?.lastLogin) : '';
    const dateJoined = currentUser?.userInfo?.dateJoined ? formatDate(currentUser?.userInfo?.dateJoined) : '';
      return(
        <>
       <header className="profile-header"> 
            <div className="card mb-4">
                <div className="card-body text-center">
                    <h3 className="mb-3"> {fullName}</h3>
                    <p className="mb-4">Username: {currentUser?.userInfo?.username} </p>
                    <p className="mb-4">Emaild Id: {currentUser?.userInfo?.email} </p>
                    <p className="mb-4">Date Joined: {dateJoined} </p>
                    <p className="mb-4">Last login: {lastLogin} </p>
                  </div>
            </div>
       </header>
        </>
    )

}
export default Profile;