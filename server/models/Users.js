module.exports = (sequrlize, DataTypes) => {
	const Users = sequrlize.define('Users', {
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	Users.associate = models => {
		Users.hasMany(models.Likes, {
			onDelete: 'cascade'
		});

		Users.hasMany(models.Posts, {
			onDelete: 'cascade'
		});
	};

	return Users;
};
