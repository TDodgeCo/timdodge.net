import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Fact from 'App/Models/Fact'

export default class FactPolicy extends BasePolicy {
	public async create(user: User) {
		return user.isAdmin
	}
	public async update(user: User, fact: Fact) {
		return user.id === fact.userId
	}
	public async delete(user: User, fact: Fact) {
		return user.id === fact.userId
	}
}
