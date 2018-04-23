'use strict'

class WordController {
  async index ({ request, auth }) {
    try {
      await auth.check()
      return 'true'
    } catch (error) {
      return 'false'
    }
  }
}

module.exports = WordController
