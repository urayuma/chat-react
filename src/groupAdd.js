import React, { Component } from 'react'
import firebase from './firebase.js'
import 'firebase/storage'
import Modal from 'react-modal'
import './groupAdd.css'

Modal.setAppElement('#root')
class GroupAdd extends Component {

  constructor(props){
    super(props);
    this.state = {
      group_id: '',
      lastID: -1,
      data: [],
      ModaiIsOpen: false
    }
    this.getLastID();
    this.doChangeGroup = this.doChangeGroup.bind(this);
    this.doAction = this.doAction.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModalCansel = this.closeModalCansel.bind(this);
    this.closeModalDecide = this.closeModalDecide.bind(this);
    // this.getFireDataModal = this.getFireDataModal.bind(this);
  }

  // モーダル開く
  openModal() {
    this.setState({
      modalIsOpen: true,
    })
    this.getFireDataModal()
  }

  afterOpenModal() {
  }

  // モーダル閉じる。キャンセル時。
  closeModalCansel() {
    this.setState({ modalIsOpen: false });
    this.deleteGroup();
  }
  // モーダル閉じる。決定時。
  closeModalDecide() {
    this.setState({ modalIsOpen: false });
  }

  doChangeGroup(e){
    this.setState({group: e.target.value})
  }

  doAction(e) {
    this.addFireData();
    this.openModal();
  }

  getLastID() {
    let db = firebase.database();
    let ref = db.ref("groups/");
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

  // グループの作成
  addFireData(){
    if (this.state.lastID === -1) {
      return;
    }
    let id = this.state.lastID * 1 + 1;
    let db = firebase.database();
    let ref = db.ref("groups/" + id);
    ref.set({
      group_id: id,
      name: this.state.group
    });
  }

  // モーダルからのグループ削除
  deleteGroup(){
    let id = this.state.lastID * 1;
    let db = firebase.database();
    let ref = db.ref('group/' + id);
    ref.remove();
  }

  // モーダル用のデータ取得
  // 配列でデータを所得しているのでコードが談長になってる。他にいい方法は無いのかな
  getFireDataModal() {
    let db = firebase.database();
    let ref = db.ref('groups/');
    let self = this;
    ref
      .orderByKey()
      .limitToLast(1)
      .on("value", snapshot => {
        self.setState({
          data: snapshot.val()
        });
      });
  }

  // グループ名をモーダルに表示
  getTableDataGroup(){
    let groupName = [];
    if (this.state.data == null || this.state.data.length === 0) {
      return [
        <p>error</p>
      ];
    }
    for (let i in this.state.data) {
      groupName.push(
        <tr key={i}>
          <th>{this.state.data[i].name}</th>
        </tr>
      );
    }
    return groupName;
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  render(){
    if(this.state.lastID === -1) {
      this.getLastID();
    }
    return(
      <div className="mkGroup">
        <div>
          <p className="mkGroupTitle">グループを作成する</p>
          <br />
          <input className="mkGroupForm" type='text' value={this.state.group} onChange={e => this.doChangeGroup(e)} placeholder="グループ名"/>
        </div>
        <button className="mkGroupAdd" onClick={this.doAction}>作成</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>{this.getTableDataGroup()} で良いですか？</h2>
          <div>Opend</div>
            <button onClick={this.closeModalDecide}>決定</button>
            <button onClick={this.closeModalCansel}>キャンセル</button>
        </Modal>
      </div>
    );
  }
}

const customStyles = {
  content: {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '0',
    transform             : 'translate(-50%, -50%)'
  }
};

export default GroupAdd;