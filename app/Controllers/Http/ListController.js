'use strict'

const List = use('App/Models/List')
const { validate } = use('Validator')

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
      await List.destroy(id)
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
      const list = await List.find(id)
      list.name = name
      await list.save()
    } catch (error) {
      return error
    }
  }
}

module.exports = ListController
