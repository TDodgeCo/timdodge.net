import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fact from 'App/Models/Fact'

export default class HomepagesController {
    public async index({ view }: HttpContextContract) {
        const factLimiter = (await Fact.all()).length
        
        let factId = Math.ceil(factLimiter)
        const fact = await Fact.find(factId)
        return view.render('staticPages/home/home', {fact})
    }
}
