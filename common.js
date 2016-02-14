//Collection creation
Users = Meteor.users;
Questions = new Mongo.Collection("questions");
Groups = new Mongo.Collection("groups");
Answers = new Mongo.Collection("answers");

// *****Collection Schemas*****
var Schema ={};

//User Country Schema
Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

//User Profile Schema
Schema.UserProfile = new SimpleSchema({
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
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
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

//Users Schema
Schema.Users = new SimpleSchema({
	username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    },
    groups: {
        type: Number,
        label: "Groups for user",
        min: 0,
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
	}
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
	}
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
	}
});

//Attaching collections to schemas created
Users.attachSchema(Schema.Users, {replace: true});
Questions.attachSchema(Schema.Questions, {replace: true});
Groups.attachSchema(Schema.Groups, {replace: true});
Answers.attachSchema(Schema.Answers, {replace: true});


