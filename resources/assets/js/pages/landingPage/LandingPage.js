import React, { Component } from 'react'
import axios from 'axios'

import EntryPage from './EntryPage'
import Folders from './Folders'

export default class LandingPage extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      logged: false
    })
  }

  componentDidMount () {
    axios.get('http://localhost:3334/api/user/check')
    .then(response => {
      response.data === true
      ? this.setState({ logged: true })
      : this.setState({ logged: false })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    let { logged } = this.state
    if (logged) {
      return <Folders />
    } else {
      return <EntryPage />
    }
  }
}
