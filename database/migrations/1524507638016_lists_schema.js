'use strict'

const Schema = use('Schema')

class ListsSchema extends Schema {
  up () {
    this.create('lists', (table) => {
      table.increments()
      table.integer('folder_id')
      table.string('name', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('lists')
  }
}

module.exports = ListsSchema
