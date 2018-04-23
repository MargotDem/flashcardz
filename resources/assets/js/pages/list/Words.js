import React, { Component } from 'react'
import axios from 'axios'

import PageLayout from '../../components/PageLayout'

export default class Words extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: [],
      folderName: ''
    })
  }

  componentDidMount () {
    axios.get('http://localhost:3334/api/words')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })

    this.setState({
      entries: [
        { id: 1, word: 'word 1', translation: 'translation' },
        { id: 2, word: 'word 2', translation: 'translation' },
        { id: 3, word: 'other word', translation: 'translation' },
        { id: 4, word: 'another word', translation: 'translation' },
        { id: 5, word: 'yet another word', translation: 'translation' }
      ],
      name: 'some list name'
    })
  }

  render () {
    if (true) {
      return (
        <PageLayout
          backButton
          editDeleteButtons
          learnModeButton
          type={'word'}
          title={'list: ' + this.state.name}
          entries={this.state.entries}
        />
      )
    } else {
      window.location = '/'
    }
  }
}
