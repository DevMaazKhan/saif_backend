import envSchema from 'env-schema';
import zod from 'zod';

const schema = zod.object({
  PORT: zod.number().default(4000),
  ENV: zod.enum(['development', 'production']).default('development'),
  DATABASE_URL: zod.string(),
});

type Env = zod.infer<typeof schema>;

const config = envSchema<Env>({
  schema: {
    type: 'object',
    required: [],
    properties: {
      PORT: {
        type: 'number',
        default: 4000,
      },
      ENV: {
        type: 'string',
        default: 'development',
        enum: ['production', 'development'],
      },
      DATABASE_URL: {
        type: 'string',
      },
    },
  },
  dotenv: true,
});

export default config;
