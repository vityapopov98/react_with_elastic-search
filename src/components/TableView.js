import React, { Component } from 'react'
import '../index.css'
import './JsonView.css'
import './tableView.css'
import {Route, BrowserRouter as Router, useParams, Link} from 'react-router-dom'

class TableView extends Component{

    state = {
        displayError: false
    }

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

    addFilter(filter){
        const searchableFields = ['_index', '_type', '_id', 'postId', 'name', 'email', 'body']
        console.log('filter to add', filter)
        if (searchableFields.includes(filter.key)) {
            this.props.addFilter(filter)
        }
        else{
            this.setState({displayError: true},()=>{
                setTimeout(() => {
                    this.setState({displayError: false})
                }, 2000);
            })
        }
    }

    displayProps = (props)=>{
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
            <div className="container">

                {(this.state.displayError) ? <div className="alert alert-danger" role="alert">
                Поиск по этому фильтру недоступен !
                </div> : ''}

                <table className="table">
                    <thead>
                        <tr scope="column">
                            <th>Comments Count: {this.props.datasetSize}
                            {console.log(this.props)}
                            </th>
                        </tr>
                    </thead>
                    <tbody key={this.props}>
                        {this.displayProps(this.props)}
                    </tbody>
                </table>
            </div>
            
        )
    }
}




export default TableView