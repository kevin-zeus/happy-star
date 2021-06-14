import React from 'react';
import {
  Layout, Button, Menu, Row, Col,
} from 'antd';
import {
  LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toggleCollapsed, changeSiderMenus } from '../../store/global';
import userApi from '../../api/user';

import './style.scss';

const MainHeader = () => {
  // router
  const history = useHistory();
  // store
  const globalStore = useSelector((state) => state.global);
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeHeaderTab = (e) => dispatch(changeSiderMenus(e.key));

  const logout = () => {
    userApi.logout();
    localStorage.clear();
    history.replace('/login');
  };

  return (
    <Layout.Header className="main-header">
      <Row type="flex" style={{ paddingRight: 20 }}>
        <Col>
          <span className="trigger" onClick={() => dispatch(toggleCollapsed())}>
            {globalStore.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </Col>
        <Col style={{ flex: 1 }}>
          <Menu className="headerMenu" onClick={changeHeaderTab} selectedKeys={globalStore.selectedHeaderKeys} mode="horizontal">
            {
              globalStore.headerMenus.map(
                (item) => <Menu.Item key={item.path}>{item.name}</Menu.Item>,
              )
            }
          </Menu>
        </Col>
        {
          userStore.info && (
            <Col>
              <div>
                {/* <span className="user-img" style={{ backgroundImage: `url(${userStore.info.avatar})` }} /> */}
                <span className="user-name">{userStore.info.platform_name}</span>
                <Button onClick={logout} type="dashed" icon={<LogoutOutlined />}>退出</Button>
              </div>
            </Col>
          )
        }
      </Row>
    </Layout.Header>
  );
};

export default MainHeader;
