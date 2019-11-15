const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  description: 'Post a new Link using Mutations',
  url: 'www.graphql.com'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => "Welcome to the GraphQL CRUD",
    feed: () => links
  },

  Mutation: {
    postLink: (parent, args) => {
      const newPostLink = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(newPostLink)

      return newPostLink 
    },

    updateLink: (parent, args) => {
      const toUpdateLink = {
        id: args.id,
        description: args.description,
        url: args.url
      }

      for(var i = 0; i < links.length; i++) {
        if(toUpdateLink.id == links[i].id) {
          links[i].description = toUpdateLink.description
          links[i].url = toUpdateLink.url
        }
      }
      return toUpdateLink
    },

    deleteLink: (parent, args) => {
      const toDeleteLink = {
        id: args.id
      }
      for(var i = 0; i < links.length; i++) {
        if(toDeleteLink.id == links[i].id) {
          delete links[i]
        }
      }
      return toDeleteLink
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
});
server.start(() => console.log(`Server is running  on http://localhost:4000`));