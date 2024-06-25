import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fact from 'App/Models/Fact'

export default class DashboardViewsController {
    public async index({ view }: HttpContextContract) {
        const facts = await Fact.all()
        return view.render('dashboard/index', {facts})
    }
    public async posts({ view }: HttpContextContract) {
        return view.render('dashboard/pages/posts/dashboardPosts')
    }
}
