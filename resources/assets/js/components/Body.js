import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LandingPage from '../pages/landingPage/LandingPage'
import Folders from '../pages/folders/Folders'
import Lists from '../pages/folder/Lists'
import Words from '../pages/list/Words'

export default class Body extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      folderId: 6,
      listId: 13
    })
    this.changeFolderListState = this.changeFolderListState.bind(this)
  }

  changeFolderListState (type, id) {
    type += 'Id'
    this.setState({
      [type]: id
    })
  }

  buildRoute (path, isExact, Component, shouldReceiveFolderListState, shouldReceiveChangeFolderListState) {
    let routeObject = {
      'path': path,
      'isExact': isExact,
      'Component': Component,
      'shouldReceiveFolderListState': shouldReceiveFolderListState,
      'shouldReceiveChangeFolderListState': shouldReceiveChangeFolderListState
    }
    return routeObject
  }

  renderRoute (routeObject, index) {
    const Component = routeObject.Component
    let folderListState = (routeObject.shouldReceiveFolderListState ? this.state : false)
    let changeFolderListState = (routeObject.shouldReceiveChangeFolderListState ? this.changeFolderListState : false)
    return (
      <Route
        key={index}
        exact={routeObject.isExact}
        path={routeObject.path}
        render={(props) => <Component {...props} folderListState={folderListState} changeFolderListState={changeFolderListState} />}
      />
    )
  }

  renderRedirect (path, isExact, redirect) {
    return (
      <Route
        exact={isExact}
        path={path}
        render={() => <Redirect to={redirect} />}
      />
    )
  }

  render () {
    const ROUTES = [
      this.buildRoute('/', true, LandingPage, false, false),
      this.buildRoute('/folders', true, Folders, false, true),
      this.buildRoute('/folder/:name', true, Lists, true, true),
      this.buildRoute('/list/:name', true, Words, true, false)
    ]

    return (
      <div>
        <Switch>
          {
            ROUTES.map((item, index) => {
              return (
                this.renderRoute(item, index)
              )
            })
          }
          {this.renderRedirect('/', false, '/')}
        </Switch>
      </div>
    )
  }
}
