import React from 'react';
import { Modal, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showCreateModal,
      gameType: '',
      gameName: '',
    };
  }

  handleText(event) {
    this.setState({
      gameName: event.currentTarget.value,
    });
  }

  handleSelect(event) {
    this.setState({
      gameType: event.currentTarget.value,
    });
  }

  handleSubmit() {
    const newGame = {
      name: this.state.gameName,
      type: this.state.gameType,
    };
    this.props.createGame(newGame);
    this.close();
  }

  handleCancel() {
    this.props.cancelGame();
    this.close();
  }

  close() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <div id="create-modal">
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter name"
                onChange={e => this.handleText(e)}
              />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select Game Type:</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={e => this.handleSelect(e)}
              >
                <option value="select">select</option>
                <option value="singlePlayer">single player</option>
                <option value="headToHead">head-to-head</option>
              </FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" onClick={e => this.handleCancel(e)}>Cancel</Button>
            <Button type="submit" onClick={e => this.handleSubmit(e)}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
