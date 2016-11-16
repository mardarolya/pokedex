var Pokedex;
(function (Pokedex) {
    'use strict';
    var pokemon = angular.module("Pokedex", ["ui.router", "Pokedex.ViewPokemon"])
        .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('Pokemon', {
            url: "/Pokemon?pokemonId",
            templateUrl: "views/pokemon-lg/pokemon-lg.html",
            controller: "pokemonView",
            controllerAs: "c"
        });
        // $urlRouterProvider.otherwise('/Pokemon');
    });
    ;
    var PokemonList = (function () {
        function PokemonList($http) {
            this.http = $http;
            this.nextChank = "http://pokeapi.co/api/v1/pokemon/?limit=12";
            this.list = [];
            this.loading = document.querySelector(".loading");
            this.loadData();
        }
        PokemonList.prototype.loadData = function () {
            var _this = this;
            this.loading.style.display = "block";
            this.http.get(this.nextChank)
                .success(function (data) { return _this.goToData(data); });
        };
        PokemonList.prototype.goToData = function (data) {
            this.nextChank = "http://pokeapi.co" + data.meta.next;
            var container = document.querySelector(".contain-pokemon");
            for (var i = 0, max = data.objects.length; i < max; i++) {
                var types = [];
                var pok = data.objects[i].types;
                for (var i_1 = 0, max_1 = pok.length; i_1 < max_1; i_1++) {
                    types.push(pok[i_1].name);
                }
                var imagePok = "http://pokeapi.co/media/img/" + data.objects[i].pkdx_id + ".png";
                this.list.push({ name: data.objects[i].name,
                    image: imagePok,
                    type: types,
                    id: data.objects[i].pkdx_id });
            }
            this.loading.style.display = "none";
        };
        return PokemonList;
    }());
    pokemon.controller("pokemonList", PokemonList);
})(Pokedex || (Pokedex = {}));
