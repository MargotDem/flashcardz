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
}

module.exports = FolderController
