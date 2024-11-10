import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [submitted,setSubmitted] = useState(false);
    const navigate = useNavigate();
    const endpointURL =process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE;
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(!submitted){
            setSubmitted(true);
            try{
                fetch("http://18.138.250.244/api/v1/loginUser",{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':'*'
                    },
                    body: JSON.stringify({
                        username,password
                    }),
                })
                .then(response => {
                   return response.json();
                })
                .then(data => {
                    if(data.status === true)
                    {
                        localStorage.setItem('authenticated',true);
                        localStorage.setItem('token', data.token);
                        setIsLoading(false);
                        navigate("/home");
                    }else
                    {
                        Swal.fire({
                            text: data.msg,
                            width: 500
                        }); 
                        setIsLoading(false);
                    }
                }).catch(error => console.error('Error:', error))
            }catch(error){
                console.error('Login failed: ',error.message);
                setIsLoading(false);
            }
        }
        setSubmitted(false);   
    }
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
            console.log(response.data); // Axios automatically parses the response as JSON
            //setLoading(false);
          })
          .catch(error => {
          });
      }, []);
  return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-20 w-auto"
                    />
                    <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form  method="POST" className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                                Username 
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              {isLoading?"Loading...":" Sign in"} 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
  )
}

export default Login