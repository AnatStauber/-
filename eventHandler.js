import { cleanHtml,showCountryByName,showFirstCountries } from "./appAtlas.js";

export const declareEvents = () => {
    let src_btn = document.querySelector("#src_btn");
    src_btn.style.cursor = "pointer";
    let logo = document.querySelector("#id_logo");
    logo.style.cursor = "pointer";
    let israel = document.querySelector("#id_israel");
    israel.style.cursor = "pointer";
    let usa = document.querySelector("#id_usa");
    usa.style.cursor = "pointer";
    let france = document.querySelector("#id_france");
    france.style.cursor = "pointer";
    let thailand = document.querySelector("#id_thailand");
    thailand.style.cursor = "pointer";
    let uk = document.querySelector("#id_uk");
    uk.style.cursor = "pointer";
    let select_option = document.querySelector("#id_select");    

    select_option.addEventListener("change" , () => {
        let i = select_option.selectedIndex;
        let country = select_option[i].text;
        cleanHtml("#id_parent");
        cleanHtml("#id_preview");
        showCountryByName(country);
        select_option.selectedIndex=0;
    })


    src_btn.addEventListener("click",() => {
       let src_input = document.querySelector("#src_input");
       let country = src_input.value;
       console.log(country);
       cleanHtml("#id_parent");
       cleanHtml("#id_preview");
       showCountryByName(country);
    })

    logo.addEventListener("click", ()=> {
        cleanHtml("#id_parent");
        cleanHtml("#id_preview");
        showFirstCountries();
    })
    
    france.addEventListener("click", ()=> {
        cleanHtml("#id_parent");
        cleanHtml("#id_preview");
        showCountryByName("France");
    })
    usa.addEventListener("click", ()=> {
        cleanHtml("#id_parent");
        cleanHtml("#id_preview");
        showCountryByName("United States");
    })
    uk.addEventListener("click", ()=> {
        cleanHtml("#id_parent");
        cleanHtml("#id_preview");
        showCountryByName("United Kingdom");
    })
    thailand.addEventListener("click", ()=> {
        cleanHtml("#id_parent");
        cleanHtml("#id_preview");
        showCountryByName("Thailand");
    })
    israel.addEventListener("click", ()=> {
        cleanHtml("#id_parent");
        cleanHtml("#id_preview");
        showCountryByName("Israel");
    })
    
}