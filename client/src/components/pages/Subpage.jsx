import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON } from "../../queries";
import PersonInfo from "../listitems/PersonInfo";

const Subpage = () => {
	const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { personId: id }
    });

    if (error) return <p>{error.message}</p>;

	return <>
        {(loading ? <div>Loading....</div> : <PersonInfo  data={data} />)}
    </>;
};

export default Subpage;
