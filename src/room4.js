import React, { Component } from 'react'
import firebase from './firebase.js'
import TextForm4 from './textForm1.js'
import './room.css'

class Room4 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
    this.getFireData();
  }

  getFireData() {
      let db = firebase.database()
      let ref = db.ref('/groups/room4/messages/')
      let self = this;
      ref
        .orderByChild('message/')
        .on('value', snapshot=> {
          self.setState({
            data: snapshot.val()
          });
        });
  }

  getTableData() {
    let result = [];
    if (this.state.data == null || this.state.data.length === 0) {
      return [
        <tr key="0">
          <th>No message</th>
        </tr>
      ];
    }
    this.state.data.reverse()
    for (let i in this.state.data) {
      result.push(
        <p key={i}>
          <div className="messageUnit">
            <p className="userName">name: {this.state.data[i].userName}</p>
            <p className="message">message: {this.state.data[i].message}</p>
          </div>
        </p>
      );
    }
    return result;
  }

  render(){
    if (this.state.data === 0) {
      this.getFireData();
    }
    return(
      <div className="chat">
        <div>
          <TextForm4 />
        </div>
        <div className="chatLog">
          <p>{this.getTableData()}</p>
        </div>
      </div>
    );
  }
}

export default Room4;