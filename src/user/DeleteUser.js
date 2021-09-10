import React from 'react'
import { isAuthenticated } from "../core/Menu";
import {signout} from "../core/Menu"
import { useHistory } from "react-router-dom";

function DeleteUser({userId}) {
    let history = useHistory();

    const deleteAccount=()=>{
        const token=isAuthenticated().token;
        
        remove(userId,token)
         .then(data=>{
             if(data.error){
                 console.log(data.error);
             }
             else{  
                signout().then(data=>{
                    if(data.error){
                        console.log(data.error);
                    }
                    else{
                        history.push("/");
                    }
                })
             }
         })
         .catch(error=>{
             console.log(error);
         })

    }
    const remove=async(userId,token)=>{
        try{
          const res=await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
                method:"DELETE",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            return res.json();
        }
        catch(error){
            console.log(error);
        }
    }
    const deleteConfirm=()=>{
        let ans=window.confirm("Are you sure you want to delete your account ?")
        if(ans){
            deleteAccount()
        }
    }

    return (
        <button 
        onClick={deleteConfirm}
        className ="btn btn-raised btn-danger">
            Delete Profile
        </button>
    )
}

export default DeleteUser
