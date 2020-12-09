import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router";


export default class CreateTask extends Component {


    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            board_id: this.props.match.params.board_id,
            task_id: this.props.match.params.task_id,
            username: '',
            title: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
            onEdit: false
        }
    }

    componentDidMount() {

        console.log(this.props.match.params.task_id)
        if (this.props.match.params.task_id) {
            axios.get('http://localhost:5000/api/task/' + this.props.match.params.task_id)
                .then(response => {
                    this.setState({
                        username: response.data.username,
                        title: response.data.title,
                        description: response.data.description,
                        duration: response.data.duration,
                        date: new Date(response.data.date)
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }



    onSubmit(e) {
        e.preventDefault();

        const task = {
            board_id: this.state.board_id,
            task_id: this.state.task_id,
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(task);

        if (this.state.task_id) {
            axios.put('http://localhost:5000/api/task/' + this.state.task_id, task)
                .then(res => console.log(res.data));
        } else {
            axios.post('http://localhost:5000/api/tasks', task)
                .then(res => console.log(res.data));
        }


        window.location = `/board/${this.state.board_id}`;
    }

    render() {
        return (
            <div>
                <h3 style={{ marginTop: "50px", marginBottom: "50px" }}>Create New Task</h3>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <input type="hidden" value={this.state.board_id} />
                        <input type="hidden" value={this.props.match.params.task_id} />

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Assignment to: </label>
                                    <select ref="userInput"
                                        className="form-control"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}>
                                        {
                                            this.state.users.map(function (user) {
                                                return <option
                                                    key={user}
                                                    value={user}>{user}
                                                </option>;
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Title: </label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label>Description: </label>
                                    < textarea type="text" name="description" id="description"
                                        required class="form-control"
                                        value={this.state.description} rows="5" onChange={this.onChangeDescription} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Duration (in hours): </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.duration}
                                        onChange={this.onChangeDuration}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Date: </label>
                                    <div style={{ width: "100%", display: "block" }}>
                                        <DatePicker
                                            selected={this.state.date}
                                            onChange={this.onChangeDate}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Status: </label>
                                    <select class="form-control">
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="In Review">In Review</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12" style={{ textAlign: "center", marginTop: "50px" }}>
                                <div className="form-group">
                                    <input type="submit" value={this.state.task_id ? "Edit" : "Create"} className="btn btn-primary" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        )
    }
}