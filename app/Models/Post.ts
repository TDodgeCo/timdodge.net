import { DateTime } from 'luxon'
import {
  column,
  computed,
  belongsTo,
  BelongsTo,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany, scope
} from '@ioc:Adonis/Lucid/Orm'
import Asset from './Asset'
import PostSnapshot from './PostSnapshot'
import User from './User'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import State from 'App/Enums/States'
import Taxonomy from "App/Models/Taxonomy"
import PostType from 'App/Enums/PostTypes'
import Comment from './Comment'
import AppBaseModel from 'App/Models/AppBaseModel'
import States from 'App/Enums/States'
import Collection from 'App/Models/Collection'
import CollectionTypes from 'App/Enums/CollectionTypes'
import Route from '@ioc:Adonis/Core/Route'
import AssetTypes from 'App/Enums/AssetTypes'
// import { HttpContext } from '@adonisjs/core/build/standalone'
import UtilityService from 'App/Services/UtilityService'
import Topics from 'App/Enums/Topics'
import Topic from './Topic'
import Tag from './Tag'

export default class Post extends AppBaseModel {
  /*
  |--------------------------------------------------------------------------
  | BASIC INFO
  |--------------------------------------------------------------------------
  */

  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title']
  })
  public slug: string

  @column()
  public userId: number

  @column()
  public pageTitle: string | null

  @column()
  public description: string | null

  @column()
  public metaDescription: string | null

  @column()
  public topicId: number

  @column()
  public canonical: string | null

  @column()
  public body: string | null
  // public bodyDisplay: string = ''

  @column()
  public imageUrl: string | null
  
  @column()
  public videoUrl: string | null

  @column()
  public stateId: State

  @column({
    consume: value => {
      if (typeof value === 'string' && value.length > 0) {
        return JSON.parse(value)
      }

      return null
    },
    prepare: value => {
      if (typeof value === 'object' && value != null) {
        return JSON.stringify(value)
      }

      return null
    }
  })
  public projectBlocks: string[]

  @column()
  public bodyTypeId: number

  @column()
  public isFeatured: boolean | null

  @column()
  public isPersonal: boolean | null

  @column()
  public isLive: boolean | null

  @column()
  public wordCount: number

  @column()
  public postTypeId: number

  @column()
  public redirectUrl: string

  @column()
  public repositoryUrl: string

  @column()
  public timezone: string | null

  @column()
  public publishAtUser: string | null

  @column.dateTime()
  public publishAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Asset, {
    pivotTable: 'asset_posts',
    pivotColumns: ['sort_order']
  })
  public assets: ManyToMany<typeof Asset>

  @manyToMany(() => Asset, {
    pivotTable: 'asset_posts',
    pivotColumns: ['sort_order'],
    onQuery: q => q.where('assetTypeId', AssetTypes.THUMBNAIL)
  })
  public thumbnails: ManyToMany<typeof Asset>

  @manyToMany(() => Asset, {
    pivotTable: 'asset_posts',
    pivotColumns: ['sort_order'],
    onQuery: q => q.where('assetTypeId', AssetTypes.COVER)
  })
  public covers: ManyToMany<typeof Asset>

  @hasMany(() => PostSnapshot)
  public snapshots: HasMany<typeof PostSnapshot>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'author_posts',
    pivotColumns: ['author_type_id']
  })
  public authors: ManyToMany<typeof User>

  @manyToMany(() => Taxonomy, {
    pivotTable: 'post_taxonomies',
    pivotColumns: ['sort_order']
  })
  public taxonomies: ManyToMany<typeof Taxonomy>

  @manyToMany(() => Collection, {
    onQuery(query) {
      query.where('collectionTypeId', CollectionTypes.SERIES)
    },
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order']
  })
  public series: ManyToMany<typeof Collection>

  @manyToMany(() => Collection, {
    onQuery(query) {
      query.where('collectionTypeId', CollectionTypes.SERIES)
    },
    pivotRelatedForeignKey: 'root_collection_id',
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order']
  })
  public rootSeries: ManyToMany<typeof Collection>

  @manyToMany(() => Collection, {
    onQuery(query) {
      query.where('collectionTypeId', CollectionTypes.PATH)
    },
    pivotRelatedForeignKey: 'root_collection_id',
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order']
  })
  public rootPaths: ManyToMany<typeof Collection>

  @manyToMany(() => Collection, {
    onQuery(query) {
      query.where('collectionTypeId', CollectionTypes.COURSE)
    },
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order']
  })
  public courses: ManyToMany<typeof Collection>

  @manyToMany(() => Collection, {
    onQuery(query) {
      query.where('collectionTypeId', CollectionTypes.PLAYLIST)
    },
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order']
  })
  public playlists: ManyToMany<typeof Collection>

  @manyToMany(() => Collection, {
    onQuery(query) {
      query.where('collectionTypeId', CollectionTypes.PATH)
    },
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order']
  })
  public paths: ManyToMany<typeof Collection>

  @manyToMany(() => Collection, {
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order']
  })
  public collections: ManyToMany<typeof Collection>

  @computed()
  public get publishAtDateString() {
    let dte = this.publishAt

    if (dte && this.timezone) {
      dte = DateTime.now()
      dte = dte.set(this.publishAt!.toObject()).setZone(this.timezone)
    }

    return dte?.toFormat('yyyy-MM-dd')
  }

  @computed()
  public get publishAtTimeString() {
    let dte = this.publishAt

    if (dte && this.timezone) {
      dte = DateTime.now()
      dte = dte.set(this.publishAt!.toObject()).setZone(this.timezone)
    }

    return dte?.toFormat('HH:mm')
  }

  @computed()
  public get isPublished(): boolean {
    const isPublic = this.stateId === State.PUBLIC

    if (!this.publishAt) {
      return isPublic
    }

    const isPastPublishAt = this.publishAt.diffNow().as('seconds')

    return isPublic && isPastPublishAt < 0
  }

  @computed()
  public get isViewable(): boolean {
    const isPublicOrUnlisted = this.stateId === State.PUBLIC || this.stateId === State.UNLISTED;

    if (!this.publishAt) {
      return isPublicOrUnlisted
    }

    const isPastPublishAt = this.publishAt.diffNow().as('seconds')

    return isPublicOrUnlisted && isPastPublishAt < 0
  }

  @computed()
  public get isNotViewable() {
    return this.stateId !== State.PUBLIC && this.stateId !== State.UNLISTED;
  }


  @computed()
  public get rootSortOrder() {
    if (!this.series || !this.series.length) {
      return undefined
    }

    return this.series[0].$extras.pivot_root_sort_order
  }

  @computed()
  public get timeago() {
    return UtilityService.timeago(this.publishAt)
  }

  @computed()
  public get routeUrl() {
    if (this.redirectUrl) return this.redirectUrl

    let namePrefix = ''
    let params: { collectionSlug?: string, slug: string } = { slug: this.slug }

    if (typeof this.$extras.pivot_sort_order != undefined && (this.rootSeries?.length || this.rootPaths?.length)) {
      const series = this.rootPaths?.length ? this.rootPaths.at(0) : this.rootSeries.at(0)

      switch (series?.collectionTypeId) {
        case CollectionTypes.SERIES:
          namePrefix = 'series.'
          params.collectionSlug = series.slug
          break
        case CollectionTypes.PATH:
          namePrefix = 'paths.'
          params.collectionSlug = series.slug
          break
      }
    }

    switch (this.postTypeId) {
      case PostType.BLOG:
        return Route.makeUrl(`${namePrefix}blog.show`, params)
      case PostType.NEWS:
        return Route.makeUrl(`${namePrefix}news.show`, params)
      case PostType.LIVESTREAM:
        return Route.makeUrl(`${namePrefix}streams.show`, params)
      case PostType.SNIPPET:
        return Route.makeUrl(`${namePrefix}snippets.show`, params)
      // default:
      //   return Route.makeUrl(`${namePrefix}lessons.show`, params)
    }
  }

  @computed()
  public get lessonIndexDisplay() {
    const path = this.rootPaths?.length && this.paths[0]
    const series = this.series?.length && this.series[0]

    if (path) {
      return !path.parentId
        ? `${path.$extras.pivot_sort_order + 1}.0`
        : `${path.sortOrder + 1}.${path.$extras.pivot_sort_order}`
    }

    if (!series) {
      return ''
    }

    if (!series.parentId) {
      return `${series.$extras.pivot_sort_order + 1}.0`
    }

    return `${series.sortOrder + 1}.${series.$extras.pivot_sort_order}`
  }

  public getIndexDisplay(series: Collection | undefined) {
    const postSeries = this.series?.find(s => s.id === series?.id)

    if (!postSeries) return ''

    if (!postSeries.parentId) {
      return `${postSeries.$extras.pivot_sort_order + 1}.0`
    }

    return `${postSeries.sortOrder + 1}.${postSeries.$extras.pivot_sort_order}`
  }

  public static code() {
    return this.query().where('topicId', Topics.CODE)
  }

  public static music() {
    return this.query().where('topicId', Topics.MUSIC)
  }

  public static videoGames() {
    return this.query().where('topicId', Topics.VIDEOGAMES)
  }

  public static entrepreneurship() {
    return this.query().where('topicId', Topics.ENTREPRENEURSHIP)
  }

  @belongsTo(() => Topic)
  public topic: BelongsTo<typeof Topic>

  @manyToMany(() => Tag)
  public tags: ManyToMany<typeof Tag>

  // public static loadForDisplay() {
  //   return this.query().apply(scope => scope.forDisplay())
  // }

  public static published = scope<typeof Post>((query) => {
    query
      .where('stateId', States.PUBLIC)
      .where('publishAt', '<=', DateTime.now().toSQL() as string)
  })

  // public static forDisplay = scope<typeof Post>((query, skipPublishCheck: boolean = false) => {


  //   query
  //     .if(!skipPublishCheck, query => query.apply(scope => scope.published()))
  //     .preload('thumbnails')
  //     .preload('covers')
  //     .preload('taxonomies')
  //     .preload('rootSeries')
  //     .preload('series')
  //     .preload('authors', query => query.preload('profile'))
  // })

  // public static forPathDisplay = scope<typeof Post>((query, skipPublishCheck: boolean = false) => {


  //   query
  //     .if(!skipPublishCheck, query => query.apply(scope => scope.published()))
  //     .preload('thumbnails')
  //     .preload('covers')
  //     .preload('taxonomies')
  //     .preload('rootPaths')
  //     .preload('paths')
  //     .preload('authors', query => query.preload('profile'))
  // })

  // public static forCollectionDisplay = scope<typeof Post>((query, { orderBy, direction }: { orderBy: 'pivot_sort_order' | 'pivot_root_sort_order', direction: 'asc' | 'desc' } = { orderBy: 'pivot_sort_order', direction: 'asc' }) => {
  //   query
  //     .apply(scope => scope.forDisplay())
  //     .orderBy(orderBy, direction)
  // })

  // public static forCollectionPathDisplay = scope<typeof Post>((query, { orderBy, direction }: { orderBy: 'pivot_sort_order' | 'pivot_root_sort_order', direction: 'asc' | 'desc' } = { orderBy: 'pivot_sort_order', direction: 'asc' }) => {
  //   query
  //     .apply(scope => scope.forPathDisplay())
  //     .orderBy(orderBy, direction)
  // })
}
