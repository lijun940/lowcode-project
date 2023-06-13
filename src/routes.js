import $ from '@/pages/$';
import Repo from '@/pages/repo'
import BasicLayout from '@/layouts/BasicLayout';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: 'index',
        component: $,
      },
      {
        path: 'repo',
        component: Repo,
      },
    ],
  }
];

export default routerConfig;
