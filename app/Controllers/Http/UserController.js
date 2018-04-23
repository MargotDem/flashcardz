'use strict'

class UserController {
  getUser ({ request }) {
    return 'bonjour'
  }

  async login ({ request, auth }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)
    return 'Logged in successfully'
    // await auth.logout()
  }

  async check ({ request, auth }) {
    try {
      await auth.check()
      return 'true'
    } catch (error) {
      return 'false'
    }
  }

  async logout ({ request, auth }) {
    await auth.logout()
  }
}

module.exports = UserController
