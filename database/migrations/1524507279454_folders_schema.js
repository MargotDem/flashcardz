'use strict'

const Schema = use('Schema')

class FoldersSchema extends Schema {
  up () {
    this.create('folders', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('name', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('folders')
  }
}

module.exports = FoldersSchema
