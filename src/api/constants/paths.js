const ROOT = '/'

const authentication = {
  ROOT,
  LOGIN: '/login',
  CALLBACK: '/callback',
  PROFILE: '/profile',
  LOGOUT: '/logout',
  REVOKE: '/revoke',
}

const sales = {
  ROOT: '/sales',
  BASE: '/payments/api/v1/sales',
  HISTORY: '/history',
  SUMMARY: '/summary',
  USERS: '/users',
  COMMISSIONS: '/commissions',
  PRICE_DETAILS: '/price/details',
}

const subscriptions = {
  ROOT: '/subscriptions',
  BASE: '/payments/api/v1/subscriptions',
  LIST: '/list',
  LIST_CANCEL: '/cancel',
  LIST_REACTIVATE: '/reactivate',
  CHANGE_DAY: '/:subscriberCode',
  PURCHASES: '/:subscriberCode/purchases',
  CANCEL: '/:subscriberCode/cancel',
  REACTIVATE: '/:subscriberCode/reactivate',
}

const club = {
  ROOT: '/club',
  BASE: '/club/api/v1',
  MODULES: '/modules',
  MODULES_PAGES: '/modules/:moduleId/pages',
  USERS: '/users',
  USERS_LESSONS: '/users/:userId/lessons',
}

export { ROOT, authentication, sales, subscriptions, club }
