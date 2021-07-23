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
        console.log(array)
        return array.map((elem, index)=>{
            return (<button className="btn btn-primary btn-sm mx-1" key={index} onClick={()=> this.deleteFilter(elem)}>
                    {/* {JSON.stringify(elem)}  */}
                    {console.log(elem)}
                    {elem[0]} X
                </button>)
        })
    }

    deleteFilter(filter){
        this.props.deleteFilter(filter)
    }

    render(){
        return (
            <div className="filter-block container">
                {console.log([...this.props.filters])}
                {this.makeFilters([...this.props.filters])}
            </div>
        )
    }
}

export default Filters
