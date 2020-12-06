// import React, { useState, useContext, useEffect } from 'react'
// import axios from 'axios'
// import { GlobalState } from '../../../GlobalState'
// import { useParams } from 'react-router-dom'

// const initialState = {
//     board_id: '5fcc60913f71f727500d25db',
//     title: '',
//     description: '.',
//     duration: '5',
//     date: '2020/12/12'
// }

// function CreateTask() {
//     const state = useContext(GlobalState)
//     const [task, setTask] = useState(initialState)
//     const [token] = state.token
//     const param = useParams()
//     const [onEdit, setOnEdit] = useState(false)
//     // const [callback, setCallback] = state.tasksAPI.callback
//     // useEffect(() => {
//     //     if (param.id) {
//     //         setOnEdit(true)
//     //         tasks.forEach(task => {
//     //             if (task._id === param.id) {
//     //                 setTask(task)
//     //             }
//     //         })
//     //     } else {
//     //         setOnEdit(false)
//     //         setTask(initialState)
//     //     }
//     // }, [param.id, tasks])

//     const handleChangeInput = e => {
//         const { name, value } = e.target
//         setTask({ ...task, [name]: value })
//     }

//     const handleSubmit = async e => {
//         e.preventDefault()
//         try {

//             if (onEdit) {
//                 await axios.put(`/api/tasks/${task._id}`, { ...task }, {
//                     headers: { Authorization: token }
//                 })
//             } else {
//                 await axios.post('/api/tasks', { ...task }, {
//                     headers: { Authorization: token }
//                 })
//             }
//             // setCallback(!callback)
//         } catch (err) {
//             alert(err.response.data.msg)
//         }
//     }

//     return (
//         <div className="create_task">

//             <form onSubmit={handleSubmit}>
//                 <div className="row">
//                     <input type="text" name="board_id" id="" value={param.id} required/>
//                 </div>

//                 <div className="row">
//                     <input type="text" name="date" id="" value={task.date} required/>
//                 </div>

//                 <div className="row">
//                     <label htmlFor="title">Title</label>
//                     <input type="text" name="title" id="title" required
//                         value={task.title} onChange={handleChangeInput} />
//                 </div>

//                 <div className="row">
//                     <label htmlFor="description">Description</label>
//                     <textarea type="text" name="description" id="description" required
//                         value={task.description} rows="5" onChange={handleChangeInput} />
//                 </div>

//                 <div className="row">
//                     <label htmlFor="durantion">duration</label>
//                     <input type="text" name="duration" id="duration" required
//                         value={task.duration} onChange={handleChangeInput} />
//                 </div>

//                 <button type="submit">{onEdit ? "Update" : "Create"}</button>
//             </form>
//         </div>
//     )
// }

// export default CreateTask


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
            board_id: this.props.match.params.id,
            title: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // componentDidMount() {
    //     axios.get('http://localhost:5000/users/')
    //         .then(response => {
    //             if (response.data.length > 0) {
    //                 this.setState({
    //                     users: response.data.map(user => user.username),
    //                     username: response.data[0].username
    //                 })
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })

    // }

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
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(task);

        
        axios.post('http://localhost:5000/api/tasks', task)
            .then(res => console.log(res.data));

        window.location = `/board/${this.state.board_id}`;
    }

    render() {
        return (
            <div>
                <h3>Create New Task Log</h3>
                <form onSubmit={this.onSubmit}>

                    <input type="text"
                        required
                        value={this.state.board_id}
                    />
                    <div className="form-group">
                        <label>Username: </label>
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

                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create task Log" className="btn btn-primary" />
                    </div>
                </form>
            </div >
        )
    }
}