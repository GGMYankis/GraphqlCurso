const { gql, ApolloServer } = require("apollo-server");
const axios = require("axios");
const persona = [
  {
    name: "juan",
    city: "Santo Domingo",
    id: 1,
  },
  {
    name: "Yankis",
    phone: "8093042786",
    city: "Santo norte",
    id: 2,
    apellido: "henrrique",
  },
  {
    name: "Anilson",
    phone: "8093042786",
    city: "Santo este",
    id: 3,
    apellido: "gomez",
  },
];

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type User {
    userId: String
    id: String
    title: String
    body: String
  }

  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
    apellido: String
  }

  type Query {
    personCount: Int!
    allPerson: [Person]
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String
      city: String!
    ): Person

    editNumber(name: String!, phone: String!): Person
  }
`;

const resolvers = {
  Query: {
    allPerson: async (root, args) => {
      return persona;
    },
    personCount: () => persona.length,

    findPerson: (root, args) => {
      const { name } = args;

      return persona.find((person) => person.name == name);
    },
  },

  Mutation: {
    addPerson: (root, args) => {
      const personas = { ...args, id: 2 };

      const existe = persona.find((per) => per.name == args.name);

      if (existe) {
        console.log("ya existe un usuario con ese nombre");
      }

      persona.push(persona);
      return personas;
    },
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(url);
});
