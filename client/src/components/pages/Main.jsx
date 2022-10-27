import Title from "../layout/Title"
import AddPerson from "../forms/AddPerson";
import PeopleList from "../lists/PeopleList";
import AddCar from "../forms/AddCar";

const Main = () => {
	return (
		<>
			<Title headingLevel={2} type="subheading" text="Add Person" />
			<AddPerson />

			<Title headingLevel={2} type="subheading" text="Add Car" />
			<AddCar />

			<Title headingLevel={2} type="subheading" text="Records" />
			<PeopleList />
		</>
	);
};

export default Main;
