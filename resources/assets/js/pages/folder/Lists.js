import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

import PageLayout from '../../components/PageLayout'

class Lists extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      entries: [],
      folderName: ''
    })
  }

  componentDidMount () {
    this.setState({
      entries: [
        { id: 1, name: 'list1' },
        { id: 2, name: 'fakelist 2' },
        { id: 3, name: 'fakelist with spaces' }
      ],
      folderName: 'some folder name'
    })
  }

  render () {
    const { cookies } = this.props
    let user = cookies.get('user')
    if (user) {
      return (
        <PageLayout
          backButton
          editDeleteButtons
          type={'list'}
          title={'folder: ' + this.state.folderName}
          entries={this.state.entries}
        />
      )
    } else {
      window.location = ''
    }
  }
}

export default withCookies(Lists)
