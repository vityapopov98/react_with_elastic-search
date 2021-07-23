import React, { Component } from 'react'
import dataset from '../datasetlong.json'

// export default function About (){
//     return (
//         <h1>About page</h1>
//     )
// }

class About extends Component{
    
    render(){
        return (
           <div className="container">
                <h1>Add Data to Elastic</h1>

            <button onClick={this.sendData}>Send Data</button>
           </div>
        )
    }

    sendData = ()=>{

        console.log('sending', JSON.stringify({data: dataset}))
        fetch('/saveToElastic',{
            method: 'POST',
            headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: dataset})
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.error(err);
        })  
    }
}

export default About