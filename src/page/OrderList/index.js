import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Input, Button, Select, DatePicker, Table} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import {isNotNull} from '../../utils';
import './index.scss';
import {env} from "../../utils";
import requestFun from '../../services/fetch';
const {get,post} = requestFun;

const defaultSelectDate = {
  startDate: moment().subtract( 7, 'day' ).hour( 23 ).minute( 59 ).second( 59 ),
  endDate: moment().endOf( 'day' )
};

moment.locale('zh-cn');

const {RangePicker} = DatePicker;

const {Option} = Select;

const OrderList = () => {
  const [form] = Form.useForm();
  const formRef = React.createRef()
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 1,
  });
  const [dataSource, setDataSource] = useState([]);
  const [soils, setSoils] = useState([]);


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
      title: '实时值',
      dataIndex: 'text',
    },
    {
      title: '接收时间',
      dataIndex: 'receiveTime',
    },
  ];

  async function initUserListData(val) {
    const res = await post(`${env.api}/soil/table/curValue`, val);
    const {success, object, current, pageSize, totalCount} = res;
    console.log('new-res---', res);
    if (success) {
      setPagination({
        current,
        pageSize,
        total: totalCount
      })
      setDataSource(object);
    }
  }

  const  reset = () => {
    formRef.current.resetFields();
  };

  const handleTableChange = pagination => {
    // 获取当前表单的参数
    const values = formRef.current.getFieldsValue();
    const val = {
      ...values,
      ...pagination,
      startTime: isNotNull(values.time) ? moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss') : '',
      endTime: isNotNull(values.time) ? moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss') : '',
    };
    initUserListData(val)
  };

  const onFinish = values => {
    console.log('Received values of form: ', values);
    const val = {
      ...values,
      ...pagination,
      startTime: isNotNull(values.time) ? moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss') : '',
      endTime: isNotNull(values.time) ? moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss') : '',
    };
    initUserListData(val);
  };



  const initSelect=async ()=>{
    const res = await get(`${env.api}/soil/home/all/soils`);
    const {success, object = []} = res;
    if (success) {
      const  data = [];
      for( let i in object){
        for(let key in object[i]){
          data.push(<Option key={key}>{object[i][key]}</Option>)
        }
      }
      console.log(data);
      setSoils(data);
    }
  };
  useEffect(async () => {
    await initUserListData();
    await initSelect();
  }, []);

  return (
      <div className="list">
        <div className="formHeader">
          <div className="f_title">历史数据管理</div>
          <Form
              {...formItemLayout}
              ref={formRef}
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
                    label="地块"
                    rules={[
                      {
                        message: '请输选择地块',
                      },
                    ]}
                >
                  <Select
                      showArrow={false}
                      placeholder="请选择地块..."
                  >
                    {soils}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                    name="time"
                    label="起止时间"
                    rules={[
                      {
                        type: 'array',
                        message: '请选择时间',
                      },
                    ]}
                >
                  <RangePicker
                      locale={locale}
                      ranges={{
                        '近7天': [ defaultSelectDate.startDate, defaultSelectDate.endDate ],
                        '近30天': [ moment().subtract( 30, 'day' ).hour( 23 ).minute( 59 ).second( 59 ), defaultSelectDate.endDate ]
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
                      onClick={reset}
                  >重置</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="f_table">
          <div className="f_top">
            <div className="f_title">历史数据查询</div>
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
