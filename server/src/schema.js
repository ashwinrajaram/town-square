import { gql } from 'apollo-server';
import postTypeDefs from './types/post.js';

// Combine all type definitions
const typeDefs = gql`
  ${postTypeDefs}

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default typeDefs;