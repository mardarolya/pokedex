var Pokedex;
(function (Pokedex) {
    var ViewPokemon;
    (function (ViewPokemon) {
        'use strict';
        var pList = angular.module("Pokedex.ViewPokemon", ["ui.router"]);
        var PokemonView = (function () {
            function PokemonView($stateParams, $http) {
                var _this = this;
                this.id = $stateParams.pokemonId;
                this.http = $http;
                var url = "http://pokeapi.co/api/v1/pokemon/" + this.id;
                this.listProperty = [];
                this.loading = document.querySelector(".loading");
                this.loading.style.display = "block";
                this.view = document.querySelector(".view-pokemon");
                this.view.style.display = "none";
                this.http.get(url).success(function (data) { return _this.allInfo(data); });
            }
            PokemonView.prototype.allInfo = function (data) {
                this.pokemonName = data.name;
                this.pokemonImage = "http://pokeapi.co/media/img/" + data.pkdx_id + ".png";
                var listOfTypes = "";
                for (var i = 0, max = data["types"].length; i < max; i++) {
                    if (listOfTypes == "") {
                        listOfTypes = data.types[i].name;
                    }
                    else {
                        listOfTypes += "," + data.types[i].name;
                    }
                }
                this.listProperty.push({ property: "Type", value: listOfTypes });
                this.listProperty.push({ property: "Attack", value: data["attack"] });
                this.listProperty.push({ property: "Defense", value: data["defense"] });
                this.listProperty.push({ property: "HP", value: data["hp"] });
                this.listProperty.push({ property: "SP Attack", value: data["sp_atk"] });
                this.listProperty.push({ property: "SP Defense", value: data["sp_def"] });
                this.listProperty.push({ property: "Speed", value: data["speed"] });
                this.listProperty.push({ property: "Weight", value: data["weight"] });
                this.listProperty.push({ property: "Total moves", value: data["total"] });
                this.loading.style.display = "none";
                this.view.style.display = "block";
                this.centerBlock();
            };
            PokemonView.prototype.centerBlock = function () {
                var block = document.querySelector(".view-pokemon");
                if (document.documentElement.clientWidth > 990) {
                    var container = document.querySelector(".container");
                    var coord = container.getBoundingClientRect();
                    block.style.right = (coord.left + 60) + "px";
                    block.style.transform = "translateY(-50%)";
                    block.style.width = "30%";
                }
                else {
                    block.style.right = "50%";
                    block.style.transform = "translate(50%, -50%)";
                    block.style.width = "80%";
                }
                block.style.display = "block";
            };
            PokemonView.prototype.closeWindow = function () {
                var block = document.querySelector(".view-pokemon");
                block.style.display = "none";
            };
            return PokemonView;
        }());
        pList.controller("pokemonView", PokemonView);
    })(ViewPokemon = Pokedex.ViewPokemon || (Pokedex.ViewPokemon = {}));
})(Pokedex || (Pokedex = {}));
