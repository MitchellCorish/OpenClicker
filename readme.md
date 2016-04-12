# OpenClicker

## Contents

  * [Tools](#tools)
  * [Packages](#packages)
  * [Security](#security)
  * [Setup](#setup)
  * [Known Issues and Other Important Notes](#known-issues-and-other-important-notes)

## Tools

  The project is written using [AngularJS (1.5.0)](https://angularjs.org/) and [Meteor (1.2.1)](https://www.meteor.com/).  Tests are written using [Jasmine (2.3)](http://jasmine.github.io/2.3/introduction.html).

Relevant Documentation:

  * [AngularJS](https://code.angularjs.org/1.5.0/docs/api)
  * [Meteor](http://docs.meteor.com/#/full/)
  * [Jasmine](http://jasmine.github.io/2.3/introduction.html)
  * [Guide to using AngularJS with Meteor](http://www.angular-meteor.com/)
  * [Johnpapa Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
  * [Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

## Packages

  A current list of all Meteor packages in the project can be found in /.meteor/packages.  Version numbers of all packages and dependencies can be found in /.meteor/versions.
  
Notes:

  * Github pages and information on specific packages can usually be found [here](https://atmospherejs.com/).
  
  * We are using [AngularUI Router](https://github.com/angular-ui/ui-router) to handle routing.
  
  * Testing uses [Velocity](https://github.com/xolvio/meteor-jasmine).  Debugging info, etc. can be found [here](https://meteor-testing.readme.io/docs/getting-started).
  
  * We are using [aldeed:collection2](https://github.com/aldeed/meteor-collection2) to handle schemas for the collections.

## Security

The following are potential security issues.  They shouldn't be a problem in the application's current state, but this should be verified by someone with more web application security experience.

  * See #50.
  
  * The project uses the [meteorhacks:fast-render](https://github.com/kadirahq/fast-render) package, which has some potential [security issues](https://github.com/kadirahq/fast-render#security).

## Setup

### Root user:

  When the server is run, a user with the following info is created as the default admin user:
  
    email: 'root@openclicker.com'
    password: 'password'
    
  The password for this user should be updated immediately (the application will remind you to do this when the user is created).  This user cannot be deleted, and cannot have their permissions changed, so there will always be a user account with administrator access.
  
### Email:

  Emails for verification and password resets are currently printed to the console.  There is code in server.js which can be updated with SMTP info to allow emails to be sent.
  
### Installation:

To install and run the application locally (in development mode, i.e. tests will run etc.):

  * Install [Meteor](https://www.meteor.com/).
  * Clone this repository.
  * Open a cmd window in the root directory containing /.meteor, /client, /server, etc.
  * Run the meteor command.
  * Open a browser and go to http://localhost:3000.
  
## Known Issues and Other Important Notes

  * Logging in or out does not currently trigger a redirect/reload
  * Timer for opening and closing questions is client side, so reloading or leaving the page will leave the question open and it must be closed manually
  * Some of the CSS appears to conflict, so some things don't look quite like they are intended to
  * There is currently no way to change the email for the root user from within the application, so emails for password resets, etc. will be sent to the default (non-existent as far as we know) address unless it is changed directly in the database
  * The group summary page is just a mockup at the moment.  The numbers all display as 100 for now.
  * Roles are not hierarchical.  They are assigned individually.
  * The application hasn't been tested with a large number of concurrent users yet