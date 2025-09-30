import { env } from '@/env'
import { fastifyCors } from '@fastify/cors'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { linksRoute } from '@/infra/http/routes/links'
import { exportLinksRoute } from '@/infra/http/routes/export-links'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)

  reply.status(500).send({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred.',
  })
})

server.register(fastifyCors, {
  origin: '*',
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brevly API',
      description: 'API to manage URL shortening',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(linksRoute)
server.register(exportLinksRoute)

server
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🔗 Brevly server running on http://0.0.0.0:${env.PORT}`)
  })
