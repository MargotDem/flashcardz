'use strict'

class FolderController {
  async index ({ request, auth }) {
    try {
      await auth.check()
      return 'true'
    } catch (error) {
      return 'false'
    }
  }
}

module.exports = FolderController
