import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Style.css";
import { useNavigate } from "react-router-dom";
function Explore() {
  var [exp, setexp] = useState([]);
  var [empty,setempty]=useState(false)
const navigate=useNavigate()
  useEffect(()=>{
    findAll('art');
  },[])
  function findAll(m) {
    var p=document.getElementsByClassName('exploreButton')
    for(var i=0;i<p.length;i++)
    {
      p[i].style.backgroundColor='white';
    }
    var k=document.getElementsByName(m);
    k[0].style.backgroundColor='#c9c5c5';
    fetch("http://localhost:2100/findAll/" + m)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        data.length==0 ? setempty(true) : setempty(false);
        setexp(data);
      })
      .catch(err=>{
        alert('server out of order')
      })
    
  }
  
  return (
    <div id="explore">
          <div id="exp">
            <p>
            <button name="art"
              className="exploreButton"
              onClick={() => {
                findAll("art");
              }}
            >
              Art
            </button></p>
            <p>
            <button name="music"
             className="exploreButton"
              onClick={() => {
                findAll("music");
              }}
            >
              Music
            </button></p>
            <p>
            <button name="technology"
              className="exploreButton"
              onClick={() => {
                findAll("technology");
              }}
            >
              Technology
            </button>
            </p>
            <p>
            <button name="business"
              className="exploreButton"
              onClick={() => {
                findAll("business");
              }}
            >
              Business
            </button>
            </p>
            <p>
            <button name="other"
              className="exploreButton"
              onClick={() => {
                findAll("other");
              }}
            >
              Others
            </button>
            </p>
          </div>
        

        
      
      <div id="display-cat">
        {exp.map((a) => {
          return (
            <div>
            <div>
                <p>
                  <img src={a.pic} />
                </p>
              </div>
              {console.log(a)}
              <div id="dis">
                <p>{a.title}</p>
                <p id='des'>{a.description}</p>
                <p>Target Amount : {a.amount}</p>
                <p><button className="contributeButton" onClick={()=>{navigate('/expand',{state:a})}}>Details</button></p>
              </div>{console.log(exp.length)}
             
            </div>
          );
        })}
        {empty && <p id='emptyExplore'>Nothing in this category yet</p>}
      </div>
    </div>
  );
}
export default Explore;
