import React, { Component } from 'react'

class PageButtons extends Component{

    pagesButton = ()=>{
        const pagesButtonElements = []
        // console.log('this.state.datasetSize', this.props.datasetSize)
          for (let index = 0; index < this.props.datasetSize/2; index++) {
            //   console.log('pages buttons', pagesButtonElements)
              pagesButtonElements.push(<button className="btn btn-outline-primary mx-1" onClick={()=>{this.pageButtonClicked(index*2)}} key={index}>{index+1}</button>)
          }
        //   console.log('pages buttons', pagesButtonElements)
          return pagesButtonElements
    }

    pageButtonClicked(page){
        this.props.pageButtonClicked(page)
    }    

    render(){
        return (
            <div className="container d-flex justify-content-center mb-5">
                {this.pagesButton()}
            </div>
        )
    }
}

export default PageButtons