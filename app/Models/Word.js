'use strict'

const Model = use('Model')

class Word extends Model {
  static async findAll (listId) {
    try {
      const words = await Word
        .query()
        .where('list_id', listId)
        .orderBy('word')
        .fetch()
      return words
    } catch (error) {
      return 'i dont really know what i am doing'
    }
  }
}

module.exports = Word
