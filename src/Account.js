import React, { useContext, useEffect, useState } from "react";
import './Style.css';
import { waitForElementToBeRemoved } from "@testing-library/react";
import { currentUser } from "./App";
import { Outlet, useNavigate } from "react-router-dom";
function Account() {
 var [welcomeUser,setwelcomeUser]=useState(false)
 const navigate=useNavigate()
 var user=useContext(currentUser);
 
 useEffect(()=>{
  if(!user)
  {
    navigate('/')
  }
},[])
 
  
  function display()
  {
    return<h2 id='welcomeHeading'>Welcome {user}</h2>
  }
  function clear()
  {
    console.log(user)
fetch('http://localhost:2100/clear/'+user)
.then(res=>res.json())
.then((data)=>{
  if(data.message=='success')
  {
    alert('deleted all')
  }
  else
  {
    alert('deletion failed')
  }
})
.catch(err=>{alert('unsucessful')})
  }
   
  return (
    <div>
     
  
<div id='dashBoard'>
     <h4 id='dash' >Dashboard</h4>
     <div id='dash_button'>
      <button onClick={()=>{setwelcomeUser(true);navigate('/account/campaign')}}>Start Campaign</button><br/>
      <button onClick={()=>{setwelcomeUser(true);navigate('/account/history')}}>History</button><br/>
      <button onClick={clear}>Clear Campaigns</button>
     </div>
     </div>
    <div>{welcomeUser?<Outlet/>:display()}</div>
     
    </div>
  );
}
export default Account;
