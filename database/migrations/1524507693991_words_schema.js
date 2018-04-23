'use strict'

const Schema = use('Schema')

class WordsSchema extends Schema {
  up () {
    this.create('words', (table) => {
      table.increments()
      table.integer('list_id')
      table.string('word', 80)
      table.string('translation', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('words')
  }
}

module.exports = WordsSchema
