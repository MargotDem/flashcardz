import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LandingPage from '../pages/landingPage/LandingPage'
import Folder from '../pages/folder/Folder'
import List from '../pages/list/List'

export default class Body extends Component {
  buildRoute (path, isExact, Component) {
    let routeObject = {
      'path': path,
      'isExact': isExact,
      'Component': Component
    }
    return routeObject
  }

  renderRoute (routeObject, index) {
    const Component = routeObject.Component
    return (
      <Route
        key={index}
        exact={routeObject.isExact}
        path={routeObject.path}
        render={(props) => <Component {...props} />}
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
      this.buildRoute('/', true, LandingPage),
      this.buildRoute('/folder/:name', true, Folder),
      this.buildRoute('/list/:name', true, List)
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