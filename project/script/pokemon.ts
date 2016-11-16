declare var angular: any;

module Pokedex {
    'use strict';

	var pokemon = angular.module("Pokedex", ["ui.router", "Pokedex.ViewPokemon"])
	.config(function ($stateProvider, $urlRouterProvider) {
			    $stateProvider
			    	.state('Pokemon', {
			      			url: "/Pokemon?pokemonId",
			      			templateUrl: "views/pokemon-lg/pokemon-lg.html",
			      			controller:"pokemonView",
	    					controllerAs: "c"
			    	});
			  // $urlRouterProvider.otherwise('/Pokemon');
			});;

	class PokemonList {
		private list: any;
        private http: any;
        private nextChank: string;
        private loading: any;

    	constructor($http){
             this.http = $http;
             this.nextChank = "http://pokeapi.co/api/v1/pokemon/?limit=12";
             this.list = [];
             this.loading = document.querySelector(".loading");
             this.loadData();             
    	}

    	public loadData(){
    		this.loading.style.display = "block";
    		this.http.get(this.nextChank)
    		.success((data: any) => this.goToData(data));
    	}

    	public goToData(data: any){
    		
    		this.nextChank = "http://pokeapi.co"+data.meta.next;
    		var container = document.querySelector(".contain-pokemon");
    		for (let i = 0, max = data.objects.length; i < max; i++) {
    			let types = [];
    			let pok = data.objects[i].types;

    			for(let i = 0, max = pok.length; i < max; i++) {
    				types.push(pok[i].name);
    			}
    			let imagePok = "http://pokeapi.co/media/img/"+data.objects[i].pkdx_id+".png";
    			this.list.push({name: data.objects[i].name,
    			                image: imagePok,
    			                type: types,
    			                id: data.objects[i].pkdx_id});
    		}

    		this.loading.style.display = "none";
    	}
	}

	pokemon.controller("pokemonList", PokemonList);
}