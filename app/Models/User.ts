import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, computed, belongsTo, BelongsTo, beforeSave, BaseModel, hasMany, HasMany, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { search } from 'adosearch'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import gravatar from 'gravatar'
import Post from './Post'
import Profile from './Profile'
import Comment from './Comment'
import Roles from 'App/Enums/Roles'
import Role from './Role'
import Collection from './Collection'
import Themes from 'App/Enums/Themes'
import Fact from './Fact'


import { AutoPreload } from '@ioc:Adonis/Addons/AutoPreload'

export default class User extends compose(BaseModel, AutoPreload) {
  // public static $with = ['myTable'] as const  // https://github.com/Melchyore/adonis-auto-preload
  public static search = search(this, ['name', 'email']) // https://github.com/Obapelumi/adosearch


  /*
  |--------------------------------------------------------------------------
  | BASIC INFO
  |--------------------------------------------------------------------------
  */

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['username']
  })

  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public avatarUrl: string

  @column.dateTime()
  public emailVerifiedAt?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public theme: string = Themes.SYSTEM

  /*
  |--------------------------------------------------------------------------
  | SOCIAL AUTH
  |--------------------------------------------------------------------------
  */

  // GITHUB
  @column()
  public githubId: string
  @column()
  public githubAccessToken: string
  @column()
  public githubEmail: string

  // GOOGLE
  @column()
  public googleAccessToken: string
  @column()
  public googleId: string
  @column()
  public googleEmail: string

  // TWITCH
  @column()
  public twitchId: string
  @column()
  public twitchAccessToken: string
  @column()
  public twitchEmail: string

  // TWITTER
  @column()
  public twitterEmail: string
  @column()
  public twitterId: string
  @column()
  public twitterAccessToken: string
  
  // DISCORD
  @column()
  public discordEmail: string
  @column()
  public discordAccessToken: string
  @column()
  public discordId: string

  // SOUNDCLOUD
  @column()
  public soundcloudId: string
  @column()
  public soundcloudAccessToken: string
  @column()
  public soundcloudEmail: string

  // SPOTIFY
  @column()
  public spotifyId: string
  @column()
  public spotifyEmail: string
  @column()
  public spotifyAccessToken: string


  /*
  |--------------------------------------------------------------------------
  | COMPUTED PROPS
  |--------------------------------------------------------------------------
  */

  @computed()
  public get avatar() {
    if (this.avatarUrl) {
      if (this.avatarUrl.startsWith('https://')) {
        return this.avatarUrl
      }
      
      return `/img/${this.avatarUrl}`
    }

    return gravatar.url(this.email, { s: '60' })
  }

  @computed()
  public get avatarLarge() {
    if (this.avatarUrl) {
      if (this.avatarUrl.startsWith('https://')) {
        return this.avatarUrl
      }
      
      return `/img/${this.avatarUrl}`
    }

    return gravatar.url(this.email, { s: '250' })
  }

  @computed()
  public get isAdmin() {
    return this.roleId === Roles.ADMIN
  }

  /*
  |--------------------------------------------------------------------------
  | RELATIONSHIPS
  |--------------------------------------------------------------------------
  */

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @hasMany(() => Collection, {
    foreignKey: 'ownerId'
  })
  public collections: HasMany<typeof Collection>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => Fact)
  public facts: HasMany<typeof Fact>

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @manyToMany(() => Post, {
    pivotTable: 'author_posts',
    pivotColumns: ['author_type_id']
  })
  public posts: ManyToMany<typeof Post>

 /*
  |--------------------------------------------------------------------------
  | HOOKS
  |--------------------------------------------------------------------------
  */

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
