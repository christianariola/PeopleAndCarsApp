import { Card, List } from "antd";
import { formatter } from "../../currencyFormatter";

const getStyles = () => ({
	card: {
		marginBottom: "20px",
	},
});

const CarInfo = ({ car }) => {
	const styles = getStyles();

	return (
		<>
			<Card style={styles.card}>
				<List grid={{ gutter: 20, column: 1 }} style={styles.list}>
					<List.Item key={car.year}>{car.year}</List.Item>
					<List.Item key={car.make}>{car.make}</List.Item>
					<List.Item key={car.model}>{car.model}</List.Item>
					<List.Item key={car.price}>{formatter.format(car.price)}</List.Item>
				</List>
			</Card>
		</>
	);
};

export default CarInfo;
