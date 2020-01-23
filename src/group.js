import React, { Component } from 'react'
import 'firebase/storage'
import './group.css'
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Room1 from './room1.js'
import Room2 from './room2.js'
import Room3 from './room3.js'
import Room4 from './room4.js'

class Group extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     chat: <Room1 />
  //   }
  //   this.handleClick = this.handleClick.bind();
  // }

  // グループ名クリック後チャット表示できるようにstateを持たせる。
  // handleClick() {
  //   this.props.onClick(this.state.chat);
  // }

  render() {
    let room1 = ()=> <p className="chatRoom"><Room1 /></p>
    let room2 = ()=> <p className="chatRoom"><Room2 /></p>
    let room3 = ()=> <p className="chatRoom"><Room3 /></p>
    let room4 = ()=> <p className="chatRoom"><Room4 /></p>
    return (
      <div>
        <div className="groups">
          <p className="groupTitle">グループ一覧</p>
          <Router>
            <ul>
              <li><Link to= "/room1">Room1</Link></li>
              <li><Link to= "/room2">Room2</Link></li>
              <li><Link to= "/room3">Room3</Link></li>
              <li><Link to= "/room4">Room4</Link></li>
            </ul>
            <div>
              <Switch>
                <Route path="/room1" exact component={room1}/>
                <Route path="/room2" exact component={room2}/>
                <Route path="/room3" exact component={room3}/>
                <Route path="/room4" exact component={room4}/>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default Group;