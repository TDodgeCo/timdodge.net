import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Topics from 'App/Enums/Topics'

export default class extends BaseSchema {
  protected tableName = 'topics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.string('slug', 75).unique().nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: Topics.CODE,
          name: 'Code'
        },
        {
          id: Topics.MUSIC,
          name: 'Music'
        },
        {
          id: Topics.VIDEOGAMES,
          name: 'Video Games'
        },
        {
          id: Topics.ENTREPRENEURSHIP,
          name: 'Entrepreneurship'
        }
      ])
    })
  }

  

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
