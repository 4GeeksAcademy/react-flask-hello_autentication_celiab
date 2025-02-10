import React, { useEffect, useState } from 'react'
import { Context } from '../store/appContext';
import { useContext } from 'react';


export const Register = () => {

    const { store, actions } = useContext(Context)

    return <div className="row">
    <div className=" col-12 mt-5">
    
        <div className='d-flex justify-content-center '>
           
            <form>
                <h5  className='mt-4 '>SIGNUP</h5>
                <div className="form-group mt-2">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mt-2">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary mt-5"
                onClick={()=>{actions.login()}}
                >Submit</button>
                
            </form>
        </div>
    </div>
</div>


}



