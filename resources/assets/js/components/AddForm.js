import React, { Component } from 'react'
import axios from 'axios'

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
      showForm: !showForm
    })
  }

  handleSubmit () {
    let { type } = this.props
    let { name, word, translation } = this.state
    type += 's'

    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

    axios.post('http://localhost:3334/api/' + type, {
      name: name,
      word: word,
      translation: translation,
      id: id
    })
    .then(response => {
      window.location.reload()
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
    let { type } = this.props
    let { showForm } = this.state
    return (
      <div>
        <a onClick={() => { this.handleClick() }}>
          add a {type}
        </a>
        <form className={'AddForm CrudForm ' + (showForm && 'CrudForm_show')}>
          {
            type !== 'word' && <input
              type='text'
              name='name'
              placeholder='Name'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          }
          {
            type === 'word' && <input
              type='text'
              name='word'
              placeholder='Word'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          }
          {
            type === 'word' && <input
              type='text'
              name='translation'
              placeholder='Translation'
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          }
          <a onClick={() => { this.handleSubmit() }}>add</a>
          <a onClick={() => { this.handleClick() }}>&times;</a>
        </form>
      </div>
    )
  }
}
