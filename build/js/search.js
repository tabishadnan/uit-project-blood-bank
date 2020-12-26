auth.onAuthStateChanged(user => {
    if(user == null){
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


function search_result_current(){

    // get search bloodgroup and city
    var search_bloodgroup_get = localStorage.getItem('search-blood-group');
    var search_city_get = localStorage.getItem('search-blood-city');
    fs.collection('donor').where("bloodgroup", "==", search_bloodgroup_get).where("city", "==", search_city_get).get()
    .then(snapshot => {
        document.getElementById("serachresult-wrapper").style.display = "block";
        document.getElementById("spinner").style.display = "none";
        snapshot.docs.forEach(doc => {
            search_donor_info(doc)
            var s_data = doc.data();
          var chk_length = Object.keys(s_data).length;
          if(chk_length > 0){
            document.getElementById('search-no-result').style.display = "none";
            document.getElementById('search-card-result-wrapper').style.display = "block";
        }
        })
    })
}

//get  donor info function 
function search_donor_info(doc){

    firstname_lastname_txt = doc.data().firstname + "  "+ doc.data().lastname;
    email_txt = doc.data().email;
    phonenumber_txt = doc.data().phonenumber;
    age_txt = doc.data().age;
    gender_txt = doc.data().gender;
    weight_txt = doc.data().weight;
    bloodgroup_txt = doc.data().bloodgroup;
    city_txt = doc.data().city;


    let div_row = document.getElementById('search-card-result-wrapper');
    let div_card = document.createElement('div');
        div_card.setAttribute('class', 'card')
        div_card.setAttribute('id', 'card-wrapper-search-result')


    let heading_one = document.createElement('h1');
    let firstname_lastname = document.createTextNode(firstname_lastname_txt)
    let span_icon_span = document.createElement('span');
    let span_icon = document.createElement('i');
        span_icon.setAttribute('class', 'fa fa-user');
        span_icon_span.appendChild(span_icon);
        heading_one.appendChild(span_icon_span);
        heading_one.appendChild(firstname_lastname);

    let email_p = document.createElement("p");
    let email = document.createTextNode(email_txt)
    let span_icon_E_span = document.createElement('span');
    let span_icon_E = document.createElement('i');
        span_icon_E.setAttribute('class', 'fa fa-envelope');
        span_icon_E_span.appendChild(span_icon_E);
        email_p.appendChild(span_icon_E_span);
        email_p.appendChild(email);


    let phonenumber_p = document.createElement("p");
    let phonenumber = document.createTextNode(phonenumber_txt)
    let span_icon_PH_span = document.createElement('span');
    let span_icon_PH = document.createElement('i');
        span_icon_PH.setAttribute('class', 'fa fa-phone');
        span_icon_PH_span.appendChild(span_icon_PH);
        phonenumber_p.appendChild(span_icon_PH_span);
        phonenumber_p.appendChild(phonenumber);


    let age_p = document.createElement("p");
    let age = document.createTextNode(age_txt)
    let span_icon_AG_span = document.createElement('span');
    let span_icon_AG = document.createElement('i');
        span_icon_AG.setAttribute('class', 'fa fa-universal-access');
        span_icon_AG_span.appendChild(span_icon_AG);
        age_p.appendChild(span_icon_AG_span);
        age_p.appendChild(age);


    let weight_p = document.createElement("p");
    let weight = document.createTextNode(weight_txt)
    let span_icon_WT_span = document.createElement('span');
    let span_icon_WT = document.createElement('i');
        span_icon_WT.setAttribute('class', 'fa fa-balance-scale');
        span_icon_WT_span.appendChild(span_icon_WT);
        weight_p.appendChild(span_icon_WT_span);
        weight_p.appendChild(weight);


    let gender_p = document.createElement("p");
    let gender = document.createTextNode(gender_txt)
    let span_icon_GR_span = document.createElement('span');
    let span_icon_GR = document.createElement('i');
        span_icon_GR.setAttribute('class', 'fa fa-gg-circle');
        span_icon_GR_span.appendChild(span_icon_GR);
        gender_p.appendChild(span_icon_GR_span);
        gender_p.appendChild(gender);


    let bloodgroup_p = document.createElement("p");
        bloodgroup_p.setAttribute('id', 'custom-css-bgrp');
    let bloodgroup = document.createTextNode(bloodgroup_txt)
        bloodgroup_p.appendChild(bloodgroup);
        

    let city_p = document.createElement("p");
    let city = document.createTextNode(city_txt)
    let span_icon_CIT_span = document.createElement('span');
    let span_icon_CIT = document.createElement('i');
        span_icon_CIT.setAttribute('class', 'fa fa-compass');
        span_icon_CIT_span.appendChild(span_icon_CIT);
        city_p.appendChild(span_icon_CIT_span);
        city_p.appendChild(city);



    div_card.appendChild(heading_one);    
    div_card.appendChild(email_p);    
    div_card.appendChild(phonenumber_p);    
    div_card.appendChild(age_p);    
    div_card.appendChild(gender_p);  
    div_card.appendChild(weight_p);      
    div_card.appendChild(bloodgroup_p);    
    div_card.appendChild(city_p);    

    div_row.appendChild(div_card);
}

