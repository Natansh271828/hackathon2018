

var city = {
    "gurgaon":11,
    "mumbai":18,
    "delhi":6,
    "chennai":5,
    "kolkata":16,
    "bangalore":2
};




function URL_add_parameter( param, value){
        
    var url        = location.href;
    var hash       = {};
    var parser     = document.createElement('a');
    parser.href    = url;
    var parameters = parser.search.split(/\?|&/);
    for(var i=0; i < parameters.length; i++) {
        if(!parameters[i])
            continue;

        var ary      = parameters[i].split('=');
        hash[ary[0]] = ary[1];
    }
    if( param === "reset" ){
        if(hash["cityId"]){
            let city = hash["cityId"];
            var llist = [];
            llist.push("cityId" + '=' + city);
            parser.search = '?' + llist.join('&');
            location.href =  parser.href;
            return;
        }

    }

    

    //in case of beds check if parameter is beds and value is not equal to any or 4plus
    if(param === 'beds' && value !== 'any' ){

        if(hash[param] === "any"){
            hash[param] = "";
        }

        //check if the clicked value already exists in beds
        let index = -1;
        //check if beds parameter already exist in the url
        if(hash[param])
         index = hash[param].indexOf(value);
        if(index !== -1){

           //split the beds string at , and remove the "value" form the string and join the string with ','
           let splitArr = hash[param].split(',');
           let newArr = [];
            for(let i = 0; i < splitArr.length; i++){
                if(splitArr[i]  !== value){
                    newArr.push(splitArr[i]);
                }
            }
            hash[param] = newArr.join(',');

            if(hash[param] === "")
            {
                hash[param] = "any";
            }

        }else{
        
         // check if beds parameter is in the url if it is directly append the value
         if(hash[param])
         hash[param] = hash[param] + "," + value;
         else{
            hash[param] = value;
         }

        }

        //append the values
    }else{
        hash[param] = value;
    }
    
      var list = [];
    Object.keys(hash).forEach(function (key) {
        list.push(key + '=' + hash[key]);
    });
    parser.search = '?' + list.join('&');
    location.href =  parser.href;
     //alert(location.href);
    }  


    function logInToggle(){
        $("#login-form-wrapper").toggle();
        if($("#signup-form").is(":visible")){
            $("#signup-form").toggle();
        }

        console.log("login toggle");
        console.log($("visibiliyy" + "#signup-form").is(":visible"));
    }

    function signUpToggle(){
        $("#signup-form").toggle();

        if($("#login-form-wrapper").is(":visible")){
            $("#login-form-wrapper").toggle();
        }

        console.log("signup toggle");
    }

    function makeGroup(){
        $("#make-group-form").toggle();

    }

    findGroups = (e,projectId) => {
          console.log("find groups");
          e.preventDefault();
          e.stopPropagation();
          //TODO:
          //find all the groups related to the projectId
          //make cards 
          // append cards to div
          //toggle visibility of the card-continer div
          


    }

$(function(){

    $("#input").keypress(function(e){
        var code = e.keyCode || e.which;
        if(code === 13){
            let val = $(this).val();
            if(val)
                val = val.toLowerCase();            
                URL_add_parameter('cityId',city[val]);
        }
    });

    $("#hidden_input").keypress(function(e){
        var code = e.keyCode || e.which;
        if(code === 13){
            let val = $(this).val();
            if(val)
                val = val.toLowerCase();            
                URL_add_parameter('cityId',city[val]);

        }
    });

    $(".cbtn.cbtn-p").on('click',function(e){
        $(this).siblings(".phone_number").toggle();
        e.stopPropagation();

    });

    // $('#signup-button').on('click',function(e){
    //     e.preventDefault();
        

    //     console.log("signup button clicked");
    // });

    // $('#login-button').on('click',function(e){
    //     e.preventDefault();
    //     console.log("login button clicked");
    // });

    $( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        console.dir( $( this ).serializeArray() );

        function urlResponse(data,status){
            console.log(data);

            if(data){
                // the data does not contain any fields
                //TODO: the login was not valid 
            }

            console.log(status);
     }

        let formObject = {};
        let isSignUpForm = false;
        let formValues = $( this ).serializeArray();

        if(formValues[0].value.toString() === "signup_form"){
            isSignUpForm = true;
        }

        for( let i = 1; i < formValues.length; i++ ){
            formObject[formValues[i].name.toString()] =  formValues[i].value.toString();
        }
        console.log(formObject);

        let formString = JSON.stringify(formObject)
        // console.log(isSignUpForm);
         let requestLocation = "http://10.10.3.100:8080/adduser"; 

         //jQuery.param( formObject )
        // let xhr = new XMLHttpRequest();
        // xhr.open("POST", requestLocation, true);
        // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        // xhr.onload = function (){
        //     // if(this.status == 200)
        //     //     {
        //     //     }
        //     // else{
        //     //     //handle exception
        //     // }
        //     if(this.response)
        //    console.log(this.response);
            
        // }    
        // console.log("sending...");
        //     xhr.send(formString);
        // console.log(isSignUpForm);

        if(isSignUpForm){

            console.log("sendin.....");
            $.ajax(
                {
                     url: requestLocation,
                     type: "POST",
                     data: formString,
                     contentType: 'application/json; charset=utf-8',
                     dataType: 'json',
                     async: true,
                     success: function(data,status,jqXhr){
                         console.log("sent")
                         console.log(data);
                         console.log(status);
                         console.log(jqXhr);
                     }
                 }
             );

            // $.ajax{
            //     url: "10.10.3.100:8080/uservalidate/ankyamaze@gmail.com/userankita",
            //     type: "POST",

            // }
            
        }else{

            console.log("login Submit")
            console.log(formObject);
            let location = `http://10.10.3.100:8080/validateuser/${formObject.email}/${formObject.password}`;
            console.log(location);
            $.ajax(
                {
                     url: location,
                     type: "GET",
                     success: urlResponse
                 }
             );
        }
      });


      $('#login-form-wrapper, #signup-form, #make-group-form').on('click',function(e){
            $(this).toggle();
      });

    



})

