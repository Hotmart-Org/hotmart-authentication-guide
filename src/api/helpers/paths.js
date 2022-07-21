import { authentication, club, sales, subscriptions } from '../constants/paths'

function buildFullPath(path) {
  const { API_HOST } = process.env

  return `${API_HOST}${path}`
}

function buildInitialPaths() {
  return { login: buildFullPath(authentication.LOGIN) }
}

function buildLoggedPaths() {
  return {
    authentication: {
      profile: buildFullPath(authentication.PROFILE),
      logout: buildFullPath(authentication.LOGOUT),
      revoke: buildFullPath(authentication.REVOKE),
    },
    integration: {
      club: buildFullPath(club.ROOT),
      sales: buildFullPath(sales.ROOT),
      subscriptions: buildFullPath(subscriptions.ROOT),
    },
  }
}

export { buildFullPath, buildInitialPaths, buildLoggedPaths }
