import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Fact from 'App/Models/Fact'

export default class extends BaseSeeder {
  public async run () {
    const uniqueKey = 'body'

    await Fact.updateOrCreateMany(uniqueKey, [
      {
        userId: 1,
        relatedFeature: 'Marketing',
        body: `This website doesn't use any third party analytics software. I'm collecting plenty of data, I'm just not sharing it. If those nerds want data they should build their own super sweet website.`
      },
      {
        userId: 1,
        relatedFeature: 'Design & UI/UX',
        body: `I spent way more time playing around with different color options for my SVG's than actually building anything useful.`
      }
    ])
  }
}
