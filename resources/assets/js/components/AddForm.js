import React, { Component } from 'react'
import axios from 'axios'

import formHandlers from '../lib/formHandlers'

export default class AddForm extends Component {
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
      showForm: !showForm,
      name: '',
      word: '',
      translation: ''
    })
  }

  handleSubmit () {
    let { type, id, fetchEntries } = this.props
    let { name, word, translation } = this.state
    type += 's'

    // this feels really sloppy:
    // when adding a folder: word, translation and id are not filled out
    // when adding a list: word and translation are not here either
    // when adding a word: name isn't here...
    // but hey, javascript doesn't complain, so...
    axios.post('/api/' + type, {
      name: name,
      word: word,
      translation: translation,
      id: id
    })
    .then(response => {
      this.handleClick()
      fetchEntries()
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleInputChange (e) {
    const field = e.target.name
    const value = e.target.value
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
    let { type } = this.props
    let { showForm } = this.state
    return (
      <div>
        <a onClick={() => { this.handleClick() }}>
          add a {type}
        </a>
        <form className={'AddForm CrudForm ' + ((showForm || type === 'word') && 'CrudForm_show')}>
          {
            type !== 'word' && <input
              id='addName'
              type='text'
              name='name'
              placeholder='Name'
              value={this.state.name}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              onMouseOver={() => formHandlers.handleHover('addName')}
            />
          }
          {
            type === 'word' && <input
              id='addWord'
              type='text'
              name='word'
              placeholder='Word'
              value={this.state.word}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              onMouseOver={() => formHandlers.handleHover('addWord')}
            />
          }
          {
            type === 'word' && <input
              id='addTranslation'
              type='text'
              name='translation'
              placeholder='Translation'
              value={this.state.translation}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              onMouseOver={() => formHandlers.handleHover('addTranslation')}
            />
          }

          <a onClick={() => { this.handleSubmit() }}>
            <i className={'fa fa-check'} />
          </a>

          {
            type !== 'word' && <a onClick={() => { this.handleClick() }}>
              <i className={'fa fa-times'} />
            </a>
          }
        </form>
      </div>
    )
  }
}
