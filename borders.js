import { cleanHtml, showCountryByName } from "./appAtlas";

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
            let borderLink = '<a href="#" onclick="showCountryFromBorder('+fullName+')"> '+fullName +' </a>';
            stringBorders.push(borderLink);

          
            // let borderLink = '<a onclick="showCountryFromBorder('+fullName+')"> ' +fullName +' </a>';
            
            // let parent = document.querySelector("#id_border_list");
            
        })
    
    return stringBorders.toString();
}

const showCountryFromBorder =(_country) => {
    cleanHtml("#id_parent");
    showCountryByName(_country);
}