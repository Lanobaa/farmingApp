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

const OperationList = () => {
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
      title: '地块ID',
      dataIndex: 'soilId',
      hidden: true
    },
    {
      title: '地块名称',
      dataIndex: 'soilName',
    },
    {
      title: '设备名称',
      dataIndex: 'pointName',
    },
    {
      title: '操作值',
      dataIndex: 'text',
    },
    {
      title: '操作时间',
      dataIndex: 'opTime',
    },
    {
      title: '操作用户',
      dataIndex: 'userName'
    },
    {
      title: '操作结果',
      dataIndex: 'status'
    }
  ];

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
    const res = await post(`${env.api}/soil/table/operation`, val);
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
          <div className="f_title">操作记录管理</div>
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
                    label="操作时间"
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
            <div className="f_title">操作记录列表</div>
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

export default OperationList;
