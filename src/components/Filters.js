import React, { Component } from 'react'

class Filters extends Component{

    makeFilters = (array)=>{
        return array.map((elem, index)=>{
            return (<button className="btn btn-primary btn-sm mx-1" key={index} onClick={()=> this.deleteFilter(elem)}>
                    {elem[0]}: {elem[1].value} X
                </button>)
        })
    }

    deleteFilter(filter){
        this.props.deleteFilter(filter)
      
    }

    render(){
        return (
            <div className="filter-block container">
                {this.makeFilters([...this.props.filters])}
            </div>
        )
    }
}

export default Filters
