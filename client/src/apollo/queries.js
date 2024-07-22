import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query GetPosts($skip: Int, $take: Int) {
        posts(skip: $skip, take: $take) {
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



// Add other queries here