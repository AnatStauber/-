import { cleanHtml,showCountryByName, expandBorders } from "./appAtlas.js";


export default class CountryClass{
    constructor(_parent,_item){
      this.parent = _parent;
      this.name = _item.name.common;
      this.population = _item.population;
      this.capital = _item.capital;
      this.flag = _item.flags.png;
      this.alt = _item.flags.alt;
      this.map = _item.maps.googleMaps;
      this.language = _item.languages;
      this.lat = _item.latlng[0];
      this.lng=_item.latlng[1];
      this.borders =_item.borders; 
      this.countryCode = _item.cca3;
      this.area = _item.area;
    }
  

    renderOne(){

      let area = this.area;
      let zoom=6;
      if (area>250000){
        zoom=3;
      } else if (area>80000){
        zoom=5;
      }
      cleanHtml("#id_parent");
      cleanHtml("#id_preview");

      let long_borders = expandBorders(this.borders);
      let borders_arr = [];
      long_borders.forEach(item => {
        // if ( /\s/.test(item)){
        //   let id = 0;
        // }

      
        let id = item.toString().replace(/\s/g, '_');
        let borderLink = '<a href="#" id="id_border_'+id + '"> '+item +' </a>';
        borders_arr.push(borderLink);
      })    

      if (typeof this.language === 'object'){
        this.language = Object.values(this.language).toString();
      }

      if (typeof this.capital === 'object'){
        this.capital = Object.values(this.capital).toString();
      }

      let myDiv = document.createElement("div");
      myDiv.setAttribute("data-aos","fade-up");
      myDiv.setAttribute("data-aos-duration","2000");
      document.querySelector(this.parent).append(myDiv);
      
      myDiv.innerHTML = `
      <div class="d-flex flex-column-reverse flex-lg-row justify-content-between p-3">
        <div id="id_info" class="py-3 text-center text-lg-start">
            <h2 class="fw-bold"> ${this.name} </h2>
            <p> <strong>Population:</strong> ${this.population.toLocaleString()}</p>
            <p> <strong>Capital City:</strong> ${this.capital}</p>
            <p> <strong>Language:</strong> ${this.language}</p>
            <p  id="id_border_list" class="text-break"> <strong>Borders:</strong> ${borders_arr}</p>
        </div>
        <img id="id_flag" src="${this.flag}" alt="${this.alt}" class="ms-2 shadow align-self-center ">
      </div>
      <div id="map_id">
      <div class="loader mx-auto"></div>
      <iframe id="id_frame" class="w-100" src="https://www.google.com/maps?q=${this.lat},${this.lng}&z=${zoom}&amp;output=embed" height="350" allowfullscreen="" loading="lazy"referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      `
      let map = myDiv.querySelector("#id_frame")
      map.onload = () => {
        myDiv.querySelector(".loader").classList.add("d-none");
    }

    let borders = myDiv.querySelector("#id_border_list");
    
      
      long_borders.forEach(element => {
        console.log("start", element);
        let id = element.toString().replace(/\s/g, '_');
        console.log(id);
        let border_btn = borders.querySelector("#id_border_"+id);
        border_btn.addEventListener("click" , () =>{
          cleanHtml("#id_parent");
          showCountryByName(element);
        })
    })
  }

   

    renderFew(){
      let myDiv = document.createElement("div");
      myDiv.className = "col-lg-3 col-5 border border-dark border-2 bg-light bg-opacity-75 m-2 overflow-hidden";
      // myDiv.setAttribute("data-aos","fade-up");
      // myDiv.setAttribute("data-aos-duration","2000");
      
      document.querySelector(this.parent).append(myDiv);
      
      myDiv.innerHTML = `
      <div class="d-flex flex-column justify-content-between" >
          
            <img src="${this.flag}" alt="${this.alt}" class="p-2">
            <h2 class="text-center fw-bold"> ${this.name} </h2>
            <button class="btn btn-dark m-2" id="info_btn"> View More...</button>
              
        </div>
        
      </div>
      `

      let info_btn = myDiv.querySelector("#info_btn");
      info_btn.addEventListener("click",() => {
        cleanHtml("#id_preview");
        showCountryByName(this.name);
    })
    }
        
  

  }