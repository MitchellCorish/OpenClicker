# OpenClicker

## Tools

  The project is written using [AngularJS (1.5.0)](https://angularjs.org/) and [Meteor (1.2.1)](https://www.meteor.com/).  Tests are written using [Jasmine (2.3)](http://jasmine.github.io/2.3/introduction.html).

### Relevant Documentation:

  * [AngularJS](https://code.angularjs.org/1.5.0/docs/api)
  * [Meteor](http://docs.meteor.com/#/full/)
  * [Jasmine](http://jasmine.github.io/2.3/introduction.html)
  * [Guide to using AngularJS with Meteor](http://www.angular-meteor.com/)
  * [Johnpapa Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
  * [Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
  
## Packages

  A current list of all Meteor packages in the project can be found in /meteor/packages.  Version numbers of all packages and dependencies can be found in /meteor/versions.
  
### Notes:

  * Github pages and information on specific packages can usually be found [here](https://atmospherejs.com/).

  * The project uses the [meteorhacks:fast-render](https://github.com/kadirahq/fast-render) package, which has some [security issues](https://github.com/kadirahq/fast-render#security).  These shouldn't be a problem in the application's current state, but should be kept in mind to avoid issues in the future.
  
  * We are using [AngularUI Router](https://github.com/angular-ui/ui-router) to handle routing
  
## Setup

### Root user:

  When the server is run, a user with the following info is created as the default admin user:
  
    email: 'root@openclicker.com'
    password: 'password'
    
  The password for this user should be updated immediately.  This user cannot be deleted, and cannot have their permissions changed, so there will always be a user account with administrator access.
  
### Email:

  Emails for verification and password resets are currently printed to the console.  There is code in server.js which can be updated with SMTP info to allow emails to be sent.