import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/Dashboard'))
  },
  {
    path: '/users',
    exact: true,
    component: lazy(() => import('../../views/Users/Index'))
  },
  {
    path: '/users/create',
    component: lazy(() => import('../../views/Users/Create'))
  },
  {
    path: '/users/edit/:id',
    component: lazy(() => import('../../views/Users/Edit'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/Auth/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/Auth/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Errors/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
