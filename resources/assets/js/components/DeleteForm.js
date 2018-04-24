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
    // yay unreadable code
    let { page, wordId } = this.props
    page += 's'

    let id = wordId || window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    if (wordId) {
      page = 'words'
    }

    axios.delete('http://localhost:3334/api/' + page + '/' + id)
    .then(response => {
      window.location = '/#/folders'
      console.log(response)
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
    let { showForm } = this.state
    return (
      <span>
        <a onClick={() => { this.handleClick() }}>
          delete
        </a>
        <form className={'DeleteForm CrudForm ' + (showForm && 'CrudForm_show')}>
          <a onClick={() => { this.handleSubmit() }}>yes, delete it</a>
          <a onClick={() => { this.handleClick() }}>no, don’t</a>
        </form>
      </span>
    )
  }
}
