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

  switchLearnMode () {
    let { isLearningModeOn } = this.state
    this.setState({
      isLearningModeOn: !isLearningModeOn
    })
  }

  render () {
    let { isLearningModeOn, entries, name } = this.state
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
            backButton
            editDeleteButtons
            learnModeButton={learnModeButton}
            switchLearnMode={this.switchLearnMode}
            page={'list'}
            type={'word'}
            title={'list: ' + name}
            entries={entries}
          />
        }
      </div>
    )
  }
}
