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
        year: Int!
        make: String!
        model: String!
        price: Float!
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

        addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
        removeCar(id: String!): Car
        updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
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
        // People
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

        // Cars
        removeCar: (root, args) => {
            const car = find(cars, { id: args.id })
            cars.splice(cars.indexOf(car), 1);
            return car;
        },
        addCar: (root, args) => {
            const newCar = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId
            };

            cars.push(newCar);
            return newCar;
        },
        updateCar: (root, args) => {
            const car = find(cars, { id: args.id })
            car.year = args.year;
            car.make = args.make;
            car.model = args.model;
            car.price = args.price;
            car.personId = args.personId;
            return car;
        },

    }
};

export { typeDefs, resolvers };
