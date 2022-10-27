import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
import { UPDATE_CAR, GET_PEOPLE } from "../../queries";
import filter from "lodash.filter";

const UpdateCar = (props) => {
	const { id, year, make, model, price, personId } = props.car;
	const [updateCar] = useMutation(UPDATE_CAR);
	const [form] = Form.useForm();

	const [, forceUpdate] = useState();
	const [selected, setSelected] = useState(personId);

	const { data, loading, error } = useQuery(GET_PEOPLE);

	useEffect(() => {
		forceUpdate({});
	}, []);

	const onFinish = (values) => {
		const { year, make, model, price } = values;

		updateCar({
			variables: {
				id: id,
				model,
				make,
				year: parseInt(year),
				price: parseFloat(price),
				personId: selected,
			},
			update: (cache, { data: { updateCar } }) => {
				const data = cache.readQuery({ query: GET_PEOPLE });
				const newData = data.people
					.map((person) => {
						return {
							...person,
							cars: person.cars.filter(
								(car) => car.id !== updateCar.id
							),
						};
					})
					.map((person) => {
						if (person.id === updateCar.personId) {
							return {
								...person,
								cars: [...person.cars, updateCar],
							};
						}
						return person;
					});
				cache.writeQuery({
					query: GET_PEOPLE,
					data: {
						people: newData,
					},
				});
			},
		});

		props.onButtonClick();
	};

	console.log(props.car);
	return (
		<Form
			form={form}
			name="update-car-form"
			layout="inline"
			onFinish={onFinish}
			initialValues={{
				year: year,
				make: make,
				model: model,
				price: price,
				personId: personId,
			}}
		>
			<Form.Item
				name="year"
				label="Year"
				rules={[
					{
						required: true,
						message: "Please input the car year!",
					},
				]}
			>
				<InputNumber placeholder="Year" />
			</Form.Item>

			<Form.Item
				name="make"
				label="Make"
				rules={[
					{
						required: true,
						message: "Please input the car make!",
					},
				]}
			>
				<Input placeholder="Make" />
			</Form.Item>

			<Form.Item
				name="model"
				label="Model"
				rules={[
					{
						required: true,
						message: "Please input the car model!",
					},
				]}
			>
				<Input placeholder="Model" />
			</Form.Item>

			<Form.Item
				name="price"
				label="Price"
				rules={[
					{
						required: true,
						message: "Please input the car price!",
					},
				]}
			>
				<InputNumber placeholder="Price" />
			</Form.Item>

			<Form.Item
				name="personId"
				rules={[{ required: true, message: "Please select a person" }]}
			>
				<Select
					placeholder="Select a person"
					onChange={(id) => setSelected(id)}
				>
					{!loading && !error && data ? (
						<>
							{data.people.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.firstName} {item.lastName}
								</Select.Option>
							))}
						</>
					) : (
						<Select.Option>Loading...</Select.Option>
					)}
				</Select>
			</Form.Item>

			<Form.Item shouldUpdate={true}>
				{() => (
					<Button
						type="primary"
						htmlType="submit"
						disabled={
							// !form.isFieldsTouched(true) ||
							form
								.getFieldsError()
								.filter(({ errors }) => errors.length).length
						}
					>
						Add Car
					</Button>
				)}
			</Form.Item>
			<Button type="danger" onClick={props.onButtonClick}>
				Cancel
			</Button>
		</Form>
	);
};

export default UpdateCar;
