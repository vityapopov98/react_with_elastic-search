import React, { Component } from 'react'
import '../index.css'
import './JsonView.css'
import './tableView.css'

class TableView extends Component{

    tableCards = this.props.comments.map(element=> {
        return (
            <div className="card" key={element._source.id.toString()}>
                <table>
                    <tbody>
                    <tr>
                    <td></td>
                    <td>_id</td>
                    <td>{element._id}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>_index</td>
                    <td>{element._index}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>_score</td>
                    <td>{element._score}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>_type</td>
                    <td>{element._type}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>body</td>
                    <td>{element._source.body}</td>
                </tr>
                <tr>
                    <td>
                        <button onClick={()=> this.addFilter('email')}>+add</button>
                    </td>
                    <td>email</td>
                    <td>{element._source.email}</td>
                </tr>
                <tr>
                    <td><button onClick={()=> this.addFilter('id')}>+add</button></td>
                    <td>id</td>
                    <td>{element._source.id}</td>
                </tr>
                <tr>
                    <td><button onClick={()=> this.addFilter('name')}>+add</button></td>
                    <td>name</td>
                    <td>{element._source.name}</td>
                </tr>
                <tr>
                    <td><button onClick={()=> this.addFilter('postId')}>+add</button></td>
                    <td>postId</td>
                    <td>{element._source.postId}</td>
                </tr>
                    </tbody>
                
                </table>
            </div>
            
        )
    })

    docArray = []
    highlightKeys = (object, index)=>{
        if (index ) {
            
        }
        // console.log('obj to highlight', object, index)
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                // console.log('highlight', element)
                if (typeof(element) == 'object') {
                    // console.log('this is obj', element)
                    this.highlightKeys(element, index)
                }
                else{
                    this.docArray.push(
                        <span>
                            <button className="tableView_key" onClick={()=>{console.log('[[[[[[',index); this.addFilter({key: key, value: element})}} >{key}: </button>
                            <span>{element} </span>
                        </span>
                    )
                }
            }
        }   
        return this.docArray
    }

    // makehighlightKeys = (object)=>{
    //     const documentContentArray = []
    //     for (const key in object) {
    //         if (Object.hasOwnProperty.call(object, key)) {
    //             const element = object[key];
    //             if (typeof(element) == 'object') {
    //                 console.log('this is obj', element)
    //                 for (const key in element) {
    //                     if (Object.hasOwnProperty.call(element, key)) {
    //                         const subElement = element[key];
    //                         documentContentArray.push(
    //                             <span>
    //                                 <span className="tableView_key">{key}: </span>
    //                                 <span>{subElement} </span>
    //                             </span>
    //                         )
    //                     }
    //                 }
    //             }
    //             else{
    //                 documentContentArray.push(
    //                     <span>
    //                         <span className="tableView_key">{key}: </span>
    //                         <span>{element} </span>
    //                     </span>
    //                 )
    //             }
    //         }
    //     }   
    //     return documentContentArray 
    // }

    tableRows = this.props.comments.map((element, index)=>{
        return (
            <tr key={element._id}>
                <td>{index}</td>
                <td>
                    { this.highlightKeys(element, index) }
                    { this.docArray.splice(0, this.docArray.length) }
                </td>
            </tr>
        )
    })

    addFilter(filter){
        console.log('filter to add', filter)
        this.props.addFilter(filter)
    }

    render(){
        return ( 
            // <div className="container">
            //     {this.tableCards}
            // </div>
            <div className="container">
                <table>
                    <tbody>
                        {this.tableRows}
                    </tbody>
                </table>
            </div>
            
        )
    }
}




export default TableView