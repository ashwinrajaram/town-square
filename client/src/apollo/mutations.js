import { gql } from '@apollo/client';

export const UPDATE_POST_ORDERS = gql`
  mutation UpdatePostOrders($postOrders: [PostOrderInput!]!) {
    updatePostOrders(postOrders: $postOrders) {
      id
      order
    }
  }
`;