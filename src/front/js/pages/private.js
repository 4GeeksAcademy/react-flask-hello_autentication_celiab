import React, { useEffect, useState } from 'react'
import { Context } from '../store/appContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';



export const Private = () => {

return  <div className = "d-flex justify-content-center">
            <h1 className = "m-5">This is your private area</h1>

                    <Link to="/home">
                        <button type="submit" className="btn btn-primary mt-5"
                        >Return Home</button>
                    </Link>

        </div>



}