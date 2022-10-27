import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { REMOVE_CAR, GET_PEOPLE } from "../../queries";
import filter from "lodash.filter";

const RemoveCar = ({ id }) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        update: (cache, { data: { removeCar } }) => {
            const { people } = cache.readQuery({ query: GET_PEOPLE });

            const newList = people.map(person => {
                return {
                    ...person,

					cars: filter(people, (o) => {
						return o.id !== removeCar.id;
					}),
                }
            })

            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: [...newList]
                }
            });
        }
    })

	const handleButtonClick = () => {
		let result = window.confirm(
			"Are you sure you want to delete this car?"
		);
		if (result) {
			removeCar({
				variables: {
					id,
				},
			});
		}
	};

	return (
		<>
			<DeleteOutlined
				key="delete"
				onClick={handleButtonClick}
				style={{ color: "red" }}
			/>
		</>
	);
};

export default RemoveCar;
