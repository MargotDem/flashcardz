'use strict'

const Word = use('App/Models/Word')

class WordController {
  async index ({ request, auth }) {
    try {
      await auth.check()
      const words = await Word.findAll(request.input('listId'))
      return words
    } catch (error) {
      return 'false'
    }
  }
}

module.exports = WordController
