import React from 'react'
import '../index.css'
import './JsonView.css'

function JsonView({comments}){
    // console.log('Comments JSON VIEW', comments)

    const jsonCards =  comments.map(element=> {
        return (
            <div className="card" key={element._id.toString()}>
                {console.log(element._id.toString())}
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