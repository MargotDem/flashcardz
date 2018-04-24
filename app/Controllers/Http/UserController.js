'use strict'

const User = use('App/Models/User')

class UserController {
  getUser ({ request }) {
    return 'bonjour'
  }

  async login ({ request, auth }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)
    return 'Logged in successfully'
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

  async register ({ request, auth }) {
    const { email, password } = request.all()

    const user = new User()

    user.email = email
    user.password = password

    await user.save()
    await auth.attempt(email, password)

    // i dont know what / if I should return
    return 'Account created successfully'
  }
}

module.exports = UserController
