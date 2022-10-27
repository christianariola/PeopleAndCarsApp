import React from "react";
import { Form, Input } from "antd";

const AddPerson = () => {
	return (
		<Form layout="inline" size="large" style={{marginBottom: '40px'}}>
			<Form.Item
				name="firstName"
				rules={[
					{
						required: true,
						message: "Please input your first name!",
					},
				]}
			>
                <Input placeholder="First Name" />
            </Form.Item>

			<Form.Item
				name="lastName"
				rules={[
					{
						required: true,
						message: "Please input your last name!",
					},
				]}
			>
                <Input placeholder="Last Name" />
            </Form.Item>
		</Form>
	);
};

export default AddPerson;
