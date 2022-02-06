import { Home, Users } from 'react-feather'

export default [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard'
  },
  {
    id: 'users',
    title: 'Users',
    icon: <Users size={20} />,
    navLink: '/users'
  }
]
