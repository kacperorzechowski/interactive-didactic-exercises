export default [
  {
    path: '/exercise/:exercise',
    name: 'Exercise',
    component: () => import('@/views/Quiz')
  },
  {
    path: '/creator',
    name: 'CreatorView',
    component: () => import('@/views/Creator')
  }
]
