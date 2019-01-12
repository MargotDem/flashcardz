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
    this.fetchEntries = this.fetchEntries.bind(this)
  }

  componentDidMount () {
    authCheck(false)

    let { folderListState } = this.props
    let pageHasBeenReloaded = folderListState.folderId === 0

    if (pageHasBeenReloaded) {
      window.location = '/#/folders'
    } else {
      this.fetchEntries()
    }
  }

  fetchEntries (newName) {
    let { folderId } = this.props.folderListState
    let pathname = this.props.location.pathname
    let name = newName || pathname.substring(8).split('-').join(' ')

    axios.get('/api/lists', {
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
    let { changeFolderListState, folderListState } = this.props
    return (
      <PageLayout
        title={'folder: ' + name}
        name={name}
        entries={entries}
        fetchEntries={this.fetchEntries}
        changeFolderListState={changeFolderListState}
        folderListState={folderListState}
        type={'list'}
        page={'folder'}
        id={id}
        backButton
        editDeleteButtons
      />
    )
  }
}
