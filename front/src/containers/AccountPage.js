import React from 'react';
import { connect } from 'react-redux';
import {Avatar, Button} from "antd";
import * as actions from "../store/actions/auth";
import axios from 'axios';


class UserPage extends React.Component {

  handleLogout(){
    this.props.logout();
    this.props.history.push('/');
  }


  handleChangePass(){
    this.props.history.push('/changePass/');
  }

  handleChangeProfile(){
    this.props.history.push('/editProfile/');
  }



  state = {
    data: {}
  }

  componentDidMount(){
    axios.get(`http://127.0.0.1:8000/profiles/${localStorage.getItem('user')}`)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
  }

  render() {

    return (
      <div className='userpage' style={{height:1000, background: 'white', color: 'black'}}>
        {/*<h1>This page is not completed</h1>*/}
        <div style={{margin: 40, display:"inline-block"}}><Avatar shape="square" size={300} icon="user" /></div>

        <div style={{display:"inline-block"}}>

          Username is {localStorage.getItem('user')}<br/>
          Phone {this.state.data.phone}<br/>
          <Button type="primary" htmlType="submit" style={{marginTop: '10px'}} onClick={this.handleLogout.bind(this)}>
          Logout
        </Button><br/>

          <Button type="primary" htmlType="submit" style={{marginTop: '10px'}} onClick={this.handleChangePass.bind(this)}>
            Change password
          </Button><br/>
          <Button type="primary" htmlType="submit" style={{marginTop: '10px'}} onClick={this.handleChangeProfile.bind(this)}>
            Change profile info
          </Button><br/>
        </div>


      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}


export default connect(null, mapDispatchToProps)(UserPage);
