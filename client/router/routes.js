const routes = [
  {
    path: '/',
    component: () => import('@client/layouts/home-layout'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('@client/pages/home')
      },
      {
        name: 'modules',
        path: 'modules',
        component: () => import('@client/pages/modules')
      },
      {
        name: 'order',
        path: 'order',
        component: () => import('@client/pages/order')
      },
      {
        name: 'aboutus',
        path: 'aboutus',
        component: () => import('@client/pages/about-us')
      },
      {
        name: 'contact',
        path: 'contact',
        component: () => import('@client/pages/contact')
      }
    ]
  }
];

export default routes;
