'use strict'

const List = use('App/Models/List')

class ListController {
  async index ({ request, auth }) {
    try {
      await auth.check()
      const lists = await List.findAll(request.input('folderId'))
      return lists
    } catch (error) {
      return 'false'
    }
  }

  async store ({ request, auth }) {
    try {
      const { name, id } = request.all()

      const newList = new List()

      newList.name = name
      newList.folder_id = id

      await newList.save()
    } catch (error) {
      return 'false'
    }
  }

  async destroy ({ params, auth }) {
    try {
      await auth.check()
      let id = params.id

      const list = await List.find(id)
      await list.delete()
    } catch (error) {
      return 'false'
    }
  }
}

module.exports = ListController
