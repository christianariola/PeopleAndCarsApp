import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";
import Title from "./components/layout/Title";
import AddPerson from "./components/forms/AddPerson";
import PeopleList from "./components/lists/PeopleList";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<>
			<ApolloProvider client={client}>
				<div className="App">
					<Title
						headingLevel={1}
						type="heading"
						text="People and their Cars"
					/>
					<Title
						headingLevel={2}
						type="subheading"
						text="Add Person"
					/>
					<AddPerson />

					<Title headingLevel={2} type="subheading" text="Records" />
					<PeopleList />
				</div>
			</ApolloProvider>
		</>
	);
};

export default App;
