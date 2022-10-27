const getStyles = () => ({
	heading: {
		fontSize: 30,
		padding: "15px",
		marginButtom: "50px",
		textTransform: "uppercase",
		fontWeight: "bold",
	},
	subheading: {
		fontSize: 23,
		padding: "15px",
		fontWeight: "bold",
	}
});

const Title = ({ text, headingLevel, type }) => {
	const styles = getStyles();
	const Tag = `h${headingLevel}`;
	return (
		<>
			<Tag style={type === 'heading' ? styles.heading : styles.subheading}>{text}</Tag>
		</>
	);
};

export default Title;
