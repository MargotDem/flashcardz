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

    let { folderId } = this.props.folderListState
    let pathname = this.props.location.pathname
    let name = pathname.substring(8).split('-').join(' ')

    axios.get('http://localhost:3334/api/lists', {
      params: {
        folderId: folderId
      }
    })
    .then(response => {
      this.setState({
        entries: response.data,
        name: name,
        id: folderId
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    let { name, id, entries } = this.state
    let { changeFolderListState } = this.props
    return (
      <PageLayout
        backButton
        editDeleteButtons
        page={'folder'}
        type={'list'}
        title={'folder: ' + name}
        id={id}
        entries={entries}
        changeFolderListState={changeFolderListState}
      />
    )
  }
}
