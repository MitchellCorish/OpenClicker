//Collection creation
Users = new Mongo.Collection("users");
Questions = new Mongo.Collection("questions");
Groups = new Mongo.Collection("groups");
Answers = new Mongo.Collection("answers");

// *****Collection Schemas*****
var Schemas ={};

//Users Schema
Schemas.Users = new SimpleSchema({
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
Schemas.Questions = new SimpleSchema({
	question: {
		type: String,
		label: "Question",
		min: 0,
		optiional: false
	},
	possibleAnswers: {
		type: String,
		label: "Possible Question Answers",
		min: 0,
		optiional: false
	},
	answer: {
		type: String,
		label: "Question Answer",
		min: 0,
		optiional: false
	},
	
});

//Group Schema
Schemas.Groups = new SimpleSchema({
	userID: {
		type: Number,
		label: "User Admin ID",
		optiional: false
	},
	groupName: {
		type: String,
		label: "Group Name",
		optiional: false
	},
	
});

//Answers Schema
Schemas.Answers = new SimpleSchema({
	questionID: {
		type: Number,
		label: "Question ID",
		optiional: false
	},
	groupID: {
		type: Number,
		label: "Group ID",
		optiional: false
	},
	userID: {
		type: Number,
		label: "User ID",
		optiional: false
	},
	answer: {
		type: String,
		label: "Question Answer",
		optiional: false
	},
});

//Attaching collections to schemas created
Users.attachSchema(Schemas.Users, {replace: true});
Questions.attachSchema(Schemas.Questions, {replace: true});
Groups.attachSchema(Schemas.Groups, {replace: true});
Answers.attachSchema(Schemas.Answers, {replace: true});


