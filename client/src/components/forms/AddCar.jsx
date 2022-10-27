import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_PEOPLE } from "../../queries";

const AddCar = () => {
	const [addCar] = useMutation(ADD_CAR);

	const [form] = Form.useForm();

	const [, forceUpdate] = useState();

	const { data, loading, error } = useQuery(GET_PEOPLE);

	useEffect(() => {
		forceUpdate({});
	}, []);

	const onFinish = (values) => {
		const { year, make, model, price, personId } = values;

		addCar({
			variables: {
				id: uuidv4(),
				model,
				make,
				year: parseInt(year),
				price: parseFloat(price),
				personId,
			},
			update: (cache, { data: { addCar } }) => {
				const data = cache.readQuery({ query: GET_PEOPLE });

                const newList = data.people.map(person => {
                    if (person.id === addCar.personId) {
                        return {
                            ...person,
                            cars: [...person.cars, { ...addCar }]
                        }
                    }
                    return person;
                })

                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: { ...data, people: [...newList] }
                });
			},
		});

		form.resetFields();
	};

	return (
		<Form
			form={form}
			layout="inline"
			onFinish={onFinish}
			size="large"
			style={{ marginBottom: "40px" }}
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
				<InputNumber placeholder="Year" min={1000} />
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
				<InputNumber
					// formatter={(value) => `$ ${value}`}
					placeholder="Price"
				/>
			</Form.Item>

			<Form.Item
				name="personId"
				rules={[
					{ required: true, message: "Please select a person" },
				]}
			>
				<Select placeholder="Select a person">
					{!loading && !error && data ? (
						<>
							{data.people.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.firstName} {item.lastName}
								</Select.Option>
							))}
						</>
					) : (
						<>Loading</>
					)}
				</Select>
			</Form.Item>

			<Form.Item shouldUpdate={true}>
				{() => (
					<Button
						type="primary"
						htmlType="submit"
						disabled={
							!form.isFieldsTouched(true) ||
							form
								.getFieldsError()
								.filter(({ errors }) => errors.length).length
						}
					>
						Add Car
					</Button>
				)}
			</Form.Item>
		</Form>
	);
};

export default AddCar;
