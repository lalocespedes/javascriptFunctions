(function () {
    'use strict';

    angular.module('lalocespedes', [
        'ngResource',
        'ui.router'
    ]);
})();

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .config(RouterConfig)

    /** @ngInject */
    function RouterConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'js/templates/home.html'
            })
            .state('superheroes', {
                url: '/superheroes',
                controller: 'MainController',
                controllerAs: 'vm',
                templateUrl: 'js/templates/superheroes.html'
            })
            .state('people', {
                url: '/people',
                controller: 'PeopleController',
                controllerAs: 'vm',
                templateUrl: 'js/templates/people.html'
            })
            .state('people.profile', {
                url: '/:profile',
                templateUrl: 'js/templates/people.profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })
            .state('taxes', {
                url: '/taxes',
                templateUrl: 'js/templates/taxes.html',
                controller: 'TaxesController',
                controllerAs: 'vm'
            });
    }

} ());

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .service('Superheroes', Superheroes)

    /** @ngInject */
    function Superheroes($resource) {

        return $resource("http://localhost:3000/api/superheroes");
    }

} ());

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .service('People', People)

    /** @ngInject */
    function People($resource) {

        return $resource("http://localhost:3000/api/people");
    }

} ());

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .controller('MainController', MainController);

    MainController.$inject = ['Superheroes'];
    function MainController(Superheroes) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            Superheroes.query()
                .$promise.then(function (response) {

                    vm.superheroes = response;

                });

        }
    }
})();


(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .controller('PeopleController', PeopleController);

    PeopleController.$inject = ['People'];
    function PeopleController(People) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            People.query()
                .$promise.then(function (response) {

                    vm.people = response;

                });

            vm.selectPeople = function (value) {

                _(vm.people).each(function (person) {
                    person.selected = false;
                    if (value === person) {
                        value.selected = true;
                    }
                });

            };

        }
    }
})();

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$stateParams', 'People'];
    function ProfileController($stateParams, People) {
        var vm = this;


        activate();

        ////////////////

        function activate() {


            People.query().$promise.then(function (response) {

                vm.profile = response.reduce(function (all, item, index) {

                    if (item._id == $stateParams.profile) {

                        return item;

                    }

                    return all;
                }, 0);
            });

        }
    }
})();

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .controller('TaxesController', TaxesController);

    TaxesController.$inject = ['TaxesService'];
    function TaxesController(TaxesService) {
        var vm = this;

        vm.post = {};

        vm.post.taxes = [
            {
                "tax_rate_id": 1,
                "tax_rate_name": 'IVA',
                "tax_rate_percent": '16.00',
                "tax_type": "T",
                "tax_name": "IVA"
            }
        ];

        activate();

        ////////////////

        function activate() {

            TaxesService.query().$promise.then(function (response) {

                vm.taxes = response;

                _(vm.taxes).each(function (taxes, keyt) {

                    _(vm.post.taxes).each(function (post, keyp) {

                        if (angular.toJson(vm.taxes[keyt]) == angular.toJson(vm.post.taxes[keyp])) {
                            vm.taxes.splice(keyt, 1);
                        }

                    });

                });

                // vm.taxes = vm.taxes.filter(function (all, item, index) {

                //     if(item.tax_rate_id != 1) {

                //         return item;

                //     }

                //     return all;

                // });

                // vm.selectedTax = _.first(vm.taxes);

            });

            vm.addselect = function (value) {

                if(!vm.amount) {

                    if(!window.Notification) {
                        console.log('no allow');
                    } else {

                        Notification.requestPermission(function(p) {

                            var notify = new Notification('Falta el monto', {
                                body: 'Checalo por favor'
                            });

                            notify.onclick = function() {

                                console.log('click');

                                notify.close();

                            };

                        });

                    }

                    console.log('captura un monto');
                    return false;

                }

                var del = parseInt(vm.taxes.indexOf(vm.selectedTax));

                var nuevo = vm.taxes.map(function(item) {

                    return item;

                });

                nuevo.splice(del, 1);

                vm.taxes = nuevo;

                vm.selectedTax.amount = vm.amount;

                vm.post.taxes.push(angular.fromJson(vm.selectedTax));

                vm.post.taxes = _.compact(vm.post.taxes);

                vm.amount = "";

                if (!vm.taxes.length) {

                    angular.element('#selectTax').attr('disabled', true);
                    return false;

                }

            };

            vm.removeselect = function(value) {

                if (!vm.taxes.length) {

                    angular.element('#selectTax').attr('disabled', false);

                }

                vm.taxes.push(angular.fromJson(value));

                vm.post.taxes.splice(vm.post.taxes.indexOf(value), 1);

            };
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .service('TaxesService', TaxesService)

    /** @ngInject */
    function TaxesService($resource) {

        return $resource("http://localhost:3000/api/taxes");
    }

} ());
