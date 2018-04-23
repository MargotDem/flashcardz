import React, { Component } from 'react'
import axios from 'axios'

import PageLayout from '../../components/PageLayout'

export default class Folders extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: []
    })
  }

  componentDidMount () {
    // do display the menu button
    document.getElementById('Menu').style.visibility = 'visible'

    axios.get('http://localhost:3334/api/folders')
    .then(response => {
      this.setState({
        entries: response.data
      })
    })
    .catch(error => {
      console.log(error)
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
