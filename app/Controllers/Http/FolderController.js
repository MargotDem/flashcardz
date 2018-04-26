'use strict'

const Folder = use('App/Models/Folder')
const { validate } = use('Validator')

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

  async store ({ request, auth, session }) {
    const rules = {
      name: 'required|max:80'
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
      await Folder.destroy(id)
    } catch (error) {
      return 'false'
    }
  }

  async update ({ request, auth, session }) {
    const rules = {
      name: 'required|max:80'
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
