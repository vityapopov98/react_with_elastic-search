import React, { Component } from 'react'

class Dropdown extends Component {
    state={
        isOpen: false
    }

    toggleDroplist = ()=>{
        this.setState(prevState=>{
            return{
                ...prevState,
                isOpen: !prevState.isOpen
            }
        })
    }

    changeDocumentPerPage(count){
        this.props.changeDocumentPerPage(count)
    }

    render(){
        return(
            <div className="dropdown mt-5 pt-5">
            <button className={(this.state.isOpen) ? 'btn btn-secondary dropdown-toggle show' : 'btn btn-secondary dropdown-toggle' } 
                    onClick={this.toggleDroplist}>
                Отображать на странице
            </button>
                <ul 
                    className={(this.state.isOpen) ? 'dropdown-menu show' : 'dropdown-menu' }>
                    <li><button className="dropdown-item" onClick={()=> {this.toggleDroplist(); this.changeDocumentPerPage(2)}}>2 документа</button></li>
                    <li><button className="dropdown-item" onClick={()=> {this.toggleDroplist(); this.changeDocumentPerPage(5)}}>5 документов</button></li>
                    <li><button className="dropdown-item" onClick={()=> {this.toggleDroplist(); this.changeDocumentPerPage(10)}}>10 документов</button></li>
                </ul>
            </div>
        )
    }
}
export default Dropdown