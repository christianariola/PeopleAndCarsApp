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
		const { year, make, model, price, personId } = values;

		updateCar({
			variables: {
				id: id,
				model,
				make,
				year: parseInt(year),
				price,
				personId: selected,
			},
			update: (cache, { data: { addCar } }) => {
				const data = cache.readQuery({ query: GET_PEOPLE });

                const newList = data.people.map(person => {

                    // if the car stays with the same person
                    if (personId === updateCar.personId) {
                        if (person.id === updateCar.personId) {
                            const newCars = person.cars.filter(car => car.id !== updateCar.id)


                            return { ...person, cars: [...newCars, updateCar] }
                        }

                        return person;

                        // if the car doesn't stay with the same person
                    } else {
                        // add car to new person
                        if (person.id === updateCar.personId) {

                            const newCars = [...person.cars, updateCar]
                            return { ...person, cars: [...newCars] }
                        }

                        // remove car from previous person
                        if (person.id === personId) {
                            const newCars = person.cars.filter(car => car.id !== updateCar.id)

                            return {
                                ...person,
                                cars: [...newCars]
                            }
                        }

                        return person;
                    }

                })

                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: { ...data, people: [...newList] }
                });
			},
		});

		props.onButtonClick()
	};

    console.log(props.car)
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
            personId: personId
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
				<Select placeholder="Select a person" defaultValue={selected}>
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
