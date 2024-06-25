import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { marked } from 'marked'
import Post from 'App/Models/Post'
// import { TopicsDesc } from 'App/Enums/Topics'
// import Tag from 'App/Models/Tag'


export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post.all()
    return response.send(posts)
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, bouncer, auth }: HttpContextContract) {
    await bouncer.with('PostPolicy').authorize('create')
    const req = request.except(['_csrf'])
    const html = marked.parse(req.body)

    const post = await Post.firstOrCreate({
      title: req.title,
      body: html,
      projectBlocks: req.bodyBlocks || [{entryPointScript: req.projectBlocksEntryScript, path: req.projectBlocksPath}],
      stateId: req.stateId,
      description: req.description,
      imageUrl: req.imageUrl || '',
      videoUrl: req.videoUrl || '',
      userId: auth.user?.id,
      repositoryUrl: req.repositoryUrl || '',
      topicId: req.topicId
    })
     
    await post.save()
    const topic = await post.related('topic').query().first()

    return response.redirect().toRoute('posts.topic.show', { topic: topic?.name.toLowerCase(), slug: post.slug })

  }

  public async show({ view, request, response }: HttpContextContract) {
    if (!request.param('topic')) {

      const post = await Post
        .query()
        .where('slug', request.param('id'))
        .preload('topic')
        .firstOrFail()
      
      return response.redirect().toRoute('posts.topic.show', { topic: post?.topic.name.toLowerCase(), slug: post?.slug })
    }

    const post = await Post.findBy('slug', request.param('slug'))

   
    return view.render('posts/post', { post })
    

    
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
