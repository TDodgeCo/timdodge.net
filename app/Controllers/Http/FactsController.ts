import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fact from 'App/Models/Fact'

export default class FactsController {
  public async index({ response }: HttpContextContract) {
    console.log('wtf')
    const facts = await Fact.all()
    return response.send(facts)
  }

  public async create({}: HttpContextContract) {}

  
  public async store({ response }: HttpContextContract) {
    console.log('fired')
  
    const body = await Fact.create({
      userId: 1,
      relatedFeature: 'fake',
      body: 'blah blah blah blah blah'
    })

    console.log(body.$isPersisted)

    return response.redirect().back()


  }

  public async show({ params, response }: HttpContextContract) {
    const fact = await Fact.find(params.id)
    return response.send(fact)
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const fact = await Fact.findOrFail(params.id) 
    await fact.delete()

    return response.redirect().back()
  }
}
