import React from 'react';
import {
  Layout, Dropdown, Menu, Row, Col,
} from 'antd';
import {
  SmileOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCollapsed, changeSiderMenus } from '../../store/global';

import './style.scss';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <SmileOutlined />
      个人信息
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link to="/login">
        <LogoutOutlined />
        退出登录
      </Link>
    </Menu.Item>
  </Menu>
);

const MainHeader = () => {
  const globalStore = useSelector((state) => state.global);
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeHeaderTab = (e) => dispatch(changeSiderMenus(e.key));

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
              <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
                <div className="user-info">
                  <span className="user-img" style={{ backgroundImage: `url(${userStore.info.avatar})` }} />
                  <span className="user-name">{userStore.info.nickname}</span>
                </div>
              </Dropdown>
            </Col>
          )
        }
      </Row>
    </Layout.Header>
  );
};

export default MainHeader;
