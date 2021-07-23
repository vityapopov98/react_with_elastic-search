import React, { Component } from 'react'
import '../index.css'
import './JsonView.css'
import './tableView.css'
import { Link} from 'react-router-dom'

class TableView extends Component{

    state = {
        displayError: false
    }

    docArray = []
    highlightKeys = (object, index)=>{

        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                if (typeof(element) == 'object') {
                    this.highlightKeys(element, index)
                }
                else{
                    this.docArray.push(
                        <span key={element+index}>
                            <button className="btn btn-light btn-sm tableView_key" onClick={()=>{ this.addFilter({key: key, value: element})}} >{key}: </button>
                            <span>{element} </span>
                        </span>
                    )
                }
            }
        }   
        return this.docArray
    }
    

    addFilter(filter){
        const searchableFields = ['_index', '_type', '_id', 'postId', 'name', 'email', 'body']

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
        return (props.comments.map((comment, index)=>{
            return (
                <tr key={comment._id}>
                    <th scope="row">{index} 
                        <Link to={{ pathname:`/comments/${comment._id}` , state: comment}}> More</Link>
                    </th>
                    <td>
                        {/* создание подсветки свойств для объекта строки */}
                        { this.highlightKeys(comment, index) }
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

                <table className="table" >
                    <thead>
                        <tr scope="column">
                            <th>Comments Count: {this.props.datasetSize}</th>
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