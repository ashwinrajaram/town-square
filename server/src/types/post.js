// const { gql } = require('apollo-server');
import { gql } from 'apollo-server';

const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    order: Int!
    content: String
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    posts: [Post!]!
  }

  extend type Mutation {
    updatePostOrders(postOrders: [PostOrderInput]): [Post!]
  }

  input PostOrderInput {
  id: ID!
  order: Int!
}
`
export default postTypeDefs