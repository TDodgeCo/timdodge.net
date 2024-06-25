import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomepageController.index').as('home')

Route.group(() => {
  Route.get('/', 'DashboardViewsController.index').as('dashboard')
  Route.get('/posts', 'DashboardViewsController.posts').as('dashboard.posts')
}).prefix('/dashboard').middleware('auth')

Route.group(() => {
  Route.get('/', 'InterestsViewsController.index').as('interests.index')
  Route.get('/code', 'InterestsViewsController.codeIndex').as('interests.code')
  Route.get('/code/js808', 'ProjectsController.index').as('projects.js808')
  Route.get('/code/html5-audio-context', 'ProjectsController.getAudioContext').as('projects.audioContext')
  Route.get('/music', 'InterestsViewsController.musicIndex').as('interests.music')
  Route.get('/video-games', 'InterestsViewsController.gamesIndex').as('interests.video-games')
  Route.get('/entrepreneurship', 'InterestsViewsController.entrepreneurshipIndex').as('interests.entrepreneurship')
}).prefix('/interests')


Route.group(() => {
  Route.get('/', 'FactsController.index').as('facts.index')
  Route.post('/', 'FactsController.store').as('facts.store')
  Route.post('/:id', 'FactsController.destroy').as('facts.destroy')
  Route.get('/get/deleted', 'FactsController.getDeleted').as('facts.deleted')
}).prefix('/facts')

Route.resource('/posts', 'PostsController')

Route.get('/topics/:topic/:slug', 'PostsController.show').as('posts.topic.show')

Route.group(() => {
  Route.get('/', 'ProjectsController.index').as('projects.index')
}).prefix('/projects')

Route.group(() => {
  Route.group(() => {
    Route.get('register', 'RegisterController.create').as('auth.register.show')
    Route.post('register', 'RegisterController.store').as('auth.register.store')

    Route.get('verification/new', 'EmailVerificationController.create')
    Route.post('verification', 'EmailVerificationController.store')
    Route.get('verification/:email', 'EmailVerificationController.verify').as('verification.verify')

    Route.get('login', 'AuthController.create').as('auth.login.show')
    Route.post('login', 'AuthController.store').as('auth.login.store')

    Route.get('forgot-password', 'PasswordResetRequestController.create')
    Route.post('forgot-password', 'PasswordResetRequestController.store')

    Route.get('reset-password/:token', 'PasswordResetController.create')
    Route.post('reset-password', 'PasswordResetController.store')
  }).middleware('guest')

  Route.group(() => {
    Route.get('confirm-password', 'ConfirmPasswordController.create')
    Route.post('confirm-password', 'ConfirmPasswordController.store')
    Route.post('logout', 'AuthController.destroy')
  }).middleware('auth')
}).namespace('App/Controllers/Http/Auth')
