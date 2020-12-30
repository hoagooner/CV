import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';


const User = props => (
    <tr>
        <td class="text-center">{props.index + 1}</td>
        <td class="text-center">{props.user.name}</td>
        <td class="text-center">{props.user.email}</td>
        <td class="text-center" >
            <Link className="btn btn-danger"
                onClick={() => { props.deleteUser(props.user._id) }}>
                Delete
            </Link>
        </td >
    </tr >
)

export default class Member extends Component {
    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)

        this.state = {
            email: '',
            users: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/user/users')
            .then(response => {
                console.log(response.data)
                this.setState({ users: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteUser(id) {
        console.log(id)
        axios.delete('http://localhost:5000/user/delete?user_id=' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onSubmit() {

    }

    userList() {
        return this.state.users.map((user, index) => {
            return <User user={user} index={index} deleteUser={this.deleteUser} key={user._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h3 style={{ marginTop: "50px" }}>
                            Members
                        </h3>
                        <table className="table table-light">
                            <thead className="thead-dark">
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Name</th>
                                    <th class="text-center">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.userList()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6">
                        <form onSubmit={this.onSubmit}>
                            <div className="row" style={{ marginTop: "20px", fontWeight: "bold" }}>
                                <div className="col-11">
                                    <label htmlFor="title">Invite Team Members</label>
                                    <input type="email" name="title" id="title" required
                                        class="form-control" placeholder="Enter email address"
                                        value={this.state.email} onChange={this.onChangeEmail} />
                                </div>
                                <div className="col-sm-1">
                                    <button type="submit" style={{outline:"none"}}>
                                        <FaPlusCircle
                                            style={{ color: "gray", fontSize: "30px", marginTop: "34px", marginLeft: "-20px" }} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}