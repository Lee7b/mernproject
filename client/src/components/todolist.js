import React from 'react';
import { MDBListGroup, MDBBtn, MDBListGroupItem, MDBContainer, MDBInput } from "mdbreact";
import axios from 'axios';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            todolist: [],
            todoitem: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    componentDidMount() {
        // Get users
        axios.get('http://localhost:5000/api/todos').then(response => {
            console.log(response.data);
            this.setState({ todolist: response.data })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const obj = {
            todoitem: this.state.todoitem
        }

        axios.post('http://localhost:5000/api/todos', obj)
            .then(res => console.log(res.data));

        this.setState({
            todolist: [...this.state.todolist, {todoitem: this.state.todoitem}],
            todoitem: ""
        })
    }

    handleDelete(e) {
        let url = 'http://localhost:5000/api/todos/delete/'
        axios.get(url)
            .then(console.log('deleted'))
            .catch(err => console.log(err))

        let arr = [...this.state.todolist]
        let index = arr.indexOf(this.state.todoitem);
        arr.splice(index, 1);
        this.setState({todolist: arr});

        this.setState({todoitem: ""});
    }

    render() {
        return (
            <div>
            <MDBContainer>
            <MDBListGroup style={{ width: "22rem" }}>
                <h2>Todo List:</h2>
                {this.state.todolist.map(({todoitem}, idx) => (
                 <MDBListGroupItem key={idx}>
                    {todoitem}
                    <MDBBtn
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        value={todoitem}
                        onClick={e => this.setState({todoitem: e.target.value}, this.handleDelete)}
                    >Delete {todoitem}                     
                    </MDBBtn>
                </MDBListGroupItem>
                ))}
            </MDBListGroup>

            <MDBInput
                label="Add todo item"
                icon="user"
                type="text"
                error="wrong"
                success="right"
                name="todoitem"
                onChange={e => this.setState({ todoitem: e.target.value })}
            />
            <MDBBtn onClick={this.handleSubmit}>Add</MDBBtn>
            

            </MDBContainer>
            </div>
        )
    }
}

export default List;