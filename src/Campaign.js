import React, { useContext } from "react";
import { currentUser } from "./App";

function Campaign()
{
    var user=useContext(currentUser);
    function submit_campaign(ev) {
        ev.preventDefault();
        var k1 = document.getElementsByName("option-category");
        console.log(k1[0].value);
        var k2=document.getElementsByName('campaign')
    
        var k = {
          name: user,
          campaign: {
            category: k1[0].value,
            title:k2[0].value.trim(),
            amount: k2[1].value,
            pic:k2[2].value,
            description: document.getElementById("des").value,
          },
        };
    
        fetch("http://localhost:2100/submitcampaign/", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(k),
        })
          .then((res) => res.json())
          .then((data) => {
            alert('Campaign registered')
            console.log(data);
          });
          ev.target.reset();
      }
     
    return(
        <div id="campaign">
        <form onSubmit={(e)=>{submit_campaign(e)}}>
        <h3>Kick Start your campaign</h3>
        <table>
          <tr>
            <td>
              <label>Choose a category</label>
            </td>
            <td>
              <select name="option-category">
                <option value="art">Art</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="music">Music</option>
                <option value="other">Other</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td><input type='text' name='campaign' required/></td>
          </tr>
          <tr>
            <td>Target Amount</td>
            <td>
              <input type="text" name="campaign" required/>
            </td>
          </tr>
          <tr>
            <td>Campaign pic</td>
            <td><input type='text' name='campaign' placeholder='Enter URL' required/></td>
          </tr>
          <tr>
            <td>Provide a description</td>
            <td>  <textarea rows={3} cols={22} id='des' required/>
            </td>
          </tr>
        </table>
       

       
        <br/>
        <button>Submit</button>
        </form>
      </div>
    
    )
}
export default Campaign;


