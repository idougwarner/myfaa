const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('@client/components/HelloWorld')
  }
];

export default routes;
