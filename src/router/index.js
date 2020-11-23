import SketchMap from '../page/SketchMap';
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
];

export default routes;
