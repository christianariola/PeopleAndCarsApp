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
        person: Person
    }

    type Query {
        people: [Person]
        cars: [Car]
    }
`;

const resolvers = {
    Query: {
        people: () => people,
        cars: () => cars
    }
};

export { typeDefs, resolvers };