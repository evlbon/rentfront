import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Layout, Menu, Carousel, Button, Icon } from 'antd';
const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class CustomLayout extends React.Component {


    render() {
        return (
          <Layout>

            <Header style={{ position: 'fixed', zIndex: 4, width: '100%',font:'normal 30px/1 Arial Black, Gadget, sans-serif'}}>
              <div className="auth">
                <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{ lineHeight: '64px'}}
                >
                  {/*<Menu.Item key="1"><Link to="/login">Account</Link></Menu.Item>*/}


                  {
                    this.props.isAuthenticated ?

                      <Menu.Item key="1">
                        <Link to="/userpage/">Hello  {localStorage.getItem('user')}</Link>
                      </Menu.Item>

                      :

                      <Menu.Item key="1">
                        <Link to="/login">Account</Link>
                      </Menu.Item>
                  }


                  <Menu.Item key="2">Search</Menu.Item>
                </Menu>
              </div>

              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px'}}
              >
                <Menu.Item key="4"><Link to="/">Main Page</Link></Menu.Item>
                <Menu.Item key="1"><Link to="/items/">Items</Link></Menu.Item>
                {localStorage.getItem('user')? <Menu.Item key="2"><Link to="/allusers/">Users</Link></Menu.Item>:""}

              </Menu>
            </Header>



            <Content>
              {this.props.children}
            </Content>


            <Footer style={{ textAlign: 'center', color: 'white' }}>
              Rent system ©2019 Created by Eugene Bondarev
            </Footer>
          </Layout>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));