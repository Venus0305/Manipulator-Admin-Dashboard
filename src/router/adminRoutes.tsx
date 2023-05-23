/* eslint-disable simple-import-sort/imports */
import {
  CalendarOutlined,
  ShopOutlined,
  MailOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Navigate } from 'react-router';
import ManipulatorList from 'containers/Manipulator/List';
import CustomerList from 'containers/Customer/List';
import SalonList from 'containers/SalonPage/List';
import BookingList from 'containers/BookingPage/List';
import CustomerDetail from 'containers/Customer/Detail';
import ProfileInfo from 'containers/Customer/Detail/Profile';
import BookingDetail from 'containers/BookingPage/Detail';
import SalonDetail from 'containers/SalonPage/Detail';
import SalonProfile from 'containers/SalonPage/Detail/Profile';
import SalonEditPage from 'containers/SalonPage/Edit';
import SalonProfileBasicForm from 'containers/SalonPage/Form/Profile/Basic';
import SalonProfileSalonForm from 'containers/SalonPage/Form/Profile/Salon';
import SalonProfileBankForm from 'containers/SalonPage/Form/Profile/Bank';
import SalonProfileWorkHourForm from 'containers/SalonPage/Form/Profile/WorkHour';
import ManipulatorDetail from 'containers/Manipulator/Detail';
import ManipulatorProfileInfo from 'containers/Manipulator/Detail/Profile';
import SalesList from 'containers/Sales/List';
import OperatorList from 'containers/Operator/List';
import OperatorCreate from 'containers/Operator/Create';

const adminRoutes = [
  {
    path: 'booking',
    name: 'sideMenu:booking',
    icon: <CalendarOutlined />,
    element: <BookingList />,
  },
  {
    path: 'booking/:id',
    element: <BookingDetail />,
  },
  {
    path: 'salon',
    name: 'sideMenu:salon',
    icon: <ShopOutlined />,
    element: <SalonList />,
  },
  {
    path: 'salon/:id',
    element: <SalonDetail />,
    children: [
      { path: 'profile', name: 'global:detail', element: <SalonProfile /> },
      { path: '', element: <Navigate replace to="profile" /> },
    ],
  },
  {
    path: 'salon/:id/edit',
    element: <SalonEditPage />,
    children: [
      {
        path: 'profile',
        children: [
          { path: 'basic-info', element: <SalonProfileBasicForm /> },
          { path: 'salon-info', element: <SalonProfileSalonForm /> },
          { path: 'bank-info', element: <SalonProfileBankForm /> },
          { path: 'work-hour-info', element: <SalonProfileWorkHourForm /> },
        ],
      },
      { path: '', element: <Navigate replace to="profile/basic-info" /> },
    ],
  },
  {
    path: 'manipulator',
    name: 'sideMenu:manipulator',
    icon: <MailOutlined />,
    element: <ManipulatorList />,
  },
  {
    path: 'manipulator/:id',
    element: <ManipulatorDetail />,
    children: [
      { path: 'profile', name: 'global:detail', element: <ManipulatorProfileInfo /> },
      { path: '', element: <Navigate replace to="profile" /> },
    ],
  },
  {
    path: 'customer',
    name: 'sideMenu:customer',
    icon: <TeamOutlined />,
    element: <CustomerList />,
  },
  {
    path: 'customer/:id',
    element: <CustomerDetail />,
    children: [
      { path: 'profile', name: 'global:detail', element: <ProfileInfo /> },
      { path: '', element: <Navigate replace to="profile" /> },
    ],
  },
  {
    path: 'sales',
    name: 'sideMenu:sales',
    icon: <SolutionOutlined />,
    element: <SalesList />,
  },
  {
    path: 'operator',
    name: 'sideMenu:operator',
    icon: <UserOutlined />,
    element: <OperatorList />,
  },
  {
    path: 'operator/create',
    element: <OperatorCreate />,
  },
  { path: '', element: <Navigate replace to="/manipulator" /> },
  { path: '*', element: <Navigate replace to="/manipulator" /> },
];

export default adminRoutes;
