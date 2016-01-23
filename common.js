//Collection creation
Users = new Mongo.Collection("users");
Questions = new Mongo.Collection("questions");
Groups = new Mongo.Collection("groups");
Answers = new Mongo.Collection("answers");

// *****Collection Schemas*****
var Schema ={};

//Users Schema
Schema.Users = new SimpleSchema({
	username: {
		type: String,
		label: "User Name",
		min: 0
	},
	password: {
		type: String,
		label: "Pass Word",
		min: 0
	},
	email: {
		type: String,
		label: "User Email",
		regEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		min: 0
	},
	groups: {
		type: Number,
		label: "Groups for user",
		min: 0,
		optional: true
	},
	activated: {
		type: Boolean,
		label: "User Activation Status"
	},
	firstName: {
		type: String,
		optional: true
	},
	lastName: {
		type: String,
		optional: true
	},
	birthday: {
		type: Date,
		optional: true
	},
	organization : {
		type: String,
		optional: true
	},
	website: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	},
	bio: {
		type: String,
		optional: true
	},
	country: {
		type: Schema.UserCountry,
		optional: true
	}
});

//Questions Schema
Schema.Questions = new SimpleSchema({
	questionAsked: {
		type: String,
		label: "Question",
		optional: false
	},
	possibleAnswers: {
		type: String,
		label: "Possible Question Answers",
		optional: false
	},
	answer: {
		type: String,
		label: "Question Answer",
		optional: false
	},
	
});

//Group Schema
Schema.Groups = new SimpleSchema({
	userID: {
		type: Number,
		label: "User Admin ID",
		optional: false
	},
	groupName: {
		type: String,
		label: "Group Name",
		optional: false
	},
	
});

//Answers Schema
Schema.Answers = new SimpleSchema({
	questionID: {
		type: Number,
		label: "Question ID",
		optional: false
	},
	groupID: {
		type: Number,
		label: "Group ID",
		optional: false
	},
	userID: {
		type: Number,
		label: "User ID",
		optional: false
	},
	answer: {
		type: String,
		label: "Question Answer",
		optional: false
	},
});

//Attaching collections to schemas created
Users.attachSchema(Schema.Users, {replace: true});
Questions.attachSchema(Schema.Questions, {replace: true});
Groups.attachSchema(Schema.Groups, {replace: true});
Answers.attachSchema(Schema.Answers, {replace: true});


