import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from "react-router";


const Task = props => (
    <tr>
        <td class="text-center">{props.task.title}</td>
        <td class="text-center">{props.task.description}</td>
        <td class="text-center">{props.task.duration}</td>
        <td class="text-center">{props.task.date.substring(0, 10)}</td>
        <td class="text-center" >
            <select class="form-control">
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
        </td>
        <td class="text-center" >
            <Link className="btn btn-warning" style={{ marginRight: "10px" }}
                to={`/board/${props.task.board_id}/edit-task/${props.task._id}`}>
                Edit
            </Link>
            <Link className="btn btn-danger"
                onClick={() => { props.deleteTask(props.task._id) }}>
                Delete
            </Link>
        </td >
    </tr >
)

export default class BoardDetail extends Component {
    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this)

        this.state = {
            tasks: [],
            board: '',
            board_id: this.props.match.params.id
        };
    }

    componentDidMount() {
        console.log(this.state.board_id)
        axios.get(`http://localhost:5000/api/tasks?board_id=${this.state.board_id}`)
            .then(response => {
                // console.log(response.data)
                this.setState({ tasks: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5000/api/board/${this.state.board_id}`)
            .then(response => {
                // console.log(response.data)
                this.setState({ board: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTask(id) {
        console.log(id)
        axios.delete('http://localhost:5000/api/task/' + id)
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
            <div className="container">
                <h3 style={{ marginTop: "50px" }}>Board: {this.state.board.title}</h3>
                <h4>Tasks: {this.state.tasks.length}</h4>

                <>
                    <Link id="btn_view" to={`/board/${this.state.board_id}/create-task`}>
                        <button type="button"
                            className="btn btn-primary"
                            style={{ float: "right", marginBottom: "30px" }}>
                            Add New Task
                        </button>
                    </Link>
                </>
                <table className="table table-light">
                    <thead className="thead-dark">
                        <tr>
                            <th class="text-center">Title</th>
                            <th class="text-center">Description</th>
                            <th class="text-center">Duration</th>
                            <th class="text-center">Date</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Actions</th>
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