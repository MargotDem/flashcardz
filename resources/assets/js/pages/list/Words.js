import React, { Component } from 'react'
import axios from 'axios'

import PageLayout from '../../components/PageLayout'
import { authCheck } from '../../lib/authCheck'

export default class Words extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: [],
      folderName: ''
    })
  }

  componentDidMount () {
    authCheck(false)

    let pathname = this.props.location.pathname
    let listId = pathname.substring(pathname.lastIndexOf('/') + 1)
    let fullTitle = pathname.substring(pathname.indexOf('folder/') + 7)
    let name = fullTitle.substring(0, fullTitle.lastIndexOf('/')).split('-').join(' ')

    axios.get('http://localhost:3334/api/words', {
      params: {
        listId: listId
      }
    })
    .then(response => {
      this.setState({
        entries: response.data,
        name: name
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    return (
      <PageLayout
        backButton
        editDeleteButtons
        learnModeButton
        page={'list'}
        type={'word'}
        title={'list: ' + this.state.name}
        entries={this.state.entries}
      />
    )
  }
}
