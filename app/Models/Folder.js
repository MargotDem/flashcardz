'use strict'

const Model = use('Model')
const List = use('App/Models/List')

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

  static async destroy (folderId) {
    const folder = await Folder.find(folderId)
    await folder.delete()

    // also delete the lists in the folder
    const lists = await List
            .query()
            .where('folder_id', folderId)
    for (let list of lists) {
      await List.destroy(list.id)
    }
  }
}

module.exports = Folder
