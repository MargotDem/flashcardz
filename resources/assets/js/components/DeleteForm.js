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
    let { page, id, wordId, folderListState, fetchEntries } = this.props
    page += 's'

    if (wordId) {
      page = 'words'
      id = wordId
    }
    // console.log(id);
    // console.log(folderListState);

    axios.delete('/api/' + page + '/' + id)
    .then(response => {
      if (page === 'folders') {
        window.location = '/#/folders'
      } else if (page === 'lists') {
        window.location = '/#/folder/' + folderListState.folderName
      } else {
        fetchEntries()
      }
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
