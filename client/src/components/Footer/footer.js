import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Footer() {
    return (
        <div>
            <div className="push" />
            <div className="pageFooter">
                <span className="text-white">Copyright &#169; 2020 POZ DRAFTING &#38; IT SOLUTIONS - All Rights Reserved</span>
                <br />
                <span className="text-white">dhani@pozitsolutions.com.au </span>
                <span className="text-white">| 0412 966 933</span>
                <br />
                <span className="text-white">ROSE BAY, NSW</span>
            </div>
        </div>
    );
}

export default Footer;
