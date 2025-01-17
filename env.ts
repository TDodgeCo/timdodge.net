/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
	HOST: Env.schema.string({ format: 'host' }),
	DOMAIN: Env.schema.string(),
	PORT: Env.schema.number(),
	SITE_NAME: Env.schema.string(),
	APP_KEY: Env.schema.string(),
	APP_NAME: Env.schema.string(),
	CACHE_VIEWS: Env.schema.boolean(),
	SESSION_DRIVER: Env.schema.string(),
	DRIVE_DISK: Env.schema.enum(['local'] as const),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
	SEED_PASSWORD: Env.schema.string(),
	PG_HOST: Env.schema.string({ format: 'host' }),
	PG_PORT: Env.schema.number(),
	PG_USER: Env.schema.string(),
	PG_PASSWORD: Env.schema.string.optional(),
	PG_DB_NAME: Env.schema.string(),
	SPOTIFY_CLIENT_ID: Env.schema.string(),
	SPOTIFY_CLIENT_SECRET: Env.schema.string(),
	GITHUB_CLIENT_ID: Env.schema.string(),
	GITHUB_CLIENT_SECRET: Env.schema.string(),
	TWITTER_CLIENT_ID: Env.schema.string(),
	TWITTER_CLIENT_SECRET: Env.schema.string(),
	GOOGLE_CLIENT_ID: Env.schema.string(),
	GOOGLE_CLIENT_SECRET: Env.schema.string(),
	DISCORD_CLIENT_ID: Env.schema.string(),
	DISCORD_CLIENT_SECRET: Env.schema.string(),
})
