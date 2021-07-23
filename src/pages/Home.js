import React, { Component } from 'react'
import '../App.css';
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css'
import JsonView from '../components/JsonView'; 
import TableView from '../components/TableView';
import Filters from '../components/Filters';
import PageButtons from '../components/PageButtons';
import Dropdown from '../components/Dropdown';

class Home extends Component {

  state = {
    dataset: [],
    datasetSize: 0,
    fDataset: [],
    filters: new Map(),
    displayMode: 'JSON',
    selectedPage: 0,
    error: '',
    documentsPerPage: 5
  }

  dataset = []
  filters = new Map()
  fDataset = []

  setJsonDisplayMode = ()=>{
    this.setState({displayMode: 'JSON'})
  }

  setTableDisplayMode = ()=>{
    this.setState({displayMode: 'Table'})
  }

  onFilterAdded(filter){
    console.log('on filter added', filter)
    
    this.filters = this.filters.set(filter.key, filter)
    // this.filterDataset()

    // 👇🏻 какой-то костыль. Без него кнопки с примененными фильрами не отображаются
    this.setState(prevState=>{
      let filters = new Map()
    // --- 👇🏻 это закоментировано, чтобы можно было добавить только ОДИН фильтр
    //   prevState.filters.forEach(element=>{
    //     // console.log('element', element)
    //     filters.set(element.key, {key: element.key, value: element.value})
    //   })
      filters.set(filter.key, filter)
      // console.log('setting state filters ', filter)
      return {
        ...prevState,
        filters: filters
      }
    },
     ()=>{
        this.filterDataset()
     }
    )
  }

  onFilterDeleted(filter){
    this.filters.delete(filter[0])

    this.setState(prevState=>{
      const updatedSet = prevState.filters
      console.log('deleting', prevState.filters)
      console.log('del item', filter[0])
      updatedSet.delete(filter[0])
      console.log('new set', updatedSet)

      return {
        ...prevState,
        filters: updatedSet
      }
    },
    ()=>{
        getData(this.state.selectedPage, this.state.documentsPerPage).then(response=>{
            this.gotDataHandle(response.data, response.page*this.state.documentsPerPage)
        })
    }
    )
  }

  filterDataset = ()=>{
    this.state.filters.forEach(element=>{
        console.log(`/filterComments?${element.key}=${element.value}`)
        fetch(`/filterComments?${element.key}=${element.value}`).then(res=>{
            return res.json()
        }).then(data=>{
            console.log('filterred from elastic', data)
            this.setState({fDataset: data.hits.hits})
        })
    })
  }

  onPageButtonClicked(page){
      getData(page, this.state.documentsPerPage).then(response=>{
        this.gotDataHandle(response.data, response.page)
      })
  }    

  onDocumentPerPageChanged(count){
    this.setState({documentsPerPage: count},()=>{
        getData(0, this.state.documentsPerPage).then(response=>{
            this.gotDataHandle(response.data, response.page)
        })
    })
  }

  render(){
    return (
      <div >
          <div className="row">
            <div className="col-md-12">
                <div className="toggle-block">
                    <div className="btn-group">
                        <button className="btn btn-primary" className={this.state.displayMode=='JSON'? 'btn btn-primary active': 'btn btn-primary'} onClick={this.setJsonDisplayMode}>JSON</button>
                        <button className="btn btn-primary" className={this.state.displayMode=='Table'? 'btn btn-primary active': 'btn btn-primary'} onClick={this.setTableDisplayMode}>Table</button>
                    </div>
                </div>
            </div>
          </div>
          
          <div className="container">
            <Dropdown count={this.state.documentsPerPage} changeDocumentPerPage={this.onDocumentPerPageChanged.bind(this)} />
          </div>

      <Filters  key={this.state.filters} filters={this.state.filters} deleteFilter={this.onFilterDeleted.bind(this)}/>
      {
        (this.state.error === '') ?
        (this.state.displayMode === 'JSON') ?
          <JsonView key={this.state.fDataset} comments={this.state.fDataset} />
        : <TableView key={this.state.fDataset}  comments={this.state.fDataset} datasetSize={this.state.datasetSize} addFilter={this.onFilterAdded.bind(this)} />
           
        : <p>{this.state.error}</p>
        
      }

      <PageButtons datasetSize={this.state.datasetSize} selectedPage={this.state.selectedPage} 
                    documentPerPage={this.state.documentsPerPage} pageButtonClicked={this.onPageButtonClicked.bind(this)}/>
      </div>
    );
  }

  
  
  componentDidMount(){
      console.log('HOME props', this.props)

    getData(0, 5).then(response=>{
        console.log(response)
        console.log(response.data)
      this.gotDataHandle(response.data, response.page)
    })
  }
  
    gotDataHandle = (data, page) =>{
        // console.log('load page 0', data)
        // console.log(data.hits.total.value)
        if (data.hits != undefined) {
            this.state.datasetSize = data.hits.total.value
            this.setState({datasetSize: data.hits.total.value})
            // console.log(this.state.datasetSize)
            // console.log(this.filters)
            this.dataset = data.hits.hits
      
            this.setState({fDataset: data.hits.hits, selectedPage: page/this.state.documentsPerPage, error: ''}, ()=>{ 
                console.log('new state is saved', this.state)
                this.filterDataset() 
            })
        }
        else {
            this.setState({error: 'Извините, произошла ошибка! Перезагрузите страницу.'})
        }
    }
}

async function getData(page, documentPerPage){
    return new Promise((resolve, reject)=>{
        fetch(`/comments?page=${page}&documentPerPage=${documentPerPage}`).then(res=>{
            return res.json()
        }).then(data=>{
            resolve({data: data, page: page})
        }).catch(err=>{
            reject({err: err, page:page})
        })
    })
}

export default Home;