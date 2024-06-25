import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.string('title', 100).notNullable()
      table.string('slug', 255).unique().notNullable()
      table.integer('state_id').unsigned().notNullable()
      table.integer('topic_id').unsigned().notNullable().references('topics.id')
      table.string('page_title', 100).nullable()
      table.text('description').nullable()
      table.text('meta_description').nullable()
      table.string('canonical', 255).nullable()
      table.text('body').nullable()
      table.text('project_blocks').nullable()
      table.string('image_url', 255).nullable()
      table.string('video_url', 255).nullable()
      table.boolean('is_featured').nullable().defaultTo(false);
      table.boolean('is_personal').nullable().defaultTo(false);
      table.integer('view_count').nullable().defaultTo(0)
      table.integer('view_count_unique').nullable().defaultTo(0)
      table.string('redirect_url', 255).nullable()
      table.string('repository_url', 255).nullable()
      table.string('timezone', 50).nullable()
      table.string('publish_at_user').nullable()
      table.timestamp('publish_at').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
