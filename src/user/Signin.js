import React, { useState,useEffect } from 'react'


import { useHistory } from "react-router-dom";


function Signin() {
    const [info, setInfo] = useState({email:"",password:"",error:"",redirect:false,loading:false})
    let history = useHistory();

    const handleChange=(name,e)=>{
        setInfo({...info,[name]:e.target.value,error:"",})
    }
    const clickSubmit=async(e)=>{
        e.preventDefault();
        setInfo({...info,loading:true})
        const {email,password}=info;
        const user={
            email,password
        }
        console.log(user);   
     try{
      let res= await fetch("http://localhost:5500/signin",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        res= await res.json();
        console.log(res);
        if(res.error){
            setInfo({...info,error:res.error,loading:false})
        }else{
            authenticate(res);
        }
       }
       catch(err){
           setInfo({...info,error:err})
       }
    }
    const authenticate=(jwt)=>{
        if(typeof window!=="undefined"){
            localStorage.setItem("jwt",JSON.stringify(jwt));
            setInfo({...info,redirect:true})
            history.push("/");
        }
    }
    useEffect(() => {
        if(info.redirect===true){
            history.push("/");
        }
    }, [])
    return (
        <div className="container">
           <h2 className="mt-5 mb-5"> Signin</h2>

          {info.error ? 
          (<div className="alert alert-warning">{info.error}</div>)
               :<></> }

            {info.open ? 
          (<div className="alert alert-success">New account created.Please Sign in.</div>)
               :<></> }

                {
                    info.loading?(<div className="jumbotron text-center">
                        <h2>Loading...</h2>
                        </div>):(<></>)
                }

           <form>
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


export default Signin
