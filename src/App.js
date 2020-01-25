import React, { Component } from 'react'
import firebase from './firebase'
import 'firebase/storage'
import './App.css'
import Group from './group.js'

class App extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  twitterLogin() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider)
  }

  githubLogin() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider)
  }

  logout() {
    firebase.auth().signOut()
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div className="nowLogin">
            <div className="loginUser">
              {/* なぜか画像が表示されない */}
              {/* <img src="this.state.user.photoURL" /> */}
              <p className="User-info">
                {this.state.user && this.state.user.displayName}
              </p>
              <div className="btn-logout-box">
                <button className="btn-logout" onClick={this.logout}>Logout</button>
              </div>
              <Group />
            </div>
            <div className="chatSpace">
            </div>
          </div>
        ) : (
          <div>
            <h1>Welcome</h1>
            <div className="loginBlock">
              <p>Login</p>
              <button className="googleButton" onClick={this.googleLogin}>
                Google
              </button>
              <button className="twitterButton" onClick={this.twitterLogin}>
                twitter
              </button>
              <button className="githubButton" onClick={this.githubLogin}>
                github
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App;