import React, { Component } from 'react'
import axios from 'axios'

export default class MenuButton extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      showMenu: false
    })
    this.handleMouseHovering = this.handleMouseHovering.bind(this)
  }

  handleMouseHovering (state) {
    let showMenu = state === 'over'
    this.setState({
      showMenu: showMenu
    })
  }

  logout () {
    axios.post('/api/user/logout')
    .then(response => {
      console.log(response)
      window.location.reload()
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    let { showMenu } = this.state
    return (
      <div
        className='Menu'
        id='Menu'
        onMouseOver={() => { this.handleMouseHovering('over') }}
        onMouseOut={() => { this.handleMouseHovering('out') }}
      >
        <div>
          <span>
            <img className='Menu-icon' src='/icon.png' />
          </span>
        </div>
        <div
          className={'Menu-dropdown ' + (showMenu ? 'Menu-dropdown_show' : '')}
          onClick={this.logout.bind(this)}
        >
          log out
        </div>
      </div>
    )
  }
}
