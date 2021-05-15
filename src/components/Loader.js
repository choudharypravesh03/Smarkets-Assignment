import React from 'react'
import LoadingIcon from '../assets/images/loading.svg'

const Loader = () => {
    return(
        <div className="text-center">
            <img className="loading-icon" src={LoadingIcon} />
        </div>
    )
}

export default Loader;