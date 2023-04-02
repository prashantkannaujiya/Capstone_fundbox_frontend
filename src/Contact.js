import React from "react";
function Contact()
{
    function query(ev)
    {
        ev.preventDefault();
        alert("It's a dummy feature. Thanks for your interest")
        ev.target.reset();
    }
return(
    <div id='contact'>
        <h1 style={{marginTop:'0.5cm'}}>Contact Us</h1>
        <p style={{marginBottom:'1cm'}}>Kindly fill the form and we'll get back to you</p>
        <form onSubmit={(e)=>{query(e)}}>
            <table>
              <tr>
                <td><label>Name</label></td>
                <td><input type='text'/></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input type='mail'/></td>
              </tr>
              <tr>
                <td>Phone</td>
                <td><input type='phone'/></td>
              </tr>
              <tr>
                <td>Country</td>
                <td><input type='text'/></td>
              </tr>
              <tr>
                <td>Put your query</td>
                <td><textarea rows={3} cols={22}></textarea></td>
              </tr>
            </table>
            <button className="btn btn-outline-light">Submit</button>
        </form>
    </div>
)
}
export default Contact;