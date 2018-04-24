import React, { Component } from 'react'
import axios from 'axios'

import PageLayout from '../../components/PageLayout'
import { authCheck } from '../../lib/authCheck'

export default class Lists extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: [],
      name: ''
    })
  }

  componentDidMount () {
    authCheck(false)

    let pathname = this.props.location.pathname
    let folderId = pathname.substring(pathname.lastIndexOf('/') + 1)
    let fullTitle = pathname.substring(pathname.indexOf('folder/') + 7)
    let name = fullTitle.substring(0, fullTitle.lastIndexOf('/')).split('-').join(' ')

    axios.get('http://localhost:3334/api/lists', {
      params: {
        folderId: folderId
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
        page={'folder'}
        type={'list'}
        title={'folder: ' + this.state.name}
        entries={this.state.entries}
        pathname={this.props.location.pathname}
      />
    )
  }
}
