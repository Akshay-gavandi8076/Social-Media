module.exports = (sequrlize, DataTypes) => {
	const Posts = sequrlize.define('Posts', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		postText: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return Posts;
};
