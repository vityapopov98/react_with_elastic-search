import React, { Component } from 'react'
import './App.css';
import './index.css'
import JsonView from './components/JsonView'; 
import TableView from './components/TableView';
import Filters from './components/Filters';

class App extends Component {

  state = {
    dataset: [],
    fDatasef: [],
    filters: new Map(),
    // filters: [],
    displayMode: 'JSON'
  }
  dataset = []
  filters = new Map()

  setJsonDisplayMode = ()=>{
    this.setState({displayMode: 'JSON'})
  }

  setTableDisplayMode = ()=>{
    this.setState({displayMode: 'Table'})
  }

  onFilterAdded(filter){
    console.log('on filter added', filter)
    // console.log(this.state.filters)
    // this.filters = this.filters.add(filter)
    if (this.filters.has(filter)) {
      console.log('ЕСТЬ')
    }
    this.filters = new Map([...this.filters, filter])    
    // this.filterDataset()
    this.setState(prevState=>{
      return {
        ...prevState,
        filters: new Map([...prevState.filters, filter])
        // filters: [...prevState.filters, filter]
      }
    }, this.filterDataset())
  }

  onFilterDeleted(filter){
    this.filters.delete(filter)
    // this.filterDataset()
    this.setState(prevState=>{
      const updatedSet = prevState.filters
      updatedSet.delete(filter)

      return {
        ...prevState,
        filters: updatedSet
      }
    }, this.filterDataset())
  }

  filterDataset = ()=>{
    console.log(this.state.dataset)
    console.log(this.filters)
    this.state.fDatasef = [...this.dataset].filter(doc=> this.isDocMatchFilter(doc))
    console.log('fD', this.state.fDatasef)
  }


  isDocMatchFilter = (doc) =>{
    console.log('this is doc', doc)
    console.log('this is filters', this.filters)
    // return true
    let isMatch = false
    if (this.filters.size != 0) { //если фильтры есть
      console.log('filters exist', this.filters)
      
      this.filters.forEach(element => { // смотрим на каждый фильтр
        console.log(element)
        if (element.key.substring(0,1) == '_') {
          console.log('begins with _', element.key)
          if (element.value == doc[element.key]) // если значение фильтра совпадает со значением в документе по заданому ключу, то этот док подходит
            isMatch = true
        }
        else{
          console.log('from _source', element.key)
          console.log('match', element.value, doc._source[element.key])
          if (element.value == doc._source[element.key]){
            console.log('returning true')
              isMatch = true
          } 
        }
      });
    }
    else {
      console.log('filters undef')
      isMatch =  true
    }
    return isMatch
  }
  

  render(){
    return (
      <div className="">
      <div className="form_toggle containers">
        
        <button onClick={this.setJsonDisplayMode}>JSON</button>
        <button onClick={this.setTableDisplayMode}>Table</button>

      </div>

      <Filters  filters={this.state.filters} deleteFilter={this.onFilterDeleted.bind(this)}/>
      
      {
        (this.state.displayMode == 'JSON') ?
          <JsonView comments={this.state.fDatasef} />
        : <TableView comments={this.state.fDatasef} addFilter={this.onFilterAdded.bind(this)} />
      }
      </div>
    );
  }

  
  
  componentDidMount(){
    getData().then(data=>{
      console.log(data.hits.hits[0])
      console.log(this.filters)
      this.dataset = data.hits.hits
      this.filterDataset()
      this.setState({ dataset: data.hits.hits })
    })
  }
  
}

async function getData(){
  return new Promise((resolve, reject)=>{
    fetch('/comments').then(res=>{
      return res.json()
    }).then(data=>{
      resolve(data)
    }).catch(err=>{
      reject(err)
    })
  })
}

export default App;
