import { gql } from '@apollo/client';

export const UPDATE_POST_ORDERS = gql`
  mutation UpdatePostOrders($postOrders: [PostOrderInput!]!, $skip: Int, $take: Int) {
    updatePostOrders(postOrders: $postOrders, skip: $skip, take: $take) {
      posts {
        id
        title
        content
        order
      }
      totalCount
    }
  }
`;



// Add other mutations here