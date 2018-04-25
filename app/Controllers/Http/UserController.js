'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  getUser ({ request }) {
    return 'bonjour'
  }

  async login ({ request, auth, response, session }) {
    const rules = {
      email: 'required|email',
      password: 'required'
    }
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      // return response.redirect('back')
      return 'false'
    }

    const { email, password } = request.all()

    try {
      await auth.attempt(email, password)
      return 'true'
    } catch (error) {
      return 'false'
    }
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

  async register ({ request, response, session, auth }) {
    const rules = {
      email: 'required|email|unique:users,email',
      password: 'required'
    }
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      // return response.redirect('back')
      return 'false'
    }

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
