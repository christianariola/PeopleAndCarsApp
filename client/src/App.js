import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/layout/Header";
import Main from "./components/pages/Main";
import Subpage from "./components/pages/Subpage";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div className="App">
						<Header />
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="person/:id" element={<Subpage />} />
						</Routes>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		</>
	);
};

export default App;
