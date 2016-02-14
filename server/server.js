//set this up with whatever email we use later
//process.env.MAIL_URL = 'smtp://postmaster%40meteorize.mailgun.org:YOURPASSWORD@smtp.mailgun.org:587';

//set parameters for verification email
//Accounts.emailTemplates.from = 'Open Clicker Accounts <>'; //uncomment and put actual address in <> when set up
Accounts.emailTemplates.siteName = 'Open Clicker';
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for Open Clicker';
};
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Welcome to Open Clicker!  Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
};

Accounts.config({
    sendVerificationEmail: true
});