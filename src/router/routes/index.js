export default [
  {
    path: '/quiz/:quizId',
    name: 'QuizView',
    component: () => import('@/views/Quiz')
  },
  {
    path: '/creator',
    name: 'CreatorView',
    component: () => import('@/views/Creator')
  }
]
