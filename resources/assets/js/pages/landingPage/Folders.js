import React, { Component } from 'react'

import PageLayout from '../../components/PageLayout'

export default class Folders extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: []
    })
  }

  componentDidMount () {
    this.setState({
      entries: [
        { id: 1, name: 'fakename1' },
        { id: 2, name: 'fakename 2' },
        { id: 3, name: 'fakename with spaces' }
      ]
    })
  }

  render () {
    return (
      <PageLayout
        type={'folder'}
        title={'folders'}
        entries={this.state.entries}
      />
    )
  }
}
