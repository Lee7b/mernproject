import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';

class Users extends React.Component {
    constructor(props) {
        super();
        this.state = {
            users: [],
            name: "",
            email: "",
            modal: false
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount() {
        this.updateList();
    }

    // Edit Modal Toggle
    toggle(id) {
        this.setState({
          modal: !this.state.modal,
          id: id
        });
      }

    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    async onSubmit(e) {
        e.preventDefault();
        const obj = {
          name: this.state.name,
          email: this.state.email
        };

        await axios.post('http://localhost:5000/api/users', obj)
            .then(res => console.log(res.data));
        
        //Update list after create
        this.updateList();
    }

    async onDelete(e, id) {
        e.preventDefault();
        let url = 'http://localhost:5000/api/users/' + id
        await axios.delete(url)
            .then(console.log('deleted'))
            .catch(err => console.log(err))

        //Update list after the delete
        this.updateList();
    }

    updateList() {
        axios.get('http://localhost:5000/api/users').then(response => {
            console.log(response.data);
            this.setState({ users: response.data })
        })
        .catch(function (error) {
            console.log(error);
        });        
    }

    render() {
        return (
            <MDBContainer>
                <MDBListGroup>
                    {this.state.users.map(({_id, name, email}, idx) => (
                        <MDBListGroupItem key={idx}>
                            ID: {_id}
                            <br />
                            Name: {name}
                            <br />
                            Email: {email}
                            <MDBBtn className="ml-5" size="sm" color="warning">
                            Edit</MDBBtn>
                            <MDBBtn size="sm" color="danger" onClick={e => this.onDelete(e, _id)}>
                            Delete</MDBBtn>
                        </MDBListGroupItem>
                    ))}
                </MDBListGroup>

            <br /> 

            <form>
                <MDBInput
                    label="Name"
                    icon="user"
                    type="text"
                    error="wrong"
                    success="right"
                    onChange={this.onChangeName}
                />
                <MDBInput
                    label="Your email"
                    icon="envelope"
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    name="email"
                    onChange={this.onChangeEmail}
                />
                <MDBBtn onClick={e => this.onSubmit(e)}>Create</MDBBtn>
            </form>

            </MDBContainer>
        )
    }
}

export default Users;