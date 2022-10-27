import { gql } from "apollo-server-core";
import { people, cars } from "./peopleCarsScheme";
import { find, remove } from 'lodash'

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

    type Mutation {
        addPerson(firstName: String!, lastName: String!): Person
        addCar(year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    }
`;

const resolvers = {
	Query: {
		people: () => {
			return people.map((person) => {
				person.cars = cars.filter((car) => car.personId === person.id);
                return person
			});
		},
		person: (parent, args, context, info) => {
			const person = people.find((person) => person.id === args.id);

            return {
                ...person,
                cars: cars.filter((car) => car.personId === person.id)
            }
		},
		cars: () => cars,
		car: (parent, args, context, info) => {
            return find(cars, { id: args.id })
		},
	},
    Mutation: {
        addPerson: (parent, args, context, info) => {
            const person = {
                id: people.length + 1,
                firstName: args.firstName,
                lastName: args.lastName
            }
            people.push(person);
            return person;
        }
    }
};

export { typeDefs, resolvers };
