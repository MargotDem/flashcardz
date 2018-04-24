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

Route.resource('api/lists', 'ListController')
  .apiOnly()

Route.resource('api/words', 'WordController')
  .apiOnly()

Route.post('api/user/login', 'UserController.login')

Route.post('api/user/logout', 'UserController.logout')

Route.post('api/user/register', 'UserController.register')

Route.get('api/user/check', 'UserController.check')

// Route.get('api/users', async ({ response }) => {
//   // const users = await User.all()
//   // response.send('hey')
// })

// Route.group(() => {
//   Route.resource('folders', 'FolderController').apiOnly()
//   Route.resource('lists', 'ListsController').apiOnly()
//   Route.resource('words', 'WordsController').apiOnly()
// })
// .prefix('api/')
// .apiOnly()

Route.on('/').render('app')
