import { generateMockPosts } from "../../../client/src/utils/mockData.js";



let posts = [{
    id: "aaa",
    title: "First Post",
    order: 1
},
{
    id: "bbb",
    title: "Second Post",
    order: 2

},
{
    id: "ccc",
    title: "Third Post",
    order: 3

},
{
    id: "ddd",
    title: "Fourth Post",
    order: 4

}
] //generateMockPosts(10);

const postResolvers = {
    Query: {
        posts: () => posts
    },
    Mutation: {
        updatePostOrders: (_, { postOrders }) => {

            console.log(postOrders);

            // Presist in DB
            postOrders.forEach(({ id, order }) => {
                console.log(id, order);
                const post = posts.find((post) => post.id === id);

                if (post) {
                    post.order = order;
                }
            });

            posts.sort((a, b) => a.order - b.order);
            return posts;
        }
    },
};

export default postResolvers;