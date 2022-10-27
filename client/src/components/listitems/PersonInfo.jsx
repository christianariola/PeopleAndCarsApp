import { Link } from "react-router-dom";
import { Card } from "antd";
import CarInfo from "./CarInfo";

const getStyles = () => ({
	card: {
		width: "1000px",
	},
	more: {
		marginTop: "20px",
	},
});

const PersonInfo = (props) => {
	const styles = getStyles();
	return (
		<>
			<Card
				style={styles.card}
				title={`${props.data.person.firstName} ${props.data.person.lastName}`}
			>
				{props.data.person.cars.map((car) => (
					<CarInfo key={car.id} car={car} />
				))}

				<Link to={`/`} style={styles.more}>
					Back to Home
				</Link>
			</Card>
		</>
	);
};

export default PersonInfo;
