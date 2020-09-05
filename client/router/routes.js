import ONBOARDING_STEPS from '@server/constants/onboarding-steps';

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
  },
  {
    name: ONBOARDING_STEPS.SETUP_COMPANY,
    path: `/${ONBOARDING_STEPS.SETUP_COMPANY}`,
    component: () => import('@client/pages/setup-company')
  },
  {
    name: ONBOARDING_STEPS.BUY_MODULE,
    path: `/${ONBOARDING_STEPS.BUY_MODULE}`,
    component: () => import('@client/pages/buy-module')
  }
];

export default routes;
