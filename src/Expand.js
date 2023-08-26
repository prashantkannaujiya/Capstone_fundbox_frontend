import React from "react";
import { useLocation } from "react-router-dom";

function Expand()
{
    var location=useLocation()
    var det=location.state;
    return(
<div id={location.pathname!='/expand'?'expand':'expandExplore'}>

<p>
<img src={det.pic} />
</p>
<div id='expandDetail'>{console.log(det)}
<p>Title : {det.title}</p>
<p>Category : {det.category}</p>

<p>Target amount : {det.amount}</p>
<p>Description : {det.description}</p>

</div>

</div>
    )
}
export default Expand;