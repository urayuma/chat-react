import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/auth'
import './textForm.css'

class TextForm2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      messageId: '',
      userName:'',
      message: '',
      lastID: -1,
      data: []
    }
    this.getLastID();
    this.doChangeText = this.doChangeText.bind(this);
    this.doAction = this.doAction.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  doChangeText(e) {
    this.setState({message: e.target.value})
  }

  doAction(e) {
    this.addFireData();
  }

  getLastID() {
    let db = firebase.database();
    let ref = db.ref('/groups/room2/messages/');
    let self = this;
    ref
      .orderByKey()
      .limitToLast(1)
      .on("value", snapshot => {
        let res = snapshot.val();
        for (let i in res) {
          self.setState({
            lastID: i
          });
          return;
        }
      });
  }

  // メッセージの作成
  addFireData(){
    if (this.state.lastID === -1) {
      return;
    }
    let id = this.state.lastID * 1 + 1;
    let db = firebase.database();
    let ref = db.ref('groups/room2/messages');
    ref.child(id).update({
      messageId: id,
      userName: firebase.auth().currentUser.displayName,
      message: this.state.message
    });
  }

  render(){
    if(this.state.lastID === -1) {
      this.getLastID();
    }
    return(
      <div className="textAdd">
        <input className="textForm" type='text' value={this.state.message} onChange={e => this.doChangeText(e)} />
        <button className="textBtn" onClick={this.doAction}>送信</button>
      </div>
    );
  }
}

export default TextForm2;