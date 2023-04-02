import React, { useEffect, useState } from "react";
import Home from "./Home";
import Register from "./Register";
import Account from "./Account";
import "./Style.css";
import 'bootstrap/dist/css/bootstrap.css';
import Explore from "./Explore";
import Contact from "./Contact";
import Know from "./Know";
import Grow from "./Grow";
function App() {
 
  var [log, setlog] = useState(0);
  var [user, setuser] = useState(null);
  
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
    setlog(0);
  }
  function display() {
    var t = window.localStorage.getItem("token");
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
  function msg_dis(){
    var k=document.getElementById('msg');
    k.style.display='none';

  }
  return (
    <div id="app">
      <div id="main-header">
        <h1 onClick={()=>{setlog(0)}}>FundBox</h1>
       
        <div>
          {user == null ? (
            <div>
              <button  
                onClick={() => {
                  setlog(1);
                }}
              >
                Register
              </button>
              <button   onClick={display}>Login</button>
            </div>
          ) : (
            <div>
              <span>{user + "   "}</span>
              <button   onClick={logoff}>Logout</button>
              <button  
                onClick={() => {
                  setlog(2);
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
      {(()=>{
        try{
          if(log==0)
          {
            return <Explore></Explore>
          }
          else if(log==1)
          {
            return <Register></Register>
          }
          else if(log==2)
          {
            return <Account u={user}></Account>
          }
          else if(log==3){
          return <Contact></Contact>
          }
          else if(log==4)
          {
            return <Grow></Grow>
          }
          else{
            return <Know></Know>
          }
        }
        catch(e){
          console.log(e)
        }

  })()

  }
  <div id='foot'>
    <p>Interested in Us ??</p>{console.log('hi')}
    <button onClick={()=>{setlog(3)}}>Contact Us</button>
    <button onClick={()=>{setlog(4)}}>Grow With Us</button>
    <button onClick={()=>{setlog(5)}}>Know Us</button>
  </div>
 
    </div>
  );
}
export default App;
