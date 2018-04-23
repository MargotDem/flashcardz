'use strict'

const Model = use('Model')

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
}

module.exports = List
