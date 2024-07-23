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



   type PaginatedPosts {
    posts: [Post!]!
    totalCount: Int!
  }

  extend type Query {
    posts(skip: Int, take: Int): PaginatedPosts!
  }

  extend type Mutation {
  updatePostOrders(postOrders: [PostOrderInput!]!, skip: Int, take: Int): PaginatedPosts!
  }


  input PostOrderInput {
  id: ID!
  order: Int!
}
`
export default postTypeDefs