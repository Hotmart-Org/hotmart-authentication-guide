function deleteStateCookie(req) {
  const { API_STATE_COOKIE_KEY } = process.env

  delete req.signedCookies[API_STATE_COOKIE_KEY]
}

export { deleteStateCookie }
