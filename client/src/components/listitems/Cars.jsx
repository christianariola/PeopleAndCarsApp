import { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";
import { formatter } from "../../currencyFormatter";

const getStyles = () => ({
	card: {
		marginBottom: '20px',
	}
});


const Cars = (props) => {
	const { id, year, make, model, price } = props.car;
	const styles = getStyles();
    const [editMode, setEditMode] = useState(false);

	const handleButtonClick = () => {
		setEditMode(!editMode);
	};
	
	return (
		<>
			{editMode ? (
				<UpdateCar car={props.car} onButtonClick={handleButtonClick} />
			) : (
			<Card
				key={id}
				title={`${year} ${make} ${model} -> ${formatter.format(price)}`}
				type="inner"
                actions={[
                    <EditOutlined key="edit" onClick={handleButtonClick} />,
                    <RemoveCar id={id} />,
                ]}
				style={styles.card}
			></Card>
			)}
		</>
	);
};

export default Cars;
