import { gql } from "apollo-server-core";
import { people, cars } from "./peopleCarsScheme";
import { find, remove } from 'lodash'

const typeDefs = gql`
	type Person {
		id: String!
		firstName: String!
		lastName: String!
		cars: [Car]
	}

	type Car {
		id: String!
		year: String!
		make: String!
		model: String!
		price: String!
		personId: String!
	}

	type Query {
		people: [Person]
		person(id: String!): Person
		cars: [Car]
		car(id: ID!): Car
	}

    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): Person
        removePerson(id: String!): Person
        updatePerson(id: String!, firstName: String!, lastName: String!): Person
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
            const person = find(people, { id: args.id })

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
        addPerson: (root, args) => {
            const newPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName,
                cars: []
            }
            people.push(newPerson);
            return newPerson;
        },
        removePerson: (root, args) => {
            const person = find(people, { id: args.id })
            people.splice(people.indexOf(person), 1);
            // cars = cars.filter(car => car.personId !== person.id);
            return person;
        },
        updatePerson: (root, args) => {
            const person = find(people, { id: args.id })
            person.firstName = args.firstName;
            person.lastName = args.lastName;
            return person;
        },
    }
};

export { typeDefs, resolvers };
