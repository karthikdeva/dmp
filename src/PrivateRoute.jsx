/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate, useLocation  } from 'react-router-dom';
import {  useSelector } from "react-redux";


export const PrivateRoute = ({ children  }) => {
        const isLoggedIn = useSelector(state => state.authentication.loggedIn);
        const location = useLocation();
        return isLoggedIn
          ? children
          : <Navigate
              to="/signin"
              replace
              state={{ path: location.pathname }}
            />;
      }
   
