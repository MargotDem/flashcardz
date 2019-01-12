import React, { Component } from 'react'
import axios from 'axios'

import formHandlers from '../lib/formHandlers'

export default class EditForm extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      showForm: false
    })
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleClick () {
    let { showForm } = this.state
    this.setState({
      showForm: !showForm
    })
  }

  handleSubmit () {
    let { page, id, wordId, fetchEntries } = this.props
    let { name, word, translation } = this.state
    page += 's'

    if (wordId) {
      page = 'words'
      id = wordId
    }

    // wow. so when you edit a word, the name field isnt filled out, so that the name of the list isnt updated...thats really bad code...
    axios.put('/api/' + page + '/' + id, {
      name: name,
      word: word,
      translation: translation,
      id: id
    })
    .then(response => {
      console.log(response)
      this.handleClick()
      fetchEntries(name)
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleInputChange (e) {
    let field = e.target.name
    let value = e.target.value
    this.setState({
      [field]: value
    })
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSubmit()
    }
  }

  render () {
    let { name, wordId, word, translation } = this.props
    // the name in editform doesnt work??
    let { showForm } = this.state
    return (
      <span>
        <a onClick={() => { this.handleClick() }}>
          edit
        </a>
        <form className={'EditForm CrudForm ' + (showForm && 'CrudForm_show')}>
          {
            !wordId && <input
              type='text'
              id='editName'
              name='name'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              onMouseOver={() => formHandlers.handleHover('editName')}
              defaultValue={name}
            />
          }
          {
            wordId && <input
              type='text'
              id={'editWord' + wordId}
              name='word'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              onMouseOver={() => formHandlers.handleHover('editWord' + wordId)}
              defaultValue={word}
            />
          }
          {
            wordId && <input
              type='text'
              id={'editTranslation' + wordId}
              name='translation'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              onMouseOver={() => formHandlers.handleHover('editTranslation' + wordId)}
              defaultValue={translation}
            />
          }
          <a onClick={() => { this.handleSubmit() }}>
            <i className={'fa fa-check'} />
          </a>
          <a onClick={() => { this.handleClick() }}>
            <i className={'fa fa-times'} />
          </a>
        </form>
      </span>
    )
  }
}
