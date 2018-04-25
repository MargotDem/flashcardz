import React, { Component } from 'react'
import axios from 'axios'

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
      console.log(response);
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
    let { wordId } = this.props
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
              name='name'
              placeholder='Name'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          }
          {
            wordId && <input
              type='text'
              name='word'
              placeholder='Word'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          }
          {
            wordId && <input
              type='text'
              name='translation'
              placeholder='Translation'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          }
          <a onClick={() => { this.handleSubmit() }}>let’s edit it</a>
          <a onClick={() => { this.handleClick() }}>nevermind</a>
        </form>
      </span>
    )
  }
}
