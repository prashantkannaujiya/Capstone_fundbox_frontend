import React, { createContext, useEffect, useState } from "react";
import Register from "./Register";
import Account from "./Account";
import "./Style.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";    
import Explore from "./Explore";
import Contact from "./Contact";
import Know from "./Know";
import Grow from "./Grow";
import Searching from "./Searching";
import { Route,Routes, useNavigate,Link, useLocation } from "react-router-dom";
import Home from "./Home";
import History from "./History";
import Campaign from "./Campaign";
import Expand from "./Expand";
import { Search } from "react-bootstrap-icons";
import {BiSearch} from 'react-icons/bi';
export const currentUser=createContext();
function App() {
 var [searched,setsearched]=useState(null)
 var location=useLocation();
  var [user, setuser] = useState(null);
  const navigate=useNavigate();
useEffect(()=>{
  console.log(location.pathname)
  
 
footset();
},[location])


  const login = (event) => {
    event.preventDefault();
    var h = document.getElementsByName("log");
   
    var k = {
      name: h[0].value,
      password: h[1].value,
    };
    fetch("http://localhost:2100/Login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(k),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.message=='success')
        {  window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("name", data.name);
        console.log(data);
        display_menu();
        setuser(data.name);
console.log(user)
        }
        else{
          document.getElementById('err').style.display='block';
        }
      
      })
      .catch((er) => {
        console.log(er);
      });
  };
  function logoff() {
    window.localStorage.clear();
    setuser(null);
    navigate('/')
  }
  function display() {
    var t = window.localStorage.getItem("token");
    const tt=document.querySelector('#login-menu');
    document.querySelector('body').addEventListener('click',e=>{
      console.log(e)
      console.log(tt.contains(e.target))
      if(e.target!=tt && e.target!=document.querySelector('#but-log') && !tt.contains(e.target))
      {
        document.querySelector('#login-menu').style.display='none';
        console.log(tt.getElementsByTagName('*')) 
      }
    })
    var link = "http://localhost:2100/auth/" + t;
    if (t != null) {
      fetch(link)
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "approved") {
            setuser(data.data);
          } else {
            
            display_menu();
          }
        })
        .catch((err) => {
          console.log(err);
          display_menu();
        });
    } else {
      
      display_menu();
    }
  }
 
  function display_menu() {
  
   
   document.getElementById('login').reset();
    document.getElementById('err').style.display='none';
    var k = document.getElementById("login-menu");
    (k.style.display == "none"
      ? (k.style.display = "block")
      : (k.style.display = "none"));
  }
  
  function footset()
  {
    const h=document.getElementById('app').scrollHeight;
    const width=document.getElementById('app').scrollWidth;
    console.log(h +' '+ width)
const p=document.getElementById('foot')   
    if(h<600 && width>600)
    {
      const property={position:'absolute',top:'6in'};
      p.style.position='absolute';
      p.style.top='5in';
      p.style.left='5.5in';
    }
    else
    {
      p.style.position='static';
    }
  }
  return (
    <div id="app">
      <div id="main-header">
      <Link to='/'><h1 style={{fontFamily:'Lobster, cursive'}}>FundBox</h1></Link>  
       <span id='searchBox'><input type='text' placeholder="Search in Campaigns" onChange={(e)=>{setsearched(e.target.value)}}/><button style={{width:'1.5cm',padding:'5px'}}><BiSearch id='search' onClick={()=>{navigate('/search',{state:searched})}}></BiSearch></button> </span>
        <div>
          {user == null ? (
            <div>
              <button  
                onClick={() => {
                  navigate('/register')
                }}
                
              >
                Register
              </button>
              <button id='but-log'  onClick={display}>Login</button>
            </div>
          ) : (
            <div>
              <span>{user + "   "}</span>
              <button   onClick={logoff}>Logout</button>
              <button  
                onClick={() => {
                 navigate('/account');
                }}
              >
                My Account
              </button>
            </div>
          )}

          <div id="login-menu">
            <br />
            <h3>FundBox</h3>
            <h4>Sign in to FundBox</h4>
            <h6>Sign in using your FundBox account</h6>
          <form id='login' onSubmit={(e)=>{login(e)}}>
          <input type='text' name='log' placeholder='name'/><br/>
            <input type='password' name='log' placeholder='password'/><br/>
            <p id='err'>Incorrect credentials</p>
            <button>Submit</button>
            
          </form>
            
           
          </div>
        </div>
      </div>
     
     <div id='mainContent'>
     <currentUser.Provider value={user}>
     <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/explore' element={<Explore></Explore>}/>
      <Route path='/contact' element={<Contact></Contact>}/>
      <Route path='/grow' element={<Grow></Grow>}/>
      <Route path="/search" element={<Searching></Searching>}/>
      <Route path='/know' element={<Know></Know>}/>
      <Route path='/account' element={<Account></Account>}>
      <Route path='/account/history' element={<History></History>}>
      <Route path='/account/history/expand' element={<Expand></Expand>}/>
      </Route>
      <Route path='/account/campaign' element={<Campaign></Campaign>}/>
 </Route>
      <Route path='/register' element={<Register></Register>}/>
            <Route path='/expand' element={<Expand></Expand>}/>
     </Routes>
     </currentUser.Provider>
     </div>
     {console.log(document.getElementById('app'))}
  <div id='foot'>
   
    <Link to='/contact'>Contact Us</Link>
    <Link to='/grow'>Grow With Us</Link>
    <Link to='/know'>Know Us</Link>
  </div>
 
    </div>
  );
}
export default App;


