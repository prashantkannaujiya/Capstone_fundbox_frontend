import React from "react";
import './Style.css';
function Register() {
  function enroll(ev) {
    ev.preventDefault();
    var h = document.getElementsByName("form");
    var k = {
      name: h[0].value,
      age: h[1].value,
      
      password: h[2].value,
    };
    
    fetch("http://localhost:2100/Register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(k),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Registered");
      })
      .catch(err=>alert(err))
      ev.target.reset();
  }
  return (
    <div id="register-form">
      <div>
      <h1 style={{fontWeight:'600'}}>Welcome to FundBox</h1>
        <br/>
        <h2>Create Account</h2>
      <form onSubmit={(e)=>{enroll(e)}}>
        <table>
          <tr>
            <td>
              <label>Name</label>
            </td>
            <td>
              <input type="text" name='form' required/>
            </td>
          </tr>
          <tr>
            <td>
              <label>Age</label>
            </td>
            <td>
              <input type="number" name='form' required/>
            </td>
          </tr>
         
          <tr>
            <td>
              <label>Password</label>
            </td>
            <td>
              <input type="password" name='form' required/>
            </td>
          </tr>
        </table>
        <button className="btn btn-outline-light">Submit</button>
      </form>
    </div>
    </div>
  );
}
export default Register;
