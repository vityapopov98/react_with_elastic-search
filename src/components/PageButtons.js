import React, { Component } from 'react'
import '../App.css'

class PageButtons extends Component{

    pagesButton = (props)=>{
        const pagesButtonElements = []
        // console.log('this.state.datasetSize', this.props.datasetSize)
          for (let index = 0; index < props.datasetSize/props.documentPerPage; index++) {
            //   console.log('pages buttons', pagesButtonElements)
            const buttonClassName = "btn btn-outline-primary mx-1"
              pagesButtonElements.push(
                <button key={props.documentPerPage} 
                        className={(props.selectedPage == index) ? `${buttonClassName} active` : buttonClassName}
                        onClick={()=>{this.pageButtonClicked(index*props.documentPerPage)}} 
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
            <div className="container button-container" key={this.props}>
                {this.pagesButton(this.props)}
            </div>
        )
    }
}

export default PageButtons