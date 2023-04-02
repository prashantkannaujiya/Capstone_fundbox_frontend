import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Style.css';
function Explore()
{
var [exp,setexp]=useState([]);

function findAll(m)
{
    fetch(('http://localhost:2100/findAll/'+m))
    .then((res)=>res.json())
    .then((data)=>{console.log(data);setexp(data)})
    document.querySelector('#site-face').style.display='none';
    document.querySelector('#about-us').style.display='none';    
}
    return(
        
<div id='explore'>
<div>
           <div id='site-face'>
                
                <h1>FundBox</h1>
               
            </div>

    <div>
<div id='exp'>
    <p></p>
        <button  className='btn btn-light' onClick={()=>{findAll('art')}}>Art</button>
        <button  className="btn btn-light" onClick={()=>{findAll('music')}}>Music</button>
        <button  className='btn btn-light' onClick={()=>{findAll('technology')}}>Technology</button>
        <button  className='btn btn-light' onClick={()=>{findAll('business')}}>Business</button>
        <button  className='btn btn-light' onClick={()=>{findAll('other')}}>Others</button>
    </div>
</div>

<div id='about-us'>
                <h3>About Us</h3>
                <span>" We help bring a creative project to life. 
                    Helping people create and to those in need is what
                            we serve for.
                    Apart from creative domain, we stand up for people 
                    wishing to undertake a charity."
                </span>
                </div>
</div>
<div id='display-cat'>
    {
        exp.map((a)=>{
         
            return <div>{console.log(a)}
                <div id='dis'>
                    <p>{a.title}</p>
                <p>{a.description}</p>
                <p>Target Amount : {a.amount}</p>
                </div>
                <div>
                <p><img src={a.pic}/></p>
                </div>
                </div>
        })
    }
</div>
        </div>
    )
}
export default Explore;