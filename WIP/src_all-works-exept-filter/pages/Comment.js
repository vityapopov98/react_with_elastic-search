import React, { Component, useState } from 'react'
import {Route, BrowserRouter as Router, useParams, Link, useLocation} from 'react-router-dom'

export default function Comment (props){

//  const {commentId} = useParams()
//  const params = useParams()

 const location = useLocation()
 const comment = location.state
//  const [comment, setComment] = useState(null)
 
    return (
        // <p>Hello Comment 
            
        //         {JSON.stringify(location.state)}
            
        // </p>
        <div className="container">
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                            <td>_id</td>
                            <td>{comment._id}</td>
                        </tr>
                        <tr>
                            <td>_index</td>
                            <td>{comment._index}</td>
                        </tr>
                        <tr>
                            <td>_score</td>
                            <td>{comment._score}</td>
                        </tr>
                        <tr>
                            <td>_type</td>
                            <td>{comment._type}</td>
                        </tr>
                        <tr>
                            <td>body</td>
                            <td>{comment._source.body}</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{comment._source.email}</td>
                        </tr>
                        <tr>
                            <td>id</td>
                            <td>{comment._source.id}</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>{comment._source.name}</td>
                        </tr>
                        <tr>
                            <td>postId</td>
                            <td>{comment._source.postId}</td>
                        </tr>
                    </tbody>
                
                </table>
            </div>
        </div>
    )
}

// class Comment extends Component {
//     state = {
//         comment: null
//     }

//     componentDidMount(){
//         // const { handle } = this.props.match.params

//         console.log('props: ', this.props)
//         // console.log('props: ', location)
//     }

//     render(){
//         return (
//             <p>Hello Comment 

//                 {console.log('Render Comment', this.props)}
                
//                     <p>
//                         {JSON.stringify(this.props)}
//                     </p>
                
//             </p>
//         )
//     }
// }

// export default Comment;