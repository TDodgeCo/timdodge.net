import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class extends BaseSeeder {

  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        name: 'Tim',
        email: 'timldodge@gmail.com',
        password: Env.get('SEED_PASSWORD'),
        roleId: 5
      }
    ])

  }
}
