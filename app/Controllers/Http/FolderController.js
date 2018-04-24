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

  async destroy ({ params, auth }) {
    try {
      await auth.check()
      let id = params.id

      const folder = await Folder.find(id)
      await folder.delete()
    } catch (error) {
      return 'false'
    }
  }

  async update ({ request, auth }) {
    try {
      const { name, id } = request.all()
      const folder = await Folder.find(id)
      folder.name = name
      await folder.save()
    } catch (error) {
      return error
    }
  }
}

module.exports = FolderController
