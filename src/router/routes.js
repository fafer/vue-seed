import BasicLayout from '../components/basicLayout';
const routes = [
  {
    path: '/',
    redirect: '/home/',
  },
  {
    path: '/home',
    component: BasicLayout,
    children: [
      { path: '/', name: 'Home', component: () => import('../views/home') },
    ],
  },
];

export default routes;
