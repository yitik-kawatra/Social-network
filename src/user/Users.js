import React,{useState,useEffect} from 'react'
import Dimg from "../images/avatar.png"
import {Link} from 'react-router-dom'

function Users() {
    const [users, setUsers] = useState([]);

    const fetchUsers=async()=>{
        try{
        let res=await fetch(`${process.env.REACT_APP_API_URL}/users`,{
            method:"GET"
        })
        res=await res.json();
        if(res.error){
            console.log(res.error);
        }
        else{
           setUsers(res);
        }
    }
    catch(error){
        console.log(error);
    }

    }
    useEffect(() => { 
        fetchUsers();
    }, [])

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">
                Users
            </h2>

            <div className="row">
                    {
                      users.map((user,i)=>(
                        <div className="card col-md-4" key={i}>
                        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light" >
                        <img
                          src={Dimg}
                          className="img-fluid" alt={user.name}   
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">
                          {user.email}
                        </p>
                        <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile</Link>
                      </div>
                        </div>
                        )
                    )
                  
                }
            </div>
            
        </div>
    )
}

export default Users
