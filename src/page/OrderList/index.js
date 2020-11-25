import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Input, Button, Select, DatePicker, Table} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import './index.scss';
import {env} from "../../utils";
import requestFun from '../../services/fetch';
const {post} = requestFun;


moment.locale('zh-cn');

const {RangePicker} = DatePicker;

const OrderList = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [dataSource, setDataSource] = useState([]);


  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const columns = [
    {
      title: '宣传时间',
      dataIndex: 'receiveTime',
    },
    {
      title: '申请单号',
      dataIndex: 'soilId',
    },
    {
      title: '申请人姓名',
      dataIndex: 'pointName',
    },
    {
      title: '申请人部门',
      dataIndex: 'soilName',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: 'actions',
    },
  ];
  // const dataSource = [
  //   {
  //     key: '1',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '2',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '3',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '4',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '5',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '6',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '7',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '8',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '9',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '10',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  //   {
  //     key: '11',
  //     time: '2020/03/18 - 2020/03/18',
  //     orderId: 'A10001',
  //     name: '离散',
  //     department: '企业智能平台',
  //     status: '待提交无聊'
  //   },
  // ];
  const handleTableChange = pagination => {
    console.log('is-pa-', pagination);
    setPagination(pagination);
  };
  async function initUserListData(val = {
    soilId: '',
    startTime: '',
    endTime: '',
    limit: '',
  }) {
    const res = await post(`${env.api}/soil/table/curValue`, val);
    const {success, object} = res;
    if (success) {
      setDataSource(object);
    }
  }
  const onFinish = async values => {
    console.log('Received values of form: ', values);
    const res = await initUserListData(values);
    const {success, object} = res;
    if (success) {
      setDataSource(object);
    }
  };
  useEffect(async () => {
    await initUserListData()
  }, []);

  return (
      <div className="list">
        <div className="formHeader">
          <div className="f_title">申请单管理</div>
          <Form
              {...formItemLayout}
              form={form}
              onFinish={onFinish}
              initialValues={{
                status: '0'
              }}
          >
            <Row>
              <Col span={8}>
                <Form.Item
                    name="soilId"
                    label="申请单号"
                    rules={[
                      {
                        required: true,
                        message: '请输入申请单号',
                      },
                    ]}
                >
                  <Input placeholder="请输入申请单号"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                    name="soilName"
                    label="申请人姓名"
                    rules={[
                      {
                        required: false,
                        message: '请输入申请人姓名',
                      },
                    ]}
                >
                  <Input placeholder="请输入申请单号"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                    name="status"
                    label="状态"
                    rules={[
                      {
                        required: true,
                        message: '请输入申请单号',
                      },
                    ]}
                >
                  <Select>
                    <Select.Option value="0">全部</Select.Option>
                    <Select.Option value="1">一</Select.Option>
                    <Select.Option value="2">二</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                    name="time"
                    label="广告投屏时间"
                    rules={[
                      {
                        type: 'array',
                        required: true,
                        message: '请选择时间',
                      },
                    ]}
                >
                  <RangePicker
                      ranges={{
                        Today: [moment(), moment()]
                      }}
                      format="YYYY-MM-DD"
                      style={{width: '100%'}}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item wrapperCol={{offset: 6}}>
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button
                      type="default"
                      style={{marginLeft: 20}}
                  >重置</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="f_table">
          <div className="f_top">
            <div className="f_title">申请单管理</div>
            <Button type="primary">新建申请单</Button>
          </div>
          <Table
              loading={loading}
              dataSource={dataSource}
              rowKey={(record, i) => i}
              columns={columns}
              pagination={pagination}
              onChange={handleTableChange}
          />
        </div>
      </div>
  )
};

export default OrderList;
