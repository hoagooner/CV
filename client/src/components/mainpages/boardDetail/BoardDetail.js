// import React, { useContext, useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { GlobalState } from '../../../GlobalState'
// import BoardItem from '../utils/boardItem/boardItem'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import axios from 'axios'


// function BoardDetail() {
//     const params = useParams()
//     const state = useContext(GlobalState)
//     const [boards] = state.boardsAPI.boards
//     const [boardDetail, setBoardDetail] = useState([])
//     const [tasks, setTasks] = useState([])
//     const [callback, setCallback] = useState(false)


//     useEffect(() => {
//         if (params.id) {
//             boards.forEach(board => {
//                 if (board._id === params.id) setBoardDetail(board)
//             })
//         }
//     }, [params.id, boards])

//     const getTasks = async () => {
//         const res = await axios.get(`http://localhost:5000/api/tasks?board_id=${params.id}`)
//         setTasks(res.data.tasks)
//         console.log(tasks)
//     }
//     getTasks()

//     if (boardDetail.length === 0) return null;

//     return (
//         <>
//             <>
//                 <Link id="btn_view" to={`/board/${boardDetail._id}/create-task`}>
//                     <button type="button" className="btn btn-primary" style={{ float: "right" }}>
//                         Add New Task
//                     </button>
//                 </Link>
//             </>

//             <div className="detail">
//                 <div className="box-detail">
//                     <div className="row">
//                         <h2>{boardDetail.title}</h2>
//                     </div>
//                     <p>{boardDetail.description}</p>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default BoardDetail



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from "react-router";


const Task = props => (
    <tr>
        <td>{props.task.title}</td>
        <td>{props.task.description}</td>
        <td>{props.task.duration}</td>
        <td>{props.task.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.task._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
        </td>
    </tr>
)

export default class BoardDetail extends Component {
    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this)

        this.state = {
            tasks: [],
            board_id: this.props.match.params.id
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/tasks?board_id=${this.state.board_id}`)
            .then(response => {
                // console.log(response.data)
                this.setState({ tasks: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTask(id) {
        axios.delete('http://localhost:5000/task/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    taskList() {
        return this.state.tasks.map(task => {
            return <Task task={task} deleteTask={this.deleteTask} key={task._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <>
                    <Link id="btn_view" to={`/board/${this.state.board_id}/create-task`}>
                        <button type="button" className="btn btn-primary" style={{ float: "right" }}>
                            Add New Task
                     </button>
                    </Link>
                </>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.taskList()}
                    </tbody>
                </table>
            </div>
        )
    }
}