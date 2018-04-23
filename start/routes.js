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

Route.resource('api/folders', 'FolderController')
  .apiOnly()

Route.resource('api/lists', 'ListsController')
  .apiOnly()

Route.resource('api/words', 'WordsController')
  .apiOnly()

Route.get('api/users', 'UserController.getUser')

// Route.group(() => {
//   Route.resource('folders', 'FolderController').apiOnly()
//   Route.resource('lists', 'ListsController').apiOnly()
//   Route.resource('words', 'WordsController').apiOnly()
// })
// .prefix('api/')
// .apiOnly()

Route.on('/').render('app')
