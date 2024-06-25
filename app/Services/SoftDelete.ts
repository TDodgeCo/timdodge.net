import { LucidRow, ModelQueryBuilderContract, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

// Optional null check query
export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
    query.whereNull('deleted_at')  
}


export const softDelete = async (row: LucidRow, column: string = 'deletedAt') => {
  console.log('softDelete')
  row[column] = DateTime.local()
  await row.save()
}