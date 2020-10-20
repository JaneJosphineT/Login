jQuery(function($) {
  //Backbone Model and Validation Method

 var Client = Backbone.Model.extend({

    // RegEx Patterns

    patterns: {

        specialCharacters: "[^a-zA-Z 0-9]+",

        uppercase: "[A-Z]",

        digits: "[0-9]",

        repitition: "([a-zA-Z])\1",

    },

    // Validators

    validators: {

        minLength: function(value, minLength) {

            return value.length >= minLength;

        },

        maxLength: function(value, maxLength) {

            return value.length <= maxLength;

        },

        pattern: function(value, pattern) {

            return new RegExp(pattern).test(value) ? true : false;

        },

     
        hasSpecialCharacter: function(value) {

            return Client.prototype.validators.pattern(value, Client.prototype.patterns.specialCharacters);

        },

        hasDigit: function(value) {

            return Client.prototype.validators.pattern(value, Client.prototype.patterns.digits);

        },

      
      hasUpperCase: function(value) {
     
        return Client.prototype.validators.pattern(value, Client.prototype.patterns.uppercase);

    },

    hasRepitition: function(value) {
      return Client.prototype.validators.pattern(value, Client.prototype.patterns.repitition);

  }
    
      
        
    },

    validate: function(attribute) {

        console.log('attribute', attribute);

        var errors = this.errors = {};

        if (attribute.fname != null) {

            if (!attribute.fname) errors.fname = 'Username is required';

            else if (!this.validators.minLength(attribute.fname, 2)) errors.fname = 'Username length is too Short';

            else if (!this.validators.maxLength(attribute.fname, 10)) errors.fname = 'Username must contain 10 characters';

            else if (this.validators.hasSpecialCharacter(attribute.fname)) errors.fname = 'User must not contain special characters';
            
            else if (!this.validators.hasDigit(attribute.fname)) errors.fname = 'Username must contain one number';

            else if (!this.validators.hasUpperCase(attribute.fname)) errors.fname = 'Must contain at least one uppercase letter';

            // else if (!this.validators.hasRepitition(attribute.fname)) errors.fname = 'Character can not be repeated in a row';
        }


        if (attribute.password != null) {

            if (!attribute.password) errors.password = 'Password is required';

            else if (!this.validators.minLength(attribute.password, 8)) errors.password = 'Password length is too short';

            else if (!this.validators.maxLength(attribute.password, 15)) errors.password = 'Password must be longer than 8 characters';

            else if (this.validators.hasSpecialCharacter(attribute.password)) errors.password = 'Password must not contain a special character';

            else if (this.validators.hasDigit(attribute.password)) errors.password = 'Password must not contain a digit';

            else if (attribute.fname == attribute.password)errors.password = 'Password must be different from username';
       
            else {
              localStorage.setItem('username', attribute.fname);
            }

          }
        
        
        if (!_.isEmpty(errors)) {

          return errors;

        }

        

    }

});

var Record = Backbone.View.extend({

  events: {blur: 'validate'},

  initialize: function() {

    this.name = this.$el.attr('name');
    console.log(this.name);
    this.$msg = $('[data-msg=' + this.name + ']');
    // localStorage.setItem("username", attribute.fname);
    // console.log(user);
  },

  validate: function() {

    var self = this,

    obj = {};

    obj[this.name] = this.$el.val();

    this.model.set(obj, {validate: true, validateAll: false},{ error: function(model, obj) {

      console.log(obj);

    
    }}

    );

    this.$msg.text(this.model.errors[this.name] || '');

  }

});

  //Create the Model Instance

var client = new Client;

$('input').each(function() {

  new Record({el: this, model: client});

});

});

function validateForm() {
  if(form.fname.value != '' && form.password.value != ''){
    return true;
  }
  else{
    return false;
  }
//   // return false;
}
// function fun(){
//   alert('hi');
//   alert(username + ',' +passwrd);
//   if(username == false && passwrd == false){
//     window.location.href = '/dashboard.html';
//     return false;
//   }
//   else{
//     window.location.href = '/dashboard.html';
//     return true;
//   }
//   // window.location.href = '/dashboard.html';
// }
// function myFunction(){

//   alert('hi');
//   window.location.href = '/dashboard.html';
// }
// function validateForm() {

   
//     if(form.username.value == "") {
//         document.getElementById("namelocation").innerHTML=  
//         "Username cannot be blank";
//         form.username.focus();
//         return false;
//       }

//       re = /(?=.*\d)(?=.*[A-Z])/;
//       if(!re.test(form.username.value)) {
//         // alert("Error: Username must contain atleast one number and uppercase!");
//         document.getElementById("namelocation").innerHTML=  
//         " Username must contain atleast one number and uppercase!";
//         form.username.focus();
//         return false;
//       }

    //   re = /([a-zA-Z])\1/;
    //   if(!re.test(form.username.value)) {
    //     alert("hi");
    //     document.getElementById("namelocation").innerHTML=  
    //     " Character repitition not allowed!";
    //     form.username.focus();
    //     return false;
    //   }
  
    
      // if(form.password.value != "" ) {
      //   if(form.password.value.length > 9) {
      //   //   alert("Error: Password must contain at least eight characters!");
      //   document.getElementById("passwordlocation").innerHTML=  
      //   " Password must contain at least eight characters!";
      //     form.password.focus();
      //     return false;
      //   }
      //   if(form.password.value == form.username.value) {
      //   //   alert("Error: Password must be different from Username!");
      //     document.getElementById("passwordlocation").innerHTML=  
      //     " Password must be different from username!";
      //     form.password.focus();
      //     return false;
      //   }
        // re = /[0-9]/;
        // if(!re.test(form.password.value)) {
        //   alert("Error: password must contain at least one number (0-9)!");
        //   form.password.focus();
        //   return false;
        // }

    //     re = /^[A-Za-z]+$/;
    //     if(!re.test(form.password.value)) {
    //         document.getElementById("passwordlocation").innerHTML=  
    //         " Password must contain only letters!";
    //     //   alert("Error: password must contain at least one uppercase letter (A-Z)!");
    //       form.password.focus();
    //       return false;
    //     }
    //   } else {
    //     document.getElementById("passwordlocation").innerHTML=  
    //     "Password cannot be blank";
    //     form.password.focus();
    //     return false;
    //   }
    // //  alert("You entered a valid password: " + form.password.value);
    // var user = document.getElementById("username");
    // localStorage.setItem("username", form.username.value);
    // console.log(user);
    // return true;
     
    // }