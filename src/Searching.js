import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Searching()
{
    const location=useLocation();
  const navigate=useNavigate();
  console.log(navigate);   
    var data=location.state;
    var [display,setdisplay]=useState(false)
    console.log(data)
    
    var [searchData,setsearchData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:2100/search/"+data)
        .then(res=>res.json())
        .then((data)=>{
console.log(data)
            setsearchData(data);
if(data.length!=0)
{
    setTimeout(()=>{setdisplay(true)},2000)
    setTimeout(()=>{setdisplay(false)},6500);
}
        })
        .catch(err=>{console.log(err);alert(err)})
    },[data,location])

    return(
        <div id='searching'>
        {display && <p id='tip'><i className="bi bi-lightbulb-fill"></i> Click title to expand campaign details</p>}
        {searchData.length!=0 ?
        <table>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
            
                { searchData.map((a)=>{
                        return <tr>
                            <td onClick={()=>{navigate('/expand',{state:a.campaign})}}>{a.campaign.title}</td>
                            <td style={{width:'10cm'}}>{a.campaign.description}</td>
                          <td>{a.campaign.amount}</td>
                            <td><img id='searchImage' src={a.campaign.pic} alt='campaignPic'/></td>
                        </tr>

                    })
                }
            
        </table>:<h3>Nothing matched your query</h3>}
        </div>
    )
}
export default Searching;