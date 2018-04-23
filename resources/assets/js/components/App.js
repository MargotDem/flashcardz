import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import Body from './Body'
import MenuButton from './MenuButton'
import { Scroller } from './scroller'

export default class App extends Component {
  render () {
    return (
      <CookiesProvider>
        <HashRouter>
          <div className='App'>
            <MenuButton />
            <Scroller />
            <Body />
          </div>
        </HashRouter>
      </CookiesProvider>
    )
  }
}
