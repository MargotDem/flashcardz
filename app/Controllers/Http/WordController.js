'use strict'

const Word = use('App/Models/Word')
const { validate } = use('Validator')

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

  async store ({ request, auth, session }) {
    const rules = {
      word: 'required|max:80',
      translation: 'required|max:80'
    }
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept([])

      // return response.redirect('back')
      return 'false'
    }

    try {
      const { word, translation, id } = request.all()

      const newWord = new Word()

      newWord.word = word
      newWord.translation = translation
      newWord.list_id = id

      await newWord.save()
    } catch (error) {
      return 'false'
    }
  }

  async destroy ({ params, auth }) {
    try {
      await auth.check()
      let id = params.id

      const word = await Word.find(id)
      await word.delete()
    } catch (error) {
      return 'false'
    }
  }

  async update ({ request, auth, session }) {
    const rules = {
      word: 'required|max:80',
      translation: 'required|max:80'
    }
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept([])

      // return response.redirect('back')
      return 'false'
    }

    try {
      const { word, translation, id } = request.all()
      const updatedWord = await Word.find(id)
      updatedWord.word = word
      updatedWord.translation = translation
      await updatedWord.save()
    } catch (error) {
      return error
    }
  }
}

module.exports = WordController
