import React, { useEffect, useState, useContext }  from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import {  useNavigate } from "react-router-dom";



export const Navbar = () => {


	const { store, actions } = useContext(Context)
	
	const navigate = useNavigate()
	const [isloggedin, setisLoggedIn] = useState(false)
	
	useEffect(()=>{
	
		const token = localStorage.getItem("jwt-token")
	if (token) {
		setisLoggedIn(true);
		console.log(isloggedin)
	}
	else {
		setisLoggedIn(false)
		navigate("/")
	}
	},[localStorage.getItem("jwt-token")])
	
	
	const handleLoggout = ()=>{
		actions.logout()
		setisLoggedIn(false)
		navigate("/")
		
	}

	return (

		<div>
{isloggedin  === false ? (<>

		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary m-2">Login</button>
					</Link>
					<Link to="/register">
						<button className="btn btn-primary m-2">Signup</button>
					</Link>
				</div>
			</div>
		</nav>
		</>) : (<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary m-2"
						onClick={handleLoggout}>Logout</button>
					</Link>
					<Link to="/register">
						<button className="btn btn-primary m-2">Signup</button>
					</Link>
				</div>
			</div>
		</nav>)

} 
		</div>
	);
};
