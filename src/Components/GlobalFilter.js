import React from "react";

const GlobalFilter = ({filter, setFilter}) => {
    return(
        <>
        <span>
                {/* Search:{""} */}
                <input className="input" placeholder="Search" type="text" value={filter || ""} onChange={(e) => setFilter(e.target.value)}/>
        </span>
        </>
    )
}

export default GlobalFilter