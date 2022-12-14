import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import Cars from "./Cars";
import { Link } from "react-router-dom";

const getStyles = () => ({
	card: {
		width: '1000px',
	},
	more: {
		marginTop: '20px',
	}
});

const Person = (props) => {
	const { id, firstName, lastName, cars } = props;
	const styles = getStyles();

	const [editMode, setEditMode] = useState(false);

	const handleButtonClick = () => {
		setEditMode(!editMode);
	};
	return (
		<>
			{editMode ? (
				<UpdatePerson id={id} firstName={firstName} lastName={lastName} onButtonClick={handleButtonClick} />
			) : (
				<Card
					style={styles.card}
					actions={[
						<EditOutlined key="edit" onClick={handleButtonClick} />,
						<RemovePerson id={id} />,
					]}
                    title={`${firstName} ${lastName}`}
				>
                    {cars.map(car => (
                        <Cars key={car.id} car={car} />
                    ))}

					<Link to={`/person/${id}`} style={styles.more}>Learn more</Link>
				</Card>
			)}
		</>
	);
};

export default Person;
