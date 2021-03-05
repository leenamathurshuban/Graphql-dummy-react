import { IResolvers } from "graphql-tools";
let users = [{
    id: "id-1",
    name: "shreya",
    bio: "software developer"
},
];

let count = users.length;

const resolvers: IResolvers = {
    Query: {
        helloWorld: () => "helo world from apollo server",
    },
    Mutation: {
        addUser: (parent, args) => {
            let user = {
                id: `id-${++count}`,
                name: args.name,
                bio: args.bio,
            };
            users.push(user);
            console.log(users);
            return user;

        },
    }
};


export default resolvers;