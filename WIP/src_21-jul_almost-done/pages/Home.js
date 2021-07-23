import React, { Component } from 'react'
import '../App.css';
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css'
import JsonView from '../components/JsonView'; 
import TableView from '../components/TableView';
import Filters from '../components/Filters';
import PageButtons from '../components/PageButtons';

class Home extends Component {

  state = {
    dataset: [],
    datasetSize: 0,
    fDatasef: [],
    filters: new Map(),
    displayMode: 'JSON'
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
      // console.log('prev state', prevState)
      prevState.filters.forEach(element=>{
        // console.log('element', element)
        filters.set(element.key, {key: element.key, value: element.value})
      })
      filters.set(filter.key, filter)
      // console.log('setting state filters ', filter)
      return {
        ...prevState,
        filters: filters
      }
    },
    //  ()= >{
      this.filterDataset()
    // }
    )
  }

  onFilterDeleted(filter){
    this.filters.delete(filter[0])
    // this.filterDataset()

    // 👇🏻 какой-то костыль. Без него кнопки с примененными фильрами не отображаются
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
    // ()=>{
      this.filterDataset()
    // }
    )
  }

  filterDataset = ()=>{
    console.log(this.state.dataset)
    console.log(this.filters)
    this.state.fDatasef = [...this.dataset].filter(doc=> this.isDocMatchFilter(doc))
    this.fDataset = [...this.dataset].filter(doc=> this.isDocMatchFilter(doc))
    console.log('fD in state', this.state.fDatasef)
    console.log('fD', this.fDataset)
  }


  isDocMatchFilter = (doc) =>{
    // console.log('this is doc', doc)
    // console.log('this is filters', this.filters)
    // console.log('this is filters from state', this.state.filters)
    // return true
    let isMatch = false
    const filters = this.filters
    // const filters = this.state.filters
    if (filters.size != 0) { //если фильтры есть
      // console.log('filters exist', this.filters)
      
      filters.forEach(element => { // смотрим на каждый фильтр
        console.log(element)
        if (element.key.substring(0,1) == '_') {
          // console.log('begins with _', element.key)
          if (element.value == doc[element.key]) // если значение фильтра совпадает со значением в документе по заданому ключу, то этот док подходит
            isMatch = true
        }
        else{
          // console.log('from _source', element.key)
          // console.log('match', element.value, doc._source[element.key])
          if (element.value == doc._source[element.key]){
            console.log('returning true')
              isMatch = true
          } 
        }
      });
    }
    else {
      // console.log('filters undef')
      isMatch =  true
    }
    return isMatch
  }
  
  addData = ()=>{
    const obj = {
      _index: "comments",
      _type: "_doc",
      _id: "iE6Dn3oBBITq55685665878567DnwAatib",
      _score: 1,
      _source: {
        postId: 3,
        id: 512,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      }
    }
    this.fDataset = [...this.fDataset, obj]
  }

//   pagesButton = ()=>{
//       const pagesButtonElements = []
//       console.log('this.state.datasetSize', this.state.datasetSize)
//         for (let index = 0; index < this.state.datasetSize; index++) {
//             console.log('pages buttons', pagesButtonElements)
//             pagesButtonElements.push(<button className="btn btn-outline-primary" onClick={()=>{getData(index*5)}}>{index}</button>)
//         }
//         console.log('pages buttons', pagesButtonElements)
//         return pagesButtonElements
//   }

  onPageButtonClicked(page){
      if (page == undefined) {
          page = 0
      }
      getData(page).then(data=>{
        console.log('page data', data)
        console.log(data.hits.total.value)
        this.state.datasetSize = data.hits.total.value
        console.log(this.filters)
        this.dataset = data.hits.hits
        this.filterDataset()
        this.setState({ dataset: data.hits.hits })
      })

  }    

  render(){
    return (
      <div >
          {/* className="container" */}
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

      <Filters  key={this.filters} filters={this.filters} deleteFilter={this.onFilterDeleted.bind(this)}/>
      {/* <button onClick={this.addData}>Add</button> */}
      {
        (this.state.displayMode == 'JSON') ?
          <JsonView key={this.fDataset} comments={this.fDataset} />
        : <TableView  key={this.fDataset} comments={this.fDataset} datasetSize={this.state.datasetSize} addFilter={this.onFilterAdded.bind(this)} />
      }

      {/* <div key={this.datasetSize}>
        {this.pagesButton()}
      </div> */}

      <PageButtons datasetSize={this.state.datasetSize} pageButtonClicked={this.onPageButtonClicked.bind(this)}/>
      </div>
    );
  }

  
  
  componentDidMount(){
    getData(0).then(data=>{
      console.log('load page 0',data)
      console.log(data.hits.total.value)
      this.state.datasetSize = data.hits.total.value
      console.log(this.state.datasetSize)
      console.log(this.filters)
      this.dataset = data.hits.hits
      this.filterDataset()
      this.setState({ dataset: data.hits.hits })
    })
  }
  
}

async function getData(page){
    return new Promise((resolve, reject)=>{
        // fetch('/comments').then(res=>{
        //     return res.json()
        // }).then(data=>{
        //     resolve(data)
        // }).catch(err=>{
        //     reject(err)
        // })
        fetch(`/comments?page=${page}`).then(res=>{
            return res.json()
        }).then(data=>{
            resolve(data)
        }).catch(err=>{
            reject(err)
        })
    })
}

export default Home;