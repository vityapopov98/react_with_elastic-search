import React, { Component } from 'react'
import '../index.css'
import './JsonView.css'
import './tableView.css'
import {Route, BrowserRouter as Router, useParams, Link} from 'react-router-dom'

class TableView extends Component{

    // state = {
    //     comments: []
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('Should Component update next prop', nextProps)
    //     console.log('Should Component update prop', this.props)
    //     console.log('Should Component update next state', nextState)
    //     console.log('Should Component update state', this.state)
    //     // return false
    //     if (nextProps.comments != this.props) {
    //        this.tableRows = this.makeTableRows(nextProps)
    //        return true
    //     }
    //     else{ return false}
        
    // }

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
                            <button className="btn btn-light btn-sm tableView_key" onClick={()=>{console.log('[[[[[[',index); this.addFilter({key: key, value: element})}} >{key}: </button>
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

    // tableRows = this.makeTableRows(this.props.comments)
    
    tableRows = this.props.comments.map((element, index)=>{
        console.log(this.props.comments)
        return (
            <tr key={element._id}>
                <th scope="row">{index} 
                    <Link to={{ pathname:`/comments/${element._id}` , state: element}}> More</Link>
                </th>
                <td>
                    {/* здание подсветки для объекта строки */}
                    { this.highlightKeys(element, index) }
                    {/* очищение вспомогательной переменной для обработки следующего объекта */}
                    { this.docArray.splice(0, this.docArray.length) }
                </td>
            </tr>
        )
    })


    // makeTableRows = (comments)=>{
    //     return comments.map((element, index)=>{
    //         console.log(comments)
    //         return (
    //             <tr key={element._id}>
    //                 <th scope="row">{index} 
    //                     <Link to={{ pathname:`/comments/${element._id}` , state: element}}> More</Link>
    //                 </th>
    //                 <td>
    //                     {/* здание подсветки для объекта строки */}
    //                     { this.highlightKeys(element, index) }
    //                     {/* очищение вспомогательной переменной для обработки следующего объекта */}
    //                     { this.docArray.splice(0, this.docArray.length) }
    //                 </td>
    //             </tr>
    //         )
    //     })
    // }

    addFilter(filter){
        console.log('filter to add', filter)
        this.props.addFilter(filter)
        
    }

    displayProps = (props)=>{
        // return (<div><button>{JSON.stringify(props)}</button></div>)
        return (props.comments.map((element, index)=>{
            console.log(props.comments)
            return (
                <tr key={element._id}>
                    <th scope="row">{index} 
                        <Link to={{ pathname:`/comments/${element._id}` , state: element}}> More</Link>
                    </th>
                    <td>
                        {/* здание подсветки для объекта строки */}
                        { this.highlightKeys(element, index) }
                        {/* очищение вспомогательной переменной для обработки следующего объекта */}
                        { this.docArray.splice(0, this.docArray.length) }
                    </td>
                </tr>
            )
        }))
    }

    render(){
        return ( 
            // <div className="container">
            //     {this.tableCards}
            // </div>
            <div className="container">

                <table className="table">
                    <thead>
                        <tr scope="column">
                            <th>Comments Count: {this.props.datasetSize}
                            {console.log(this.props)}
                            </th>
                        </tr>
                    </thead>
                    <tbody key={this.props}>
                        {/* {this.tableRows} */}
                        {this.displayProps(this.props)}
                    
                    </tbody>
                </table>
            </div>
            
        )
    }
}




export default TableView