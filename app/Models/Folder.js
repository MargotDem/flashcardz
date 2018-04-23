'use strict'

const Model = use('Model')

class Folder extends Model {
  static async findAll (userId) {
    try {
      const folders = await Folder
        .query()
        .where('user_id', userId)
        .fetch()
      return folders
    } catch (error) {
      return 'i dont really know what i am doing'
    }
  }
}

module.exports = Folder
