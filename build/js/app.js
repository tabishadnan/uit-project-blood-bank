auth.onAuthStateChanged(user => {
    if(user == null){
        localStorage.removeItem('current-donor-id');
        localStorage.removeItem('search-blood-group');
        localStorage.removeItem('search-blood-city');
        signIn_again();
    }
})

// signin again

function signIn_again(){
    function preventBack() 
    { 
        window.history.forward(); 
    }
    setTimeout(preventBack(), 0);
    window.onunload = function () { null };
}

function emailIsVerifiedOrNot(){
    var current_user = firebase.auth().currentUser;
    current_user.sendEmailVerification()
}

// target loader
var spinner = document.getElementById("spinner");
// target header btn
var logout_btn = document.getElementById("logout-btn-header");

// targer inputs //
var signup_inputs = document.getElementsByTagName("input");
var signup_email = document.getElementById("signup-email");
var signup_password = document.getElementById("signup-password");
var signin_inputs = document.getElementsByTagName("input");
var signin_email = document.getElementById("signin-email");
var signin_password = document.getElementById("signin-password");

// target for response //  
// use for display signUp
var wrap_response_signup = document.getElementById("wrap-response-signup");
// use for mesage signUp
var response_signup = document.getElementById("response-signup");

// use for display signIn
var wrap_response_signin = document.getElementById("wrap-response-signin");
// use for mesage signIn
var response_signin = document.getElementById("response-signin");

// function SigUp //
function signUp(){
    var user = {
        email : signup_email.value,
        password : signup_password.value
    }
    auth.createUserWithEmailAndPassword(user.email,user.password)
    .then(res => {
        var signup_msg = "Lets Us Know That This Email Address Belongs To You, Check Email <b>!</b>"
        wrap_response_signup.style.display = "block";
        response_signup.innerHTML = signup_msg;
        emailIsVerifiedOrNot();
    })
    .catch(err => {
        const error = err.code;
        if(error == "auth/invalid-email"){
            var signup_msg = "Please Write Email And Password <b>!</b>"
            wrap_response_signup.style.display = "block";
            response_signup.innerHTML = signup_msg;
        }else if(error == "auth/weak-password"){
            var signup_msg = "Please Write Correct Password <b>!</b>"
            wrap_response_signup.style.display = "block";
            response_signup.innerHTML = signup_msg;
        }else if(error == "auth/email-already-in-use"){
            var signup_msg = "You Have Already Account <b>!</b>"
            wrap_response_signup.style.display = "block";
            response_signup.innerHTML = signup_msg;
        }

        
    })
    for(var i=0; i<signup_inputs.length; i++){
        signup_inputs[i].value = "";
    }
}

// function SigIn //
function signIn(){
    var user = {
        email : signin_email.value,
        password : signin_password.value
    }
    auth.signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
        document.getElementById("signinform").style.display = "none";
        document.getElementById("spinner").style.display = "block";
        window.location.assign("https://uit-project-blood-bank.firebaseapp.com/home.html"); 
    })
    .catch(err => {
        const error = err.code;
        if(error == "auth/invalid-email"){
            var signin_msg = "Please Write Email And Password <b>!</b>"
            wrap_response_signin.style.display = "block";
            response_signin.innerHTML = signin_msg;
        }else if(error == "auth/wrong-password"){
            var signin_msg = "Please Write Correct Password <b>!</b>"
            wrap_response_signin.style.display = "block";
            response_signin.innerHTML = signin_msg;
        }else if(error == "auth/user-not-found"){
            var signin_msg = "Please First Create Account <b>!</b>"
            wrap_response_signin.style.display = "block";
            response_signin.innerHTML = signin_msg;
        }
    })
    for(var i=0; i<signin_inputs.length; i++){
        signin_inputs[i].value = "";
    }
}

// function signOut
function signOut(){
    auth.signOut()
    .then(res =>{
        window.location.assign("https://uit-project-blood-bank.firebaseapp.com/index.html")
    })
}

