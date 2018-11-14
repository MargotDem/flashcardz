import React, { Component } from 'react'

import { escapeHTML } from '../../lib/escapeHTML'

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
    let { toggleResultIconAndSolution } = this.props
    let value = e.target.value
    this.setState({
      input: value
    })
    toggleResultIconAndSolution()
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSubmit()
    }
  }

  handleSubmit () {
    let { input } = this.state
    let { handleSubmit } = this.props
    handleSubmit(input)
    this.setState({
      input: ''
    })
  }

  // will have to change since this its going to be deprecated in React 17
  componentWillReceiveProps (nextProps) {
    const next = nextProps.clearInput
    const current = this.props.clearInput
    next !== current && this.setState({ input: '' })
  }

  render () {
    let { input } = this.state
    const { clearInput } = this.props
    console.log(clearInput)
    return (
      <form>
        <input
          type='text'
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          value={escapeHTML(input)}
        />
      </form>
    )
  }
}
