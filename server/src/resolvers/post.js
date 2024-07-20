// const { generateMockPosts } = require("../../../client/src/utils/mockData");
import { generateMockPosts } from "../../../client/src/utils/mockData.js";

let posts = generateMockPosts(10);
console.log(posts);

const postResolvers = {
    Query: {
        posts: () => posts
    },
    Mutation: {
        updatePost: (_, { id, title, order, content }) => {
            const index = posts.findIndex(post => post.id === id);
            if (index === -1) throw new Error('Post not found');

            const updatedPost = {
                ...posts[index],
                title: title || posts[index].title,
                order: order !== undefined ? order : posts[index].order,
                content: content || posts[index].content,
                updatedAt: new Date().toISOString(),
            };
            posts[index] = updatedPost;
            return updatedPost;
        }
    },
};

export default postResolvers;