// function password reset
function resetPassword(){
    auth.sendPasswordResetEmail(signin_email.value)
    .then(res => {
        var signin_msg = "Password Has Been Send On Your Email <b>!</b>"
        wrap_response_signin.style.display = "block";
        response_signin.innerHTML = signin_msg;
    })
    .catch(err => {
        const error = err.code;
        if(error == "auth/invalid-email"){
            var signin_msg = "Please Write Email <b>!</b>"
            wrap_response_signin.style.display = "block";
            response_signin.innerHTML = signin_msg;
        }else if(error == "auth/user-not-found"){
            var signin_msg = "Please First Create Account <b>!</b>"
            wrap_response_signin.style.display = "block";
            response_signin.innerHTML = signin_msg;
        }
        for(var i=0; i<signin_inputs.length; i++){
            signin_inputs[i].value = "";
        }
    })
}

//get  donor info function 
function get_donor_info(doc){
    var donor_list_table = document.querySelector("#donor-list-table");
    let  tr = document.createElement("tr");
    let div = document.createElement("div")
    div.setAttribute('id','circle-as-a-dp')
    let profile_letter = document.createElement("td");
    let firstname = document.createElement("td");
    let lastname = document.createElement("td");
    let gender = document.createElement("td");
    let bloodgroup = document.createElement("td");
    let detail = document.createElement("td");
    let detail_anchor = document.createElement("a");
    detail_anchor.setAttribute("href", "https://uit-project-blood-bank.firebaseapp.com/donorprofile.html");
    let detail_anchor_text = document.createTextNode("Visit Profile");
    detail_anchor.appendChild(detail_anchor_text);
    detail.appendChild(detail_anchor);

    // get first letter
    let first_char = doc.data().firstname.charAt(0).toUpperCase();
    let profile_letter_text = document.createTextNode(first_char)

    profile_letter.appendChild(div);
    div.appendChild(profile_letter_text)

    tr.setAttribute("id", 'tr'+doc.id)

    firstname.textContent = doc.data().firstname;
    lastname.textContent = doc.data().lastname;
    gender.textContent = doc.data().gender;
    bloodgroup.textContent = doc.data().bloodgroup;

    tr.appendChild(profile_letter);
    tr.appendChild(firstname);
    tr.appendChild(lastname);
    tr.appendChild(gender);
    tr.appendChild(bloodgroup);
    tr.appendChild(detail);

    donor_list_table.appendChild(tr);

    // get Donor id 
    let donor_id = detail_anchor.parentElement.parentElement.getAttribute("id");
    let donor_current_parent_element = detail_anchor.parentElement.parentElement;
    donor_current_parent_element.addEventListener('click', get_current_donor_id)
    function get_current_donor_id(){
        localStorage.setItem('current-donor-id', donor_id); 
    }
}

// get donor function
function get_donor(){
    fs.collection('donor').get()
    .then(snapshot => {
        document.getElementById("donorlist-wrapper").style.display = "block";
        document.getElementById("spinner").style.display = "none";
        snapshot.docs.forEach(doc => {
            get_donor_info(doc)
            var s_data = doc.data();
            var chk_length = Object.keys(s_data).length;
            if(chk_length > 0){
                document.getElementById('donor-no-result').style.display = "none";
                document.getElementById('donor-list-table-wrapper').style.display = "block";
            }
            
        })
    })
}

// get donor profile function 
function get_donor_profile(){
    let get_current_donor_id_from_strg = localStorage.getItem('current-donor-id');
    let get_current_donor_id_from_strg_cleartr = get_current_donor_id_from_strg.slice(2);
    
    fs.collection('donor').doc(get_current_donor_id_from_strg_cleartr).get()
    .then(doc => {
        get_donor_profile_current_all_detail(doc);
        document.getElementById("donorprofile-wrapper").style.display = "block";
        document.getElementById("spinner").style.display = "none";
    })
}

//  function get_donor_profile_current_all_detail 
function get_donor_profile_current_all_detail(doc){
    
    let firstname_lastname = document.getElementById("firstname-lastname");
    let email = document.getElementById("email");
    let phonenumber = document.getElementById("phonenumber");
    let age = document.getElementById("age");
    let weight = document.getElementById("weight");
    let gender = document.getElementById("gender");
    let bloodgroup = document.getElementById("bloodgroup");
    let city = document.getElementById("city");

    firstname_lastname.textContent = doc.data().firstname + "  "+ doc.data().lastname;
    email.textContent = doc.data().email;
    phonenumber.textContent = doc.data().phonenumber;
    age.textContent = doc.data().age;
    weight.textContent = doc.data().weight;
    gender.textContent = doc.data().gender;
    bloodgroup.textContent = doc.data().bloodgroup;
    city.textContent = doc.data().city;

}


