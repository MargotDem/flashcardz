import React, { Component } from 'react'
import axios from 'axios'

import PageLayout from '../../components/PageLayout'

export default class Lists extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: [],
      folderName: ''
    })
  }

  componentDidMount () {
    axios.get('http://localhost:3334/api/lists')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })

    this.setState({
      entries: [
        { id: 1, name: 'list1' },
        { id: 2, name: 'fakelist 2' },
        { id: 3, name: 'fakelist with spaces' }
      ],
      folderName: 'some folder name'
    })
  }

  render () {
    if (true) {
      return (
        <PageLayout
          backButton
          editDeleteButtons
          type={'list'}
          title={'folder: ' + this.state.folderName}
          entries={this.state.entries}
        />
      )
    } else {
      window.location = ''
    }
  }
}
