import React, { Fragment } from 'react'

const Loader = ({ loadingMsg, styling }) => {
    return (
        <Fragment>
            <div className="loader"></div>
            <p style={{ textAlign: "center", color: "#000000" }}>
                { loadingMsg }
            </p>
        </Fragment>
    )
}

export default Loader
