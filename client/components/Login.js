import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import firebase from 'firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      signupShow: false,
      username: '',
      password: '',
    };
  }

  handleUserName(e) {
    this.setState({
      username: e.currentTarget.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.currentTarget.value,
    });
  }

  handleSignIn() {
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .then((user) => {
        console.log('user: ', user);
        this.props.handleLogin(this.createUsername(this.state.username));
        this.endState();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, ': ', errorMessage);
        alert ('Error: ' + errorMessage);
      });
  }

  handleSignUp() {
    firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then((x) => {
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
          .then((user) => {
            console.log('user: ', user);
            let displayName = this.createUsername(this.state.username);
            this.writeUserData(user.uid, displayName)
              .then(() => {
                this.props.handleLogin(displayName);
                this.endState();
              });
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, ': ', errorMessage);
        alert ('Error: ' + errorMessage);
      });
  }

  /* Abandoned Facebook Login 
  facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider)
    .then(function(e) {
      firebase.auth().getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          var token = result.credential.accessToken;
          console.log('token = ', token);
        }
        var user = result.user;
        console.log('user = ', user);
      })
      .catch(function (error) {
        console.log("Error on facebookLogin = ", error);
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, ': ', errorMessage);
        alert ('Error: ' + errorMessage + '\n' + 'Code: ' + errorCode);

        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
    });
  }
  */

  writeUserData(uid, username) {
    return firebase.database().ref('users/' + uid).set({
      username,
      winCount: 0,
    });
  }

  //takes email and slices off the @example.com
  createUsername(email) {
    var atIndex = email.indexOf('@');
    var username = email.slice(0, atIndex)
    return username;
  }

  // hides both modals
  endState() {
    this.setState({
      show: false,
      signupShow: false,
    });
  }

  // toggles between signup and signin modals
  switchState() {
    this.setState({
      show: !this.state.show,
      signupShow: !this.state.signupShow,
    });
    console.log('this.state.show: ', this.state.show);
  }

  close() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <div>
        <div id="login-modal">
          <Modal show={this.state.show} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form id="login-information">
                <input
                  type="text"
                  value={this.state.username}
                  placeholder="Enter name"
                  onChange={e => this.handleUserName(e)}
                />
                <br />
                <input
                  type="password"
                  value={this.state.password}
                  placeholder="Enter password"
                  onChange={e => this.handlePassword(e)}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={e => this.switchState(e)}>Click to Sign Up</Button>              
              <Button type="submit" onClick={e => this.handleSignIn(e)}>Login</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div id="login-modal">
          <Modal show={this.state.signupShow} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form id="login-information">
                <input
                  type="text"
                  value={this.state.username}
                  placeholder="Enter name"
                  onChange={e => this.handleUserName(e)}
                />
                <br />
                <input
                  type="password"
                  value={this.state.password}
                  placeholder="Enter password"
                  onChange={e => this.handlePassword(e)}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={e => this.switchState(e)}>Return to Login</Button>
              <Button type="submit" onClick={e => this.handleSignUp(e)}>Sign Up</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}