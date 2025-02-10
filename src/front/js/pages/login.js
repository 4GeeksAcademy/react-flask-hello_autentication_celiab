import React, { useEffect, useState } from 'react'
import { Context } from '../store/appContext';
import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';


export const Login = () => {
     const navigate = useNavigate()
     const { store, actions } = useContext(Context)
     const [login,setLogin] = useState({
        email:"",
        password:""
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        actions.login(login)
        navigate("/private")
    }

    const handleChange = (e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
        console.log(login)
    }

    return <div className="row">
        <div className=" col-12 mt-5">
        
            <div className='d-flex justify-content-center '>
               
                <form>
                    <h5  className='mt-4 '>LOGIN</h5>

                    <div className="form-group mt-2">
                        <label for="exampleInputEmail1">Email address</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        value ={login.email}
                        name= "email"
                        onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group mt-2">
                        <label for="exampleInputPassword1">Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                        name = "password"
                        value = {login.password}
                        onChange={handleChange}
                        />
                    </div>

                    <Link to="/private">
                        <button type="submit" className="btn btn-primary mt-5"
                        onClick={handleSubmit}>Submit</button>
                    </Link>

                </form>
            </div>
        </div>
    </div>

}

