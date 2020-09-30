import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Modal, 
    ModalHeader, 
    ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap';
import { addItem } from '../actions/itemActions';
import Proptypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: Proptypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState( { [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        this.props.addItem(newItem);

        this.toggle();
    }

    render() {
        return (
            <div>
                { this.props.isAuthenticated ? (
                    <Button
                    color="dark"
                    style={{marginBottom: '2em'}}
                    onClick={this.toggle}
                >Add Item</Button>
                ) : (
                    <h4 className="mb-3 ml-3 ">Please log in to manage the list</h4>
                ) }
                

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Enter item:</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                >Add item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    addItem: Proptypes.func.isRequired,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);