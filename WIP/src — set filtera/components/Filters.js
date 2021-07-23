import React, { Component } from 'react'

class Filters extends Component{

    // filtersArray = [...this.props.filters]

        // this.props.filters.map((element, index)=>{
        //     console.log('map ', element)
        //     return (
        //     <div className="filter" key={index}>
        //         <button>{element} X</button>
        //     </div>
        //     )
        // })

    makeFilters = (array)=>{
        return array.map((elem, index)=>{
            return (<button key={index} onClick={()=> this.deleteFilter(elem)}>
                    {/* {JSON.stringify(elem)}  */}
                    {elem.key} X
                </button>)
        })
    }

    deleteFilter(filter){
        this.props.deleteFilter(filter)
    }

    render(){
        return (
            <div className="filter-block">
                {this.makeFilters([...this.props.filters])}
            </div>
        )
    }
}

export default Filters
