import React, { useRef , useContext} from "react";
import { useForm } from "react-hook-form";

import { useMutation } from "@apollo/client";

import {  useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';

import { useDispatch } from "react-redux";
import { loginAction } from '../components/redux/actions/authentication.action'
import { LOGIN } from "../graphQL/auth.gql";
import { AuthContext } from "../lib/context/AuthProvider";

import imageSrc from '../assets/images/login-bg.png';
import logo from '../assets/images/logo.png';

const Signin = () => {
    const [signInUser] = useMutation(LOGIN);
    const toast = useRef(null);
    const authContext = useContext(AuthContext);
    const { register, handleSubmit, formState: {isDirty,isSubmitting,  isValid,  errors } } = useForm({ mode: "onChange"});

    const history = useNavigate();
    const dispatch = useDispatch();
   
    const submitLogin = async (formData) => {
        try {
            const response = await signInUser({ variables: formData });
            const data = { userInfo: response?.data?.tokenAuth.user, token:response?.data?.tokenAuth.token };
            toast.current.show({severity:'success', summary:"Success" , detail:"Redirecting to home page", life: 3000});
            authContext.setAuthInfo(data);
            dispatch(loginAction(data,history));
              
        } catch (error) {
            const errorMessage =  (error?.graphQLErrors?.length)? error.graphQLErrors[0]?.message:''
            toast.current.show({severity:'error', summary: errorMessage, detail:errorMessage, life: 3000});
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="login-page-container mb-0 ">
                <div className="flex flex-wrap items-center h-screen">
               
                    <div className="col-8 d-flex justify-content-center">
                         <img src={imageSrc} alt="infiniti" className="max-w-full" />
                    </div>
                    <div className="col-4 p-4 flex login-form-wrapper flex-col items-center justify-center">
                    <div className="mb-4 flex justify-center items-center">
                                <img src={logo} alt="infiniti" width={100} className="max-w-full" />
                                </div>
                        <form onSubmit={handleSubmit(submitLogin)} className="login-form drop-shadow-md mt-8 w-full p-6" noValidate>
                      
                             <h4>Sign in to account</h4>
                           <p>Enter your username &amp; password to login</p>
                               
                                <div className="mb-4">
                                    <label className="mb-2 block" htmlFor="username">Username</label>
                                    <input  className={errors.username ?'form-control form-error':'form-control'}  id="username" {...register('username',{required:true})} type="text" />
                                    {errors.username && <span className='error'><i className='fas fa-exclamation-triangle'></i>Username is required</span>}
                                </div>
                                <div className="mb-1">
                                    <label className="mb-2 block" htmlFor="password">Password</label>
                                    <input  className={errors.password ?'form-control form-error':'form-control'}   id="password" type="password"  {...register('password', {required:true})} />
                                    {errors.password && <span className='error'><i className='fas fa-exclamation-triangle'></i>Password is required</span>}
                                </div>
                                <div className="form-group mb-0">
                    <div className="checkbox p-0">
                      <input id="checkbox1" type="checkbox"/>
                      <label className="text-muted" htmlFor="checkbox1">Remember password</label>
                    </div>
                    <button className="btn btn-primary  w-full btn-block w-100"  disabled={!isDirty || isSubmitting || !isValid} type="submit">Sign in</button>
                  </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signin;