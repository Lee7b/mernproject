import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBModalFooter, MDBIcon } from
'mdbreact';
import axios from 'axios';

class ModalPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      name: this.props.name,
      email: this.props.email
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

onChangeName(e) {
  this.setState({name: e.target.value});
}

onChangeEmail(e) {
  this.setState({email: e.target.value});
}

onSubmit(e) {
  e.preventDefault();
  const obj = {
    name: this.state.name,
    email: this.state.email
  };

  console.log(obj);

  axios.put('/api/users/'+this.props.id, obj)
      .then(res => console.log(res.data));

  this.toggle();
}

render() {
    return (
      <MDBContainer>
        <MDBBtn size="sm" rounded onClick={this.toggle}>Edit</MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader className="text-center" titleClass="w-100 font-weight-bold" toggle={this.toggle}>Update User</MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 grey-text">
              <MDBInput label={this.props.name} icon="user" type="text" validate onChange={this.onChangeName} />
              <MDBInput label={this.props.email} icon="envelope" type="email" validate error="wrong" success="right" onChange={this.onChangeEmail} />
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn color="indigo" onClick={e => this.onSubmit(e)}>Update
              <MDBIcon far icon="paper-plane" className="ml-2" />
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalPage;