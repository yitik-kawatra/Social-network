import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'

function Signup() {
    const [info, setInfo] = useState({name:"",email:"",password:"",error:"",open:false})
    

    const handleChange=(name,e)=>{
        setInfo({...info,[name]:e.target.value,error:""})
    }
    const clickSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=info;
        const user={
            name,email,password
        }
        // console.log(user);   
     try{
      let res= await fetch("http://localhost:5500/signup",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        res= await res.json();
        if(res.error){
            setInfo({...info,error:res.error})
        }else{
        setInfo({error:"",name:"",email:"",password:"",open:true})
        }
       }
       catch(err){
           setInfo({...info,error:err})
       }
    }

    return (
        <div className="container">
           <h2 className="mt-5 mb-5"> Signup</h2>

          {info.error ? 
          (<div className="alert alert-warning">{info.error}</div>)
               :<></> }

            {info.open ? 
          (<div className="alert alert-success">New account created.Please {" "}<Link to="/signin">Sign in.</Link></div>)
               :<></> }
          <form>
                <div className="form-group">
                 <label className="text-muted">Name</label>
                <input onChange={(e)=>handleChange("name",e)} type="text" className="form-control" value={info.name} /> 
                </div>

                <div className="form-group">
                <label className="text-muted">Email</label>
                <input  onChange={(e)=>handleChange("email",e)} type="email" className="form-control" value={info.email}/> 
                </div>

                <div className="form-group">
                <label className="text-muted">Password</label>
                <input  onChange={(e)=>handleChange("password",e)} type="password" className="form-control" value={info.password} /> 
                </div>

                <button onClick={clickSubmit} className="btn btn-raised btn-primary mt-5">
                    Submit
                </button>

                
           </form>
        </div>  
    )
}

export default Signup
