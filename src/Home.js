import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
import Contact from "./Contact";
function Home(){
    const navigate=useNavigate()
    return(
<div>
<div id="site-face">
<div ><img id="homePic" src="https://img.freepik.com/free-vector/diverse-crowd-people-different-ages-races_74855-5235.jpg?w=2000"/></div>
          <div><h1>FundBox</h1>
          <p>Crowdfunding can help you raise funds</p>
          <p>Click to explore ongoing campaigns</p>
          <div><button className="btn btn-outline-light" onClick={()=>{navigate('/explore')}}>Explore</button></div>
         </div>
        </div>
        <div className='crowdFunding'>
            <h2>Why should you crowd fund your idea ??</h2>
            <p>
            Capital doesn’t come so easy to entrepreneurs these days. In 2012, the total number of loans and money distributed in the U.S. via the Small Business Administration has dropped as much as 20 percent! Also, nearly 98%of the business plans received by accredited investors and VC’s are rejected. Without a doubt, the current business-funding environment is in need of disruption.
            </p>
            <p>
            One such disruption is the rising industry of crowdfunding, which involves a platform, an individual or entity in need of funding, and a community of people willing to collectively contribute these funds in exchange for rewards and recognition. The amount of money raised by crowdfunding platforms during 2012 is expected to reach $2.8 billion, up 91% since 2011.


            </p>
            <a style={{marginLeft:'2cm'}} target="blank" href='https://www.forbes.com/sites/tanyaprive/2012/10/12/top-10-benefits-of-crowdfunding-2/?sh=54d940e62c5e'>
                Read the full article on Forbes...
            </a>
        </div>
<div className="crowdFunding">
<h2>Still confused ? Let us help you.</h2>
<div><Contact></Contact></div>
</div>
</div>
    )
}
export default Home;