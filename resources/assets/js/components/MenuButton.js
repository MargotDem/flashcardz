import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

class MenuButton extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      showMenu: false
    })
    this.handleMouseHovering = this.handleMouseHovering.bind(this)
  }

  handleMouseHovering (state) {
    // let { showMenu } = this.state
    let showMenu = state === 'over'
    ? true
    : false
    this.setState({
      showMenu: showMenu
    })
  }

  logout () {
    let { cookies } = this.props
    cookies.remove('user')
    window.location.reload()
  }

  render () {
    let { cookies } = this.props
    let user = cookies.get('user')
    let { showMenu } = this.state
    if (user) {
      return (
        <div
          className='Menu'
          onMouseOver={() => { this.handleMouseHovering('over') }}
          onMouseOut={() => { this.handleMouseHovering('out') }}
        >
          <div className='Menu-icon'>
            <span>F</span>
          </div>
          <div
            className={'Menu-dropdown ' + (showMenu ? 'Menu-dropdown_show' : '')}
            onClick={this.logout.bind(this)}
          >
            Logout
          </div>
        </div>
      )
    }
    return null
  }
}

export default withCookies(MenuButton)
