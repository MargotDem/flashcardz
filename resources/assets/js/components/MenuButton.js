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
    axios.post('http://localhost:3334/api/user/logout')
    .then(response => {
      console.log(response)
      window.location.reload()
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount () {
    // do not display the menu button
    if (window.location.href === 'http://localhost:3334/#/' || window.location.href === 'production url') {
      document.getElementById('Menu').style.visibility = 'hidden'
    }
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
}
