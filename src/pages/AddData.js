import React, { Component } from 'react'
import dataset from '../datasetlong.json'

class AddData extends Component{
    
    sendData = ()=>{
        dataset.forEach(element => {
            fetch('/saveToElastic',{
                method: 'POST',
                headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                },
                body: JSON.stringify({data: element})
            }).then(res=>{
                return res.json()
            }).then(data=>{
                console.log(data)
            }).catch(err=>{
                console.error(err);
            })  
        });
        
    }

    render(){
        return (
           <div className="container">
                <h1>Add Data to Elastic</h1>

            <button onClick={this.sendData}>Send Data</button>
           </div>
        )
    }
}

export default AddData