'use strict'

const Folder = use('App/Models/Folder')

class FolderController {
  async index ({ request, auth }) {
    try {
      let user = await auth.getUser()
      const folders = await Folder.findAll(user.id)
      return folders
    } catch (error) {
      return 'false'
    }
  }

  async store ({ request, auth }) {
    try {
      let user = await auth.getUser()

      const { name } = request.all()

      const newFolder = new Folder()

      newFolder.name = name
      newFolder.user_id = user.id

      await newFolder.save()
    } catch (error) {
      return 'false'
    }
  }
}

module.exports = FolderController
