import React, { Component } from 'react'

export default class LearningModeForm extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      input: ''
    })
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleInputChange (e) {
    let value = e.target.value
    this.setState({
      input: value
    })
    this.props.toggleResultIcon()
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSubmit()
    }
  }

  handleSubmit () {
    let { input } = this.state
    this.props.handleSubmit(input)
    this.setState({
      input: ''
    })
  }

  render () {
    let { input } = this.state
    return (
      <form>
        <input
          type='text'
          name='word'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          value={input}
        />
      </form>
    )
  }
}
