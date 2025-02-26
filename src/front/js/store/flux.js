const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user_id: null,
			storeToken : false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (newLogin)=>{
				// const email= 'celia.bcn28@gmail.com'
				// const password ='8264'

				// const url = 'https://studious-space-meme-pjg46j5xjxxx3xww-3000.app.github.dev/login'
				console.log(newLogin)
				const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {"Content-Type":"application/json"},
					body: JSON.stringify(newLogin)
				})
				if(!resp.ok) throw Error("There was a problem in the login request")
					const data = await resp.json()
				// Guarda el token en la localStorage
				// También deberías almacenar el usuario en la store utilizando la función setItem
				localStorage.setItem("jwt-token", data.token);
				setStore({user_id: data.user_id})
				console.log(data)
				return data
			},
			// private : async()=>{
			// 	const token = localStorage.getItem("token")
			// 	const resp = await fetch(process.env.BACKEND_URL + "/private", {
			// 		method: "GET",
			// 		headers: {
			// 			"Content-Type":"application/json",
			// 			"Authorization":"Bearer" + token  
			// 		}
			// 	})
			// 	const data = await resp.json()
			// }
			logout:  ()=>{
				localStorage.removeItem("jwt-token")
				setStore({user: null})
			},
			register: async (email, password)=>{
				const bodyData = {
					email: email,
					password: password
				}
				const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {"Content-Type":"application/json"},
					body: JSON.stringify(bodyData)
				})
				const data = await resp.json()
				console.log(data)
				return data
			},
			private: (token)=>{
				const resp = fetch(process.env.BACKEND_URL + "/api/private")
				const data = resp.json()
				setStore({storeToken:true})
			}
		}
	};
};

export default getState;
