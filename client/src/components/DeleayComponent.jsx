import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


const DeleayComponent = () => {
    return (
      <div  className="loader">
        <Loader
        type="ThreeDots"
        color="red"
        height={100}
        width={100}
        
      />
      </div>
    )
}

export default DeleayComponent
