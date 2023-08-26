import React, { useContext, useEffect, useState } from "react";
import { currentUser } from "./App";
import { Outlet, useNavigate } from "react-router-dom";

function History() {
  var [detail, setdetail] = useState([]);
  var [user,setuser]=useState(null)
  var [expand,setexpand]=useState(null);
const u=useContext(currentUser);

  var navigate=useNavigate()
  useEffect(() => {

    var link = "http://localhost:2100/history/" + u;
    console.log(link);
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        try {
          if (data.length != 0) {
            console.log(data)
            document.querySelector("#empty-history").style.display = "none";
            setdetail([...data]);
          
          } else {
            // alert('Your history is empty');
            document.querySelector("#empty-history").style.display = "block";
            setdetail([]);
          }
        } catch (err) {
          alert("error with handling response");
        }
      })
      .catch((err) => {
        alert("Some Error with server");
      });
  }, [u]);

  function erase(m)
  {
   
    fetch('http://localhost:2100/erase/'+m)
    .then((res)=> res.json())
    .then((hist)=>{
      console.log(hist)
      if(hist[0].campaign.length==0)
    {
      document.querySelector("#empty-history").style.display = "block";
      setdetail([]);
    }
    
  else{
  
    console.log(hist[0].campaign)
   setdetail(hist[0].campaign)
  }})
  .catch(err=>{console.log(err);alert('Error occured while deleting')})
  }
  return (
    <div id="history">
      
      <div id="history-display">
        <div>
          {(() => {
            if (detail.length != 0) {
              return detail.map((det,i) => {
                return (
                  <div id='historyCampaign' onClick={()=>{setexpand(i);navigate('/account/history/expand',{state:det})}}>
               <div> {expand!=i && <p id='historyTitle' >Title : {det.title}</p>}
                    {
                      (()=>{
                        if(expand==i)
                    {
                      
                      return   <Outlet/>
                    }
                      })()
                    }
                    
                    
                    
                  <button className={expand==i?'buttonClicked':'buttonUnClicked'}
                      onClick={() => {
                        erase(det.title);
                      }}
                    >
                      Delete
                    </button>
                   
                    </div>
                    
                  </div>
                );
              });
            }
          })()}
        </div>
        <div id='empty-history' >
        <h4>Nothing to show in history</h4>
      </div>
      </div>
    </div>
  );
}
export default History;
