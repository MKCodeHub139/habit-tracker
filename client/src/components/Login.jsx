import React, { useState } from "react";
import {LoginUser} from '../graphql/mutations';
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate()
  const [Login_User] =useMutation(LoginUser)
  const handleLoginUser =async(e)=>{
    e.preventDefault()
    const response =await Login_User({variables:{
     input:{ 
      email,
      password
    }
    }})
    if(response){
        navigate('/')
    }
  }
  return (
    <div className="w-full flex justify-center container mx-auto py-9">
      <form action="" onSubmit={handleLoginUser} className="flex flex-col w-1/3 gap-4 shadow-2xl my-9 p-5">
        <h2 className="text-2xl font-[600]">Login</h2>
        <label htmlFor="">email</label>
        <p>demo email:kaifansari@gmail.com</p>
        <input
          type="email"
          name=""
          id=""
          placeholder="enter email"
          value={email} onChange={(e)=>setEmail(e.target.value)}
          className="px-2 border-1 rounded"
        />
        <p>demo password : 1234</p>
        <label htmlFor="">password</label>
        <input
          type="password"
          name=""
          id=""
          placeholder="enter password"
          value={password} onChange={(e)=>setPassword(e.target.value)}
          className="px-2 border-1 rounded"
        />
        <button
          type="submit"
          className="cursor-pointer bg-fuchsia-300 py-1 rounded hover:bg-fuchsia-200"
        >
          Login
        </button>
        <p>Create a new account <Link to="/signup" className="underline text-pink-900">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
