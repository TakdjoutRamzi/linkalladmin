import React from 'react'

const centerH2 = {
    textAlign: 'center',
    marginTop: '50px'
}

const ErrorPage = () => {
    return (
        <div className="quiz-bg">
            <div className="container">
                <h2 style={centerH2}>Oups, cette page n'existe pas!</h2>
            </div>
        </div>
    )
}

export default ErrorPage
