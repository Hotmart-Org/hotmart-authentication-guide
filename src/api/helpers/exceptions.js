function badRequest(variables) {
  return {
    error: 'bad_request',
    error_description: `${variables} not defined.`,
  }
}

function unauthorized() {
  return {
    error: 'unauthorized',
    error_description: "You don't have permission to take this action.",
  }
}

export { badRequest, unauthorized }
