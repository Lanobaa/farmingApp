import React, {useState, useEffect} from 'react';
import {Layout, Menu, Button} from 'antd';
import {Switch, Route} from 'react-router-dom';
import router from '../../router';
import './index.scss';

const { Header, Content } = Layout;
const menus = [
  {
    name: '水肥系统',
    path: '/home/index',
    key: '1'
  },
  {
    name: '历史记录',
    path: '/home/list',
    key: '2'
  },
  {
    name: '报警记录',
    path: '/home/alarm/list',
    key: '3'
  },
  {
    name: '操作记录',
    path: '/home/operation/list',
    key: '4'
  },
  {
    name: '灌溉记录',
    path: '/home/report/list',
    key: '5'
  }
];

const Home = (props) => {
  console.log(props);
  const [current, setCurrent] = useState('1');
  const handleClick = e => {
    setCurrent(e.key);
    const path = menus.filter(item => item.key === e.key)[0].path;
    props.history.push(path);
  };

  const logoutSystem = () => {
    console.log('点击退出');
  };
  useEffect(() => {

  });

  return (
      <div className="home">
        <Layout>
          <Header>
            <div className="headerName">
              <div>
                <div className="logo">智慧农业管控系统</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={current}
                    className="menuWater"
                    onClick={handleClick}
                >
                  {menus.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)}
                </Menu>
              </div>
              <Button type="default" onClick={logoutSystem}>登出</Button>
            </div>
          </Header>
          <Content>
            <Switch>
              {
                router.map((item, index) => <Route path={item.path} component={item.component} key={`child-${index}`} exact />)
              }
            </Switch>
          </Content>
        </Layout>
      </div>
  );
};

export default Home;
