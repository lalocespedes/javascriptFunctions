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
        vm.post.taxes = [];

        vm.post.taxes = [
            {
                "tax_rate_id": 1,
                "tax_rate_name": 'IVA',
                "tax_rate_percent": '16.00',
                "tax_type": "T",
                "tax_name": "IVA"
            },
            {
                "tax_rate_id": 5,
                "tax_rate_name": 'ISR',
                "tax_rate_percent": '-10.00',
                "tax_type": "R",
                "tax_name": "RETENCION ISR"
            },
            {
                "tax_rate_id": 6,
                "tax_rate_name": 'ISH',
                "tax_rate_percent": '3.00',
                "tax_type": "TL",
                "tax_name": "ISH"
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

                vm.post.taxes.push(vm.selectedTax);

                vm.taxes.splice(vm.taxes.indexOf(vm.selectedTax), 1);

                // vm.selectedTax = _.first(vm.taxes);
                vm.post.taxes = _.compact(vm.post.taxes);

                if (!vm.taxes.length) {

                    angular.element('#selectTax').attr('disabled', true);
                    return false;

                }

            };

            vm.removeselect = function(value) {

                vm.taxes.push(value);

                vm.post.taxes.splice(value, 1);

                console.log(value);

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
