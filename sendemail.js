var path        = require('path');
//var templateDir = path.join(__dirname, 'templates');
var emailTemplates = require('email-templates');
var nodemailer  = require('nodemailer');

exports.sendemail = function(patterns, criterion, subscription, notification) {
  emailTemplates(notification.email.templates, function(err, template){
    if (err) {
      console.log(err);
    }
    var transport = nodemailer.createTransport('SMTP', {
      service: notification.email.smtp.engine,
      auth: {
        user: notification.email.smtp.authentication.username,
        pass: notification.email.smtp.authentication.password
      }
    });
    var locals = {
      email: notification.email.to.join(", "),
      content: { 
        name: subscription.name,
        version: criterion['version']['value'],
        package: patterns['package']['value'],
        checksum: patterns['checksum']['value']
      }
    };
    template('notification', locals, function(err, html, text){
      if (err) console.log(err);
      transport.sendMail({
        from: 'Subnotify <subnotify@gmail.com>',
        to: locals.email,
        subject: subscription.name + " is upgraded!",
        html: html,
        text: text
      }, function(err, response) {
        if (err) console.log(err);
        //console.log(response.message);
        transport.close();
      });
    });
    // var locals = [{
    //   email: notification.email.to.join(", "),
    //   contents: [{first: 'Hello', second: "World@!"},{first: 'Heelo', second: 'Workd!'}]
    // }];
    // var Render = function(locals) {
    //   this.locals = locals;
    //   this.send   = function(err, html, text) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     transport.sendMail({
    //       from: 'Subnotify <subnotify@gmail.com>',
    //       to: locals.email,
    //       subject: "Maven is upgraded!",
    //       html: html,
    //       text: text
    //     }, function(err, response) {
    //       if (err) console.log(err);
    //       console.log(response.message);
    //     });
    //   };
    //   this.batch  = function(batch) {
    //     batch(this.locals, templateDir, this.send);
    //   }
    // };
    // template('notification', true, function(err, batch) {
    //   for(var local in locals) {
    //     var render = new Render(locals[local]);
    //     render.batch(batch);
    //   }
    // });
  });
};