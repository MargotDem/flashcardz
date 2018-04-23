import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

import EntryPage from './EntryPage'
import Folders from './Folders'

class LandingPage extends Component {
  render () {
    const { cookies } = this.props
    let user = cookies.get('user')
    if (user) {
      return <Folders />
    } else {
      return <EntryPage />
    }
  }
}

export default withCookies(LandingPage)
