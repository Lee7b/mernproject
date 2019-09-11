import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';
import Modal from './editmodal';

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

        await axios.post('/api/users', obj)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
        //Update list after create
        this.updateList();
    }

    async onDelete(e, id) {
        e.preventDefault();
        let url = '/api/users/' + id
        await axios.delete(url)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        //Update list after the delete
        this.updateList();
    }

    updateList() {
        axios.get('/api/users').then(res => {
            console.log(res.data);
            this.setState({ users: res.data })
        })
        .catch(err => console.log(err));
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
                            <Modal id={_id} name={name} email={email} updateList={this.updateList} />
                            <MDBBtn className="ml-0" size="sm" color="danger" onClick={e => this.onDelete(e, _id)} style={{width:"100px"}}>Delete</MDBBtn>      
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