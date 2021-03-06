

var city = {
    "gurgaon":11,
    "mumbai":18,
    "delhi":6,
    "chennai":5,
    "kolkata":16,
    "bangalore":2
};

function cardMaker(obj){

    console.log( "card maker");
    console.log(obj);
    let photo = obj.group.photo;
    let groupName = obj.group.groupName;
    let numberOfMembers = obj.group.members;
    let agegrp = obj.group.ageGroup;
    let description = obj.group.description;
    let drinkimg = obj.group.drinkStatus === 'yes' ? 'alcohol.png' : 'nonalcohol.png'; 
    let smokeimg = obj.group.smokeStatus === "yes" ? 'smoking.png':'nonsmoking.jpg';
    let foodimg =  obj.group.foodPreference === "yes" ? 'veg.jpg' : 'nonveg.jpg' ;
    let marriedimg = obj.group.marriedStatus === 'yes' ? 'married.jpg' : 'non-married.png';
    let groupof = obj.group.sex;


        return(`<div class="group-card-container"> 
                <div class="photo-container"> 
                    <div class="photo">
                                <img src="photos/${photo}" alt="group pic" class="pic">
                    </div>
                </div>
                <h4>${groupName}</h4>
                <h4>Number of members &nbsp${numberOfMembers}</h4>
            <div class="description-box">
                    <p class="desc" >${description}</p>
            </div>
            <div class="whole">
                <div class="first">
                        <div class="prop">
                        <img src="Hackathon/${smokeimg}" alt="smoke" class="info"><div class="the-prop">Smoking</div>
                        </div>
                        <div class="prop">
                        <img src="Hackathon/${marriedimg}" alt="status" class="info"><div class="the-prop">Unmarried/Married</div>
                        </div>
                </div>
                <div class="second">
                    <div class="prop">
                        <img src="Hackathon/${foodimg}" alt="food" class="info"><div class="the-prop">Veg/Non-veg</div>
                    </div>
                    <div class="prop">
                        <img src="Hackathon/${drinkimg}" alt="drinking" class="info"><div class="the-prop">Drinking</div>
                    </div>
                </div>
                <div class="third">
                    <div class="prop">
                        <img src="Hackathon/age.png" alt="drinking" class="info1" id="info"><div class="the-prop">${agegrp}</div>
                    </div>
                </div>
                <div class="group-card-btn-container">
                <a class="cbtn cbtn-p connect_btn" data-call-now="" data-type="openLeadForm" data-seller-type="EXPERT_DEAL_MAKER" href='javascript:void(0);'> Connect Now</a>
                </div>
                </div></div>`)

}




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
          
          
        //   TODO:   
        //   find all the groups related to the projectId
        //   uncomment this
            $.ajax({
                type:'GET',
                url: `http://192.168.43.13/:8080/getmates/${projectId}`,
                success: (data,status) => {
                        var response;
                        console.log(data);
                        response = data;
                        let html = '';
                        for(let i = 0; i < response.length; i++ ){
                                html +=  cardMaker(response[i]);
                        }

                        // append cards to div
                        document.getElementById("card-view").innerHTML = html;
                                

                        if(!($('.card-view-container').is(':visible'))){
                            $('.card-view-container').css('display','flex');
                        }            
                }
            });

          

            // var response;
            // response = [{group: {photo : 'abc',
            //      members : '5',
            //      ageGroup : '78-980',
            //      groupName : 'Hello Grp',
            //      description : 'This is an amazing grp',
            //      drinkStatus : 'no',
            //      smokeStatus : 'yes',
            //      foodPreference:  'yes',
            //      marriedStatus : 'no',
            //      groupof:'boys'}},   

            //      {group: {photo : 'abc',
            //      members : '2',
            //      ageGroup : '78-980',
            //      groupName : 'Hello Grp 2',
            //      description : 'He he he ;)))',
            //      drinkStatus : 'no',
            //      smokeStatus : 'yes',
            //      foodPreference:  'yes',
            //      marriedStatus : 'no',
            //      groupof:'boys'}}];
            //      var html='';
            // for(let i = 0; i < response.length; i++ ){
            //     html +=  cardMaker(response[i]);
            //     }
            //     document.getElementById("card-view").innerHTML = html;
                 // Comment this
            // if(!($('.card-view-container').is(':visible'))){
            //     $('.card-view-container').css('display','flex');
            // }


                
          //make cards 
          
                
    }

    favourite = (e,projectId) => {
        console.log("find groups");

        e.preventDefault();
        e.stopPropagation();  

       // console.log(e.target.style.color.toString());
      
            
        //TODO:
        //send projectId and group id 
        //grop favourited this particular projectId

        //uncomment this
        let requestData = {
        };

        requestData["gid"] = 7;
        requestData["projectId"] = projectId;//projectId.toString();
        console.log(requestData);
    

        // let requestLocation = 'http://10.10.3.100:8080/bookmarkproperty';
        // //let loc = requestLocation 
        // $.ajax({
        //     url: requestLocation,
        //     type: "POST",
        //     data: JSON.stringify(requestData),
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     async: true,
        //     success: function(data,status){
        //         console.log("sent")
        //         console.log(data);
               
        //     }

        // })

        if(e.target.style.color != "rgb(0, 255, 0)" )
        e.target.style.color = "#00ff00";
        else{   
            e.target.style.color = "#ff0000"
            }
       
  }





$(function(){

    //document.getElementById('test-div').innerHTML = '<h1>hello world</h1>'

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

    $(".cbtn.cbtn-p.connect_btn").on('click',function(e){
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
        let isMakeGroupForm = false;
        let formValues = $( this ).serializeArray();

        if(formValues[0].value.toString() === "signup_form"){
            isSignUpForm = true;
        }else if(formValues[0].value.toString() === "make_group_form"){
            isMakeGroupForm = true
        }

        for( let i = 1; i < formValues.length; i++ ){
            formObject[formValues[i].name.toString()] =  formValues[i].value.toString();
        }
        console.log(formObject);

        
        // console.log(isSignUpForm);
         let requestLocation = "http://10.10.3.100:8080/adduser"; 


        if(isSignUpForm){

            let formString = JSON.stringify(formObject);

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
            
        }else if(isMakeGroupForm){
            formObject["email"] = "hell@gm.com";

            let formString = JSON.stringify(formObject);
            let reqLoc = "http://10.10.3.100:8080/addgroup";
            $.ajax(
                {
                     url: reqLoc,
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


        }
        else{

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


      $('.card-view-container').on('click',function(e){
          $(this).toggle();
      })

      $('.card-view').on('click',function(e){
        e.stopPropagation();
    })


      $('#login-form-wrapper, #signup-form, #make-group-form').on('click',function(e){
            $(this).toggle();
      });

      $('form').on('click',function(e){
          e.stopPropagation();
      })

    



})

