import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectsController {
  public async index({ view }: HttpContextContract) {
    const data = {
      title: 'TR-808 Drum Machine Emulator',
      subtitle: 'An exercise in state management, precision timing and audio manipulation.'
    }
    return view.render('projects/808/index', {data})
  }

  public async getAudioContext({ view }: HttpContextContract) {
    const data = {
      title: 'HTML5 Audio Context',
      subtitle: 'Exploring the Web Audio API and the Audio Context object.'
    }
    return view.render('projects/audioContext/index', {data})
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
