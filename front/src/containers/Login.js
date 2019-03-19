import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './auth.css';


const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {



  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      this.props.onAuth(values.userName, values.password);

    });
  }

  handleCrate = () => {
    this.props.history.push('/signup/');
  }



  render() {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }

    const { getFieldDecorator } = this.props.form;
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }

    return (
        <div style={{background:"white", height:1000}}>


          <div style={{height:"15%"}}/>

          <div className="uraccount">
            <h1>Your Account</h1>
          </div>



          <div style={{margin:"0 20% 0 20%"}}>


            <div className="login">
              <h1>Login</h1>
              {errorMessage}
              {
                this.props.loading ?

                  <Spin indicator={antIcon} />
                  :
                  <Form onSubmit={this.handleSubmit} className="login-form">

                    <FormItem>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                      )}
                    </FormItem>

                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                      )}
                    </FormItem>

                    <FormItem>
                      <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Login
                      </Button>
                    </FormItem>
                  </Form>
              }
            </div>

            <div className="login2">

              <h1>Register</h1>

              <li>
                By creating an account, you will be able to move through the rent process faster,
                store multiple addresses, view and track your orders in your account and more.
              </li>

              <Button type="primary" htmlType="submit" style={{marginTop: '10px'}} onClick={this.handleCrate.bind(this)}>
                Create account<Icon type="arrow-right" />
              </Button>

            </div>

          </div>

      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);