import React, { Component } from 'react'
import '../App.css'

class PageButtons extends Component{
    commentsPerPage = 2

    pagesButton = ()=>{
        const pagesButtonElements = []
        // console.log('this.state.datasetSize', this.props.datasetSize)
          for (let index = 0; index < this.props.datasetSize/this.commentsPerPage; index++) {
            //   console.log('pages buttons', pagesButtonElements)
            const buttonClassName = "btn btn-outline-primary mx-1"
              pagesButtonElements.push(
                <button 
                        className={(this.props.selectedPage == index) ? `${buttonClassName} active` : buttonClassName}
                        onClick={()=>{this.pageButtonClicked(index*this.commentsPerPage)}} 
                        key={index}>
                            
                            {index+1}
                </button>
              )
          }
        //   console.log('pages buttons', pagesButtonElements)
          return pagesButtonElements
    }

    pageButtonClicked(page){
        this.props.pageButtonClicked(page)
    }    

    render(){
        return (
            <div className="container button-container">
                {this.pagesButton()}
            </div>
        )
    }
}

export default PageButtons