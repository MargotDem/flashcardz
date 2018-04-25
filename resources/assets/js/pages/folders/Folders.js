import React, { Component } from 'react'
import axios from 'axios'

import PageLayout from '../../components/PageLayout'
import { authCheck } from '../../lib/authCheck'

export default class Folders extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: []
    })
    this.fetchEntries = this.fetchEntries.bind(this)
  }

  componentDidMount () {
    authCheck(false)
    this.fetchEntries()
  }

  fetchEntries () {
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
    let { changeFolderListState } = this.props
    let { entries } = this.state
    return (
      <PageLayout
        title={'folders'}
        entries={entries}
        fetchEntries={this.fetchEntries}
        changeFolderListState={changeFolderListState}
        type={'folder'}
      />
    )
  }
}
