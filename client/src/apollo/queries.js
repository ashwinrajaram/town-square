import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      order
      title
    }
  }
`;



// Add other queries here