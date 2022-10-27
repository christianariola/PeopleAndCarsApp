import { gql } from "apollo-server-core";
import { people, cars } from "./peopleCarsScheme";

const typeDefs = gql`
	type Person {
		id: ID!
		firstName: String!
		lastName: String!
		cars: [Car]
	}

    type Car {
        id: ID!
        year: String!
        make: String!
        model: String!
        price: String!
        personId: String!
    }

    type Query {
        people: [Person]
        person(id: ID!): Person
        cars: [Car]
        car(id: ID!): Car
    }
`

const resolvers = {
    Query: {
        people: () => people,
        person: (parent, args, context, info) => {
            return people.find(person => person.id === args.id)
        },
        cars: () => cars,
        car: (parent, args, context, info) => {
            return cars.find(car => car.id === args.id)
        }
    }
};

export { typeDefs, resolvers };