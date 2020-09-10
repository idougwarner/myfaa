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
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('@client/layouts/dashboard-layout'),
    children: [
      {
        name: 'assessment',
        path: '/assessment',
        component: () => import('@client/pages/need-assessment.vue')
      },
      {
        name: 'roster',
        path: '/roster',
        component: () => import('@client/pages/employee-roster.vue')
      },
      {
        name: 'employee-info',
        path: '/employees/:employeeId',
        component: () => import('@client/pages/employee-info.vue')
      },
      {
        name: 'training-matrix',
        path: '/training-matrix',
        component: () => import('@client/pages/training-matrix.vue')
      },
      {
        name: 'training-notifications',
        path: '/training-notifications',
        component: () => import('@client/pages/training-notifications.vue')
      },
      {
        name: 'faa-amt-awards',
        path: '/faa-amt-awards',
        component: () => import('@client/pages/faa-amt-awards.vue')
      },
      {
        name: 'audit',
        path: '/audit',
        component: () => import('@client/pages/audit.vue')
      },
      {
        name: 'admins',
        path: '/admins',
        component: () => import('@client/pages/admins.vue')
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
