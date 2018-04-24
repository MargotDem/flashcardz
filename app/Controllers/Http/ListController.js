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
}

module.exports = ListController
