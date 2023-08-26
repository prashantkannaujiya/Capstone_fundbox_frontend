import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
function Home(){
    const navigate=useNavigate()
    return(
<div>
<div id="site-face">
          <h1>FundBox</h1>
          <p>Crowdfunding can help you raise funds.</p>
          <p>Click to explore ongoing campaigns</p>
          <div><button className="btn btn-outline-light" onClick={()=>{navigate('/explore')}}>Explore</button></div>
         { /*<Link to='explore'><BsFillArrowDownCircleFill id='homeIcon'></BsFillArrowDownCircleFill></Link> */}
        </div>

</div>
    )
}
export default Home;