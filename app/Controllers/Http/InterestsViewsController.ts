import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InterestsViewsController {
    public async index({ view }: HttpContextContract) {
        return view.render('staticPages/interests/interestsIndex')
    }
    public async codeIndex({ view }: HttpContextContract) {
        return view.render('staticPages/interests/interestsCodeIndex', {
            data:
            {   
                topic: 'code',
                title: 'Code and Software Development',
                subtitle: 'Thoughts, experiments, and general lunacy.'
            }
        })
    }
    public async musicIndex({ view }: HttpContextContract) {
        return view.render('staticPages/interests/interestsDrilledIndex', {
            data:
            {
                topic: 'music',
                title: 'Music and Music Production',
                subtitle: `Musings, sounds, project files, and general discussion.`
            }
        })
    }
    public async gamesIndex({ view }: HttpContextContract) {
        return view.render('staticPages/interests/interestsDrilledIndex', {
            data:
            {
                topic: 'video-games',
                title: 'Video Games',
                subtitle: 'Rants and resources. I like to build tools for the video games I play.'
            }
        })
    }
    public async entrepreneurshipIndex({ view }: HttpContextContract) {
        return view.render('staticPages/interests/interestsDrilledIndex', {
            data:
            {
                topic: 'entrepreneurship',
                title: 'Entrepreneurship',
                subtitle: 'The not so subtle art of never settling.'
            }
        })
    }
}
