import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

import PageLayout from '../../components/PageLayout'

class Words extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: [],
      folderName: ''
    })
  }

  componentDidMount () {
    this.setState({
      entries: [
        { id: 1, word: 'word 1', translation: 'translation' },
        { id: 2, word: 'word 2', translation: 'translation' },
        { id: 3, word: 'other word', translation: 'translation' },
        { id: 4, word: 'another word', translation: 'translation' },
        { id: 5, word: 'yet another word', translation: 'translation' }
      ],
      folderName: 'some list name'
    })
  }

  render () {
    const { cookies } = this.props
    let user = cookies.get('user')
    if (user) {
      return (
        <PageLayout
          backButton
          editDeleteButtons
          learnModeButton
          type={'word'}
          title={'list: ' + this.state.folderName}
          entries={this.state.entries}
        />
      )
    } else {
      window.location = '/'
    }
  }
}

export default withCookies(Words)
