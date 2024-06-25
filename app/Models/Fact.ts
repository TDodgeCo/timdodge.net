import { DateTime } from 'luxon'
import { BaseModel, column, beforeFind,  beforeFetch, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class Fact extends BaseModel {

  @beforeFind()
  public static softDeletesFind = softDeleteQuery 
    
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery
  

  public async delete(column?: string) {
    await softDelete(this, column)
  }

  @column({ isPrimary: true })
  public id: number
  
  @column()
  public userId: number

  @column()
  public relatedFeature: string | 'N/A'

  @column()
  public body: string

  @column.dateTime({ serializeAs: null})
  public deletedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
