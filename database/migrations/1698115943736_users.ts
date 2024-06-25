import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('role_id').unsigned().references('id').inTable('roles').notNullable().defaultTo(1) // 1 = mailing list / 2 = user / 3 = subscriber / 4 = manager / 5 = admin
      table.string('name').notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamp('email_verified_at').nullable()
      table.string('avatar_url')
      table.string('theme')

      table.string('github_id')
      table.string('google_id')
      table.string('twitter_id')
      table.string('dicord_id')
      table.string('twitch_id')
      table.string('soundcloud_id')

      table.string('github_email')
      table.string('google_email')
      table.string('twitter_email')
      table.string('discord_email')
      table.string('twitch_email')
      table.string('soundcloud_email')

      table.string('github_access_token')
      table.string('google_access_token')
      table.string('twitter_access_token')
      table.string('discord_access_token')
      table.string('twitch_access_token')
      table.string('soundcloud_access_token')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
