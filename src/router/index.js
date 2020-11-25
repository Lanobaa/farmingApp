import SketchMap from '../page/SketchMap';
import AlarmList from '../page/AlarmList';
import OperationList from '../page/OperationList';
import StatisticsList from '../page/Statistics';
import OrderList from '../page/OrderList';

const routes = [
  {
    path: '/home/index',
    component: SketchMap,
  },
  {
    path: '/home/list',
    component: OrderList,
  },
  {
    path: '/home/alarm/list',
    component: AlarmList,
  },
  {
    path: '/home/operation/list',
    component: OperationList,
  },
  {
    path: '/home/report/list',
    component: StatisticsList,
  }
];

export default routes;
