import { env } from '@/env'
import { fastifyCors } from '@fastify/cors'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { fastify } from 'fastify'
import { linksRoute } from '../routes/linksRoute'

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

server.register(linksRoute)

server
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🔗 Brevly server running on http://0.0.0.0:${env.PORT}`)
  })
