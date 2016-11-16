declare var angular: any;

module Pokedex.ViewPokemon {
    'use strict'; 

    var pList = angular.module("Pokedex.ViewPokemon", ["ui.router"]);

    class PokemonView {
    	private id: number;
        private listProperty: any;
    	private http: any;
        private loading: any;
        private pokemonName: string;
        private pokemonImage: string;

        private view: any;

    	constructor($stateParams, $http){
            this.id = $stateParams.pokemonId;
			this.http = $http;
            var url = "http://pokeapi.co/api/v1/pokemon/" + this.id;
            this.listProperty = [];
            this.loading = document.querySelector(".loading");
            this.loading.style.display = "block";
            this. view = document.querySelector(".view-pokemon");
            this.view.style.display = "none";
            this.http.get(url).success((data: any) => this.allInfo(data));  
    	}

    	public allInfo(data: any) {
           this.pokemonName = data.name;
           this.pokemonImage = "http://pokeapi.co/media/img/"+data.pkdx_id+".png"; 
           let listOfTypes = "";
           for (let i = 0, max = data["types"].length; i < max; i++) {
               if (listOfTypes == "") {
                   listOfTypes = data.types[i].name
               } else {
                   listOfTypes += "," + data.types[i].name
               }
           }
           this.listProperty.push({property: "Type", value: listOfTypes});
           this.listProperty.push({property: "Attack", value: data["attack"]});
           this.listProperty.push({property: "Defense", value: data["defense"]});
           this.listProperty.push({property: "HP", value: data["hp"]});
           this.listProperty.push({property: "SP Attack", value: data["sp_atk"]});
           this.listProperty.push({property: "SP Defense", value: data["sp_def"]});
           this.listProperty.push({property: "Speed", value: data["speed"]});
           this.listProperty.push({property: "Weight", value: data["weight"]});
           this.listProperty.push({property: "Total moves", value: data["total"]});

           this.loading.style.display = "none";
           this.view.style.display = "block";

           this.centerBlock();
        }    	

        public centerBlock(){
           let block = document.querySelector(".view-pokemon");
           if (document.documentElement.clientWidth > 990) {
                let container = document.querySelector(".container"); 
                let coord = container.getBoundingClientRect();   
                block.style.right = (coord.left + 60) + "px";
                block.style.transform = "translateY(-50%)";
                block.style.width = "30%";
           } else {
                block.style.right = "50%";
                block.style.transform = "translate(50%, -50%)";
                block.style.width = "80%";
            }

            block.style.display = "block";
            
        }

        public closeWindow() {
           let block = document.querySelector(".view-pokemon");
           block.style.display = "none"; 
        }
    }

    pList.controller("pokemonView", PokemonView);
}