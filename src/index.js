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
   
    type Ambiente{
      id: ID!
      nome: String!
    }

    type Usuario{
      id: ID!
      nome: String!
      senha: String!
    }

    type Participacao{
      id: ID!
      usuario: Usuario!
      ambiente: Ambiente!
      entrada: String!
    }
    
    type Query {
      hello: String!
      ambientes: [Ambiente!]!
      existe(nome: String!, senha: String!): Usuario
      usuariosNoAmbiente(ambiente: ID!): [Usuario!]!
    }

    type Mutation{
      registrarParticipacao(participacao: ParticipacaoInput!): Participacao!
    }

    input ParticipacaoInput{
      usuario: ID!
      ambiente: ID!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello, GraphQL',
      ambientes: () => ambientes,
      existe: (parent, args, context, info) => {
        const { nome, senha } = args
        return usuarios.find(usuario => usuario.nome === nome && usuario.senha === senha)
      },
      usuariosNoAmbiente: (parent, args, context, info) => {
        const { ambiente } = args
        const idsUsuarios = participacoes.filter(p => p.ambiente === ambiente).map(p => p.usuario)
        return usuarios.filter(u => idsUsuarios.includes(u.id))
      }
    },
    Mutation: {
      registrarParticipacao: (parent, args, context, info) => {
        const { participacao } = args
        const { usuario, ambiente } = participacao
        const p = {
          id: Math.random().toString(36).substring(2, 9),
          usuario,
          ambiente,
          entrada: new Date().toISOString()
        }
        participacoes.push(p)
        return p
      }
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




