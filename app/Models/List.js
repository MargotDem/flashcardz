'use strict'

const Model = use('Model')
const Word = use('App/Models/Word')

class List extends Model {
  static async findAll (folderId) {
    try {
      const lists = await List
        .query()
        .where('folder_id', folderId)
        .fetch()
      return lists
    } catch (error) {
      return 'i dont really know what i am doing'
    }
  }
  static async destroy (listId) {
    const list = await List.find(listId)
    await list.delete()

    // find all words in list and delete them too
    await Word
            .query()
            .where('list_id', listId)
            .delete()
  }
}

module.exports = List
