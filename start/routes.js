'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.resource('folders', 'FolderController').apiOnly()
  Route.resource('lists', 'ListController').apiOnly()
  Route.resource('words', 'WordController').apiOnly()
})
.prefix('api/')

Route.group(() => {
  Route.post('login', 'UserController.login')
  Route.post('logout', 'UserController.logout')
  Route.post('register', 'UserController.register')
  Route.get('check', 'UserController.check')
})
.prefix('api/user/')

Route.on('/').render('app')
