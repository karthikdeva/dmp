import React from "react";
import { useNavigate  } from "react-router-dom";
import { PAGE_404 } from "../lib/constants/common.constants";

const PageNotFound = () => {
    const navigate = useNavigate();
    const gotoHome= ()=>{
        navigate('/');
    }
    return ( <>
                <div className="page page-404 text-center">
                    {/* <i className="fas fa-charging-station fas fa-plane-slash"></i> */}
                    <i className="fas fa-plane-slash icon-large"></i>
                    <h1 className="page-title text-3xl ">{PAGE_404} </h1>
                    <button className="btn btn-primary rounded-md px-3 hover:bg-primary-hover" onClick={gotoHome}><i className="fas fa-home p-1"> </i>Take me to Home</button>
                </div>
            </>
)
    }
export default  PageNotFound;