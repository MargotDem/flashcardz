import React, { Component } from 'react'

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
    window.location.reload()
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
          <input
            type='text'
            name='name'
            placeholder='Name'
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <a onClick={() => { this.handleSubmit() }}>add</a>
          <a onClick={() => { this.handleClick() }}>&times;</a>
        </form>
      </div>
    )
  }
}
