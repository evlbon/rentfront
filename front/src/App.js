import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import CustomLayout from './containers/Layout';
import * as actions from './store/actions/auth';
import { connect } from 'react-redux';
import './App.css';
import axios from 'axios';
import {Button} from "antd";


class App extends Component {

  state = {
    current: [],
  };


  handleLogout(){
    this.props.logout();
    this.setState({
      current: []
    });
  }



  componentDidMount() {
    this.props.onTryAutoSignup();

    axios.get(`http://localhost:8000/profiles/${localStorage.getItem('user')}/`)
      .then(res => {
        this.setState({
          current: res.data
        });
      })

  }

  render() {
    if (this.state.current && this.state.current.is_banned)
      return(<div style={{align:'center'}}>
        <h1 style={{color:"white", margin:"300px 0 0 45%"}}>
          You are banned<br/>

          <Button style={{margin:"40px"}} type="danger" onClick={this.handleLogout.bind(this)}>LOGOUT</Button>
        </h1>

      </div>);


    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



// const App = () => (

// );
//
// export default App;
