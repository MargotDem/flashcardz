import React, { Component } from 'react'
import axios from 'axios'

import PageLayout from '../../components/PageLayout'
import LearningModePage from './LearningModePage'
import { authCheck } from '../../lib/authCheck'

export default class Words extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: [],
      name: '',
      isLearningModeOn: false
    })
    this.switchLearnMode = this.switchLearnMode.bind(this)
    this.fetchEntries = this.fetchEntries.bind(this)
  }

  componentDidMount () {
    authCheck(false)

    let { folderListState } = this.props
    let pageHasBeenReloaded = folderListState.listId === 0

    if (pageHasBeenReloaded) {
      window.location = '/#/folders'
    } else {
      this.fetchEntries()
    }
  }

  fetchEntries (newName) {
    let { listId } = this.props.folderListState
    let pathname = this.props.location.pathname
    let name = newName || pathname.substring(6).split('-').join(' ')

    axios.get('/api/words', {
      params: {
        listId: listId
      }
    })
    .then(response => {
      this.setState({
        entries: response.data,
        name: name,
        id: listId
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  switchLearnMode () {
    let { isLearningModeOn } = this.state
    this.setState({
      isLearningModeOn: !isLearningModeOn
    })
  }

  render () {
    let { isLearningModeOn, entries, name, id } = this.state
    let { folderListState } = this.props
    let learnModeButton = true
    if (entries.length === 0) {
      learnModeButton = false
    }
    return (
      <div>
        {
          isLearningModeOn
          ? <LearningModePage
            words={entries}
            switchLearnMode={this.switchLearnMode}
          />
          : <PageLayout
            title={'list: ' + name}
            entries={entries}
            fetchEntries={this.fetchEntries}
            type={'word'}
            page={'list'}
            id={id}
            backButton
            editDeleteButtons
            learnModeButton={learnModeButton}
            switchLearnMode={this.switchLearnMode}
            folderListState={folderListState}
          />
        }
      </div>
    )
  }
}
