import CountryClass from "./CountryClass.js";
import { autocomplete } from "./autocomplete.js";
import { declareBtns } from "./burger.js";
import { declareEvents } from "./eventHandler.js";

let countries_ar =[];
let firstCountries = ["Israel", "United States","Thailand", "United Kingdom", "France"];
const init = () => {
    
    getAllCountries();
    declareBtns();
    declareEvents();
    // showFirstCountries();
}



const getAllCountries = async () => {
    let url = `https://restcountries.com/v3.1/all`;
  let resp = await fetch(url);
  let data = await resp.json();
  data = data.filter (item => item.name.common!="Palestine");

  console.log(data);
  countries_ar = _.sortBy(data, 'name.common');
  showFirstCountries();
//   console.log(countries_ar);
  autocomplete(countries_ar);
  fillSelect();
    // creatAllProducts(data);
}

const fillSelect = () => {
    let select = document.querySelector("#id_select");
    countries_ar.forEach((item) => {
        select.innerHTML+=`
        <option id="id_option" value="${item.name.common}">${item.name.common} </option>`
    })
}

export const showFirstCountries = () => {
    // console.log(countries_ar);
    let countries = countries_ar.filter((item)=>
        firstCountries.includes(item.name.common));
        console.log(countries);
    countries.forEach(element => {
        let country = new CountryClass ("#id_preview" , element);
        console.log(country);
        country.renderFew();
    });
}

const showCountryFromBorder =(_country) => {
    cleanHtml("#id_parent");
    showCountryByName(_country);
}


export const expandBorders = (_borders) => {
    if (_borders == null){
        return "None"
    }
    
        const longBorders = countries_ar.filter(country => _borders.includes(country.cca3));
    //    return longBorders;
        const stringBorders = [];

        longBorders.forEach(border => {
            let fullName = border.name.common;
            // let borderLink = '<a href="#" onclick="showCountryByName('+fullName+')"'+'>'+fullName.slice(1,fullName.length-1)+'</a>';
            // let borderLink = '<a href="#" id="id_border_'+fullName + '"> '+fullName +' </a>';
            stringBorders.push(fullName);

           
            // let borderLink = '<a onclick="showCountryFromBorder('+fullName+')"> ' +fullName +' </a>';
            
            // let parent = document.querySelector("#id_border_list");
            
        })
    
    return stringBorders;


}

export const showCountryByName = (_name) => {
    let flag = false;
    console.log("app atlas. country name: " , _name);
    countries_ar.forEach(element => {
        // console.log (element.name.common);
        if (element.name.common==_name){
            let country = new CountryClass ("#id_parent" , element);
            country.renderOne();
            flag=true;
        }     
    });
    if (flag==false){
        renderNone();
    }
}

export const createCountry = (_countryData) => {
    let country = new CountryClass ("#id_parent", _countryData[0]);
    country.renderOne();

}

export const cleanHtml = (_parent) => {
    let nav_open = document.querySelector("#nav_open");
    if (nav_open.style.display == "block"){
        nav_open.style.display = "none";
    }
    let parent = document.querySelector(_parent);
    parent.innerHTML = "";
}

const renderNone = () => {
    console.log("entered render none");
    cleanHtml("#id_parent");
    cleanHtml("#id_preview");
    let myDiv = document.createElement("div");
      // myDiv.className = "col-md-4 p-2";
      document.querySelector("#id_parent").append(myDiv);
      myDiv.innerHTML = `
      <div class="d-flex justify-content-between p-3">
        <div id="id_info" class="py-3">
            <h2> Sorry, </h2>
            <p> there is no country by that name.</p>
        </div>
      `

}

init();