import React from 'react'
import '../index.css'
import './JsonView.css'

function JsonView({comments}){

    const jsonCards =  comments.map(element=> {
        return (
            <div className="card" key={element._id.toString()}>
                <pre> {JSON.stringify(element, null, '\t')} </pre>
            </div>
        )
    })

    return (
        
        <div className="container">
            {jsonCards}
        </div>
    )
}


export default JsonView