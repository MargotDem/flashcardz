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
  }

  componentDidMount () {
    authCheck(false)

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
        type={'folder'}
        title={'folders'}
        entries={entries}
        changeFolderListState={changeFolderListState}
      />
    )
  }
}
