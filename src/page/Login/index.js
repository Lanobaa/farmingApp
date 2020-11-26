import React from "react";
import {Form, Input, Button, Checkbox, message} from 'antd';
import logo from '../../assets/w-logo.png';
import './index.scss';
import requestFun from '../../services/fetch';
import {env} from '../../utils';

const {post} = requestFun;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const LoginPage = props => {
  const onFinish = async values => {
    console.log('Success:', values);
    const res = await post(`${env.api}/logon/authentication`, values);
    const {success, message:msg} = res;
    if (success) {
      message.success(msg);
      props.history.push('/home/index');
    } else {
      message.error(msg);
    }
  };

  const onFinishFailed = errorInfo => {
    // props.history.push('/home/index');
    console.log('Failed:', errorInfo);
  };
  return (
      <div className="login">
        <div className="content">
          <header className="header">
            <div className="logo"><img src={logo} alt=""/></div>
          </header>
          <section className="section">
            <div className="center">
              <div className="title">
                <span>智慧农业管控系统</span>
                <p>让农业更轻松智能，解放农民的双手</p>
              </div>
              <div className="container">
                <span>帐号密码登录</span>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                      name="loginName"
                      rules={[{ required: true, message: '请输入用户名!' }]}
                  >
                    <Input size="large" placeholder="请输入帐号" />
                  </Form.Item>
                  <Form.Item
                      name="loginPswd"
                      rules={[{ required: true, message: '请输入密码!' }]}
                  >
                    <Input.Password size="large" placeholder="请输入密码" />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                      <Checkbox>记住帐号</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% + 8px)' }} className="remember">
                      <a href="#">忘记密码？</a>
                    </Form.Item>
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}} size="large">
                      登 录
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </section>
          <footer className="footer">
            <div>© 2020 版权所有内蒙机电学院</div>
            <div>
              <a>服务平台</a>
              <a>帮助</a>
              <a>公司邮箱</a>
            </div>
          </footer>
        </div>
      </div>
  )
};

export default LoginPage;
