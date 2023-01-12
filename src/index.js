import { createSchema, createYoga } from "graphql-yoga"
import { createServer } from "node:http"

const usuarios = [
  {
    id: '1',
    nome: 'Fernanda',
    senha: '123456'
  }
]

const ambientes = [
  {
    id: '11',
    nome: 'geral'
  }
]

const mensagens = [
  {
    id: '1001',
    texto: 'Nosso dia',
    usuario: '1',
    ambiente: '11',
    data: '2022-12-18 18:44:00'
  }
]

const participacoes = [
  {
    id: '101',
    usuario: '1',
    ambiente: '11',
    entrada: '2022-12-18 00:00:00',
    saida: null
  }
]


const schema = createSchema({
  typeDefs: `
   
    type Usuario{
      id: ID!
      nome: String!
      senha: String!
      mensagens: [Mensagem!]!
      ambientes: [Ambiente!]!
    }

    type Mensagem{
      id: ID!
      texto: String!
      usuario: Usuario!
      ambiente: Ambiente!
      data: String!
    }

    type Ambiente{
      id: ID!
      nome: String!
      usuarios: [Usuario!]!
      mensagens: [Mensagem!]!
    }



    type Participacao{
      id: ID!
      usuario: Usuario!
      ambiente: Ambiente!
      entrada: String!
    }
    
    type Query {
      hello: String!
    }
    
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello, GraphQL'
      
    }
  }
})

const yoga = createYoga ({
  schema
})

const server = createServer(yoga)

const porta = 4000
server.listen(porta, () => {
  console.info(`Servidor disponível em http://localhost:${porta}`)
})




