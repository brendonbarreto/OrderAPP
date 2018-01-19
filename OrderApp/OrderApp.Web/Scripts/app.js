const angular = require('angular');

require('angular-route');
require('angular-sanitize');
require('angular-messages');
require('angular-material');

'use strict';
var app = angular.module('OrderApp', ['ngMaterial', 'ngSanitize', 'ngRoute', 'ngMessages']);

//Enviroment setup
app
	.config(function ($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('blue');
	});

//Services
app
	.service("CustomerService", ["$http", function ($http) {
		let $this = this;
		$this.defaultNames = ["Darth Vader", "Obi-Wan Kenobi", "Luke Skywalker", "Imperador Palpatine", "Han Solo"];
		$this.getAll = () => {
			return $http.get("/api/customer/getAll").then((result) => {
				return result.data;
			});
		};
	}])
	.service("LocalizationService", [function () {
		let $this = this;
		$this.culture = 'pt';
		const cultureTexts = [{
			culture: "pt",
			texts: [
				{
					Low: "Baixa",
					LowValue: "Valor muito abaixo do preço do produto",
					Medium: "Boa",
					MediumMessage: "Valor adequado com o preço do produto",
					High: "Ótima",
					HighMessage: "Valor acima do preço do produto",
					OrderNotFound: "Pedido não encontrado",
					VerifyInputID: "Verifique se você digitou o ID do pedido corretamente",
					OK: "OK",
					CancelConfirmation: "Tem certeza que deseja cancelar?",
					UnsavedChangesWillBeLost: "As alterações não salvas serão perdidas",
					OrderWillBeLost: "Todas informações relacionadas ao pedido serão perdidas",
					Yes: "Sim",
					No: "Não",
					RemoveConfirmation: "Tem certeza que deseja remover?",
					ItemWillBeRemoved: "O item será removido do pedido. Você pode adicionar ele novamente a qualquer momento"
				}
			]
		}]

		const getCultureTexts = (culture) => {
			return cultureTexts.find(ct => {
				return ct.culture == culture
			});
		}

		$this.getText = (text, culture) => {
			var ct = getCultureTexts(culture || $this.culture);
			return ct.texts.find(tx => {
				return !!tx[text];
			})[text];
		}
	}])
	.service("ProductService", ["$http", function ($http) {
		let $this = this;
		$this.getAll = () => {
			return $http.get("/api/product/getAll").then((result) => {
				return result.data;
			});
		};
	}])
	.service("RedirectService", ["$window", "$mdDialog", function ($window, $mdDialog) {
		let $this = this;
		$this.new = () => {
			$window.location.href = "/new";
		}

		$this.edit = (id) => {
			$window.location.href = `/edit?orderId=${id}`;
		}

		$this.github = () => {
			$window.open("https://github.com/brendonbarreto");
		}

		$this.updateURL = (url) => {
			$window.history.pushState(null, 'any', url);
		}

		$this.editDialog = () => {
			const dialog = {
				controller: 'SelectOrderController',
				templateUrl: '/Home/RenderTemplate?viewName=SelectOrder',
				parent: angular.element(document.body),
				clickOutsideToClose: true
			};

			$mdDialog.show(dialog);
		}
	}])
	.service("OrderService", ["$http", function ($http) {
		let $this = this;
		$this.save = (obj) => {
			var order = {
				id: obj.id,
				customerId: obj.customer.id,
				items: obj.items.map(it => {
					return {
						id: it.id,
						productId: it.product.id,
						amount: it.amount,
						unitValue: it.unitValue,
						orderId: obj.id,
						removed: it.removed
					}
				})
			};


			return $http.post("/Home/Save", order).then((result) => {
				return result.data;
			});
		};
	}])
	.service("OrderItemService", ["$http", "LocalizationService", function ($http, LocalizationService) {
		let $this = this;

		$this.profitability = {
			all: [
				{
					code: "low",
					name: LocalizationService.getText("Low"),
					message: LocalizationService.getText("LowValue"),
					color: "#E57373",
					icon: "sentiment_dissatisfied",
					matches: (itemCost, productCost) => {
						return itemCost < (productCost * 0.9);
					}
				},
				{
					code: "medium",
					name: LocalizationService.getText("Medium"),
					message: LocalizationService.getText("MediumMessage"),
					color: "#64B5F6",
					icon: "sentiment_satisfied",
					matches: (itemCost, productCost) => {
						return itemCost >= (productCost * 0.9) && itemCost <= productCost;
					}
				},
				{
					code: "high",
					name: LocalizationService.getText("High"),
					message: LocalizationService.getText("HighMessage"),
					color: "#8BC34A",
					icon: "sentiment_very_satisfied",
					matches: (itemCost, productCost) => {
						return itemCost > productCost;
					}
				}
			],
			find: (itemCost, productCost) => {
				return $this.profitability.all.find((pft) => {
					return pft.matches(itemCost, productCost);
				});
			}
		}
	}]);

//Controllers
app
	.controller('OrderFormController', ['$scope', '$mdDialog', '$window', '$mdToast', 'CustomerService', 'OrderService', 'RedirectService', 'OrderItemService', 'LocalizationService', function ($scope, $mdDialog, $window, $mdToast, CustomerService, OrderService, RedirectService, OrderItemService, LocalizationService) {
		$scope.customers = [];

		if ($window.itemToEdit) {
			$scope.obj = $window.itemToEdit;
			$scope.obj.items.forEach(it => {
				it.profitability = OrderItemService.profitability.find(it.unitValue, it.product.unitValue);
			});
		} else {
			$scope.obj = {
				items: []
			};
		}
		$scope.obj = $window.itemToEdit || {
			items: []
		};

		if ($window.errorMessage) {
			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title(LocalizationService.getText("OrderNotFound"))
					.textContent(LocalizationService.getText("VerifyInputID"))
					.ok(LocalizationService.getText("OK"))
			);
		}

		CustomerService.getAll().then((r) => {
			$scope.customers = r;
			$scope.loading = false;
		});

		$scope.getCustomerPicture = (customer) => {
			const path = "/images/"
			const defaultPic = path + "user.svg";
			if (customer && CustomerService.defaultNames.includes(customer.name)) {
				return path + customer.name + ".jpeg";
			}

			return defaultPic;
		}

		$scope.filterCustomers = () => {
			if ($scope.customerSearch) {
				const custumerWithSameId = $scope.customers.find((customer) => $scope.customerSearch == customer.id);
				if (custumerWithSameId) {
					return [custumerWithSameId];
				} else {
					return $scope.customers.filter((customer) => customer.name.toUpperCase().includes($scope.customerSearch.toUpperCase()));
				}
			} else {
				return $scope.customers;
			}
		}

		$scope.openOrderItemPopup = (ev, itemToEdit) => {
			const dialog = {
				controller: 'AddEditItemController',
				templateUrl: '/Home/RenderTemplate?viewName=AddEditItemPopup',
				parent: angular.element(document.body),
				targetEvent: ev,
				locals: {
					item: itemToEdit
				},
				clickOutsideToClose: true
			};

			$mdDialog.show(dialog).then(function (item) {
				if (item.index) {
					$scope.obj.items = $scope.obj.items.filter(it => it.index != item.index);
					$scope.obj.items.push(item);
				} else {
					item.index = $scope.obj.items.length + 1;
					$scope.obj.items.push(item);
				}
			});
		}

		$scope.cancelOrder = (ev) => {
			const isEdit = $scope.obj.id > 0;
			var confirm = $mdDialog.confirm()
				.title(LocalizationService.getText("CancelConfirmation"))
				.textContent(isEdit
					? LocalizationService.getText("UnsavedChangesWillBeLost")
					: LocalizationService.getText("OrderWillBeLost"))
				.targetEvent(ev)
				.ok(LocalizationService.getText("Yes"))
				.cancel(LocalizationService.getText("No"));

			$mdDialog.show(confirm).then(function () {
				if ($scope.obj.id > 0) {
					RedirectService.new();
				} else {
					$scope.obj = {
						items: []
					};
				}
			});
		}

		$scope.removeItem = (ev, item) => {
			const confirm = $mdDialog.confirm()
				.title(LocalizationService.getText("RemoveConfirmation"))
				.textContent(LocalizationService.getText("ItemWillBeRemoved"))
				.targetEvent(ev)
				.ok(LocalizationService.getText("Yes"))
				.cancel(LocalizationService.getText("No"));

			$mdDialog.show(confirm).then(function () {
				if (item.id) {
					item.removed = true;
				} else {
					$scope.obj.items = $scope.obj.items.filter(it => it != item);
				}
			});
		}

		$scope.confirmOrder = (ev) => {
			OrderService.save($scope.obj).then(result => {
				if (result.status) {
					const dialog = {
						controller: 'OrderDoneController',
						templateUrl: '/Home/RenderTemplate?viewName=OrderDone',
						parent: angular.element(document.body),
						targetEvent: ev,
						locals: {
							orderId: result.data,
							isEdit: $scope.obj.id > 0
						},
						clickOutsideToClose: false
					};

					$mdDialog.show(dialog);
				} else {
					$mdToast.showSimple(result.message);
				}
			});
		}

		const getVisibleItems = () => {
			return $scope.obj.items.filter(it => !it.removed);
		}

		$scope.getProductsTotalValue = () => {
			return getVisibleItems().reduce((a, b) => {
				return a + (b.product.unitValue * b.amount);
			}, 0)
		}

		$scope.getOrderTotalValue = () => {
			return getVisibleItems().reduce((a, b) => {
				return a + (b.unitValue * b.amount);
			}, 0)
		}

		$scope.getOrderProfitability = () => {
			return OrderItemService.profitability.find($scope.getOrderTotalValue(), $scope.getProductsTotalValue());
		}
	}])
	.controller('AddEditItemController', ['$scope', '$mdDialog', 'ProductService', "OrderItemService", "item", function ($scope, $mdDialog, ProductService, OrderItemService, item) {
		$scope.isEdit = !!item;
		ProductService.getAll().then((r) => {
			$scope.products = r;

			if (item) {
				$scope.obj = {
					product: $scope.products.find(prod => {
						return prod.id == item.product.id;
					}),
					unitValue: item.unitValue,
					amount: item.amount,
					profitability: item.profitability,
					index: item.index,
					removed: item.removed,
					id: item.id
				}
			} else {
				$scope.obj = {
					removed: false
				};
			}
		});

		$scope.changeProfitability = () => {

			if ($scope.obj.product && $scope.obj.unitValue) {
				$scope.obj.profitability = OrderItemService.profitability.find($scope.obj.unitValue, $scope.obj.product.unitValue);
			} else {
				$scope.obj.profitability = null;
			}
		}

		$scope.changeProduct = (ev) => {

			if ($scope.obj.product) {
				$scope.obj.unitValue = $scope.obj.product.unitValue;
			}

			$scope.changeProfitability();
		}

		$scope.confirm = () => {
			$mdDialog.hide($scope.obj);
		}

	}])
	.controller('ToolbarController', ['$scope', 'RedirectService', function ($scope, RedirectService) {
		$scope.redirect = RedirectService;
	}])
	.controller('OrderDoneController', ['$scope', 'RedirectService', 'orderId', 'isEdit', function ($scope, RedirectService, orderId, isEdit) {
		$scope.orderId = orderId;
		$scope.isEdit = isEdit;

		$scope.redirect = RedirectService;
	}])
	.controller('SelectOrderController', ['$scope', 'RedirectService', function ($scope, RedirectService) {
		$scope.confirm = () => {
			RedirectService.edit($scope.id);
		}
	}]);



//Directives
app
	.directive('minValue', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function ($scope, $elm, $attrs, ctrl) {

				const validate = (value) => {
					var minValue = $attrs.minValue;

					if (!value || !minValue) {
						ctrl.$setValidity('minValue', true);
					} else {
						ctrl.$setValidity('minValue', (value.replace ? parseFloat(value.replace(/,/g, '')) : value) >= parseFloat(minValue));
					}

					return value;
				}

				ctrl.$parsers.unshift(validate);
				ctrl.$formatters.push(validate);

				$attrs.$observe('minValue', function () {
					return validate(ctrl.$viewValue);
				});
			}
		};
	})
	.directive('multiplier', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function ($scope, $elm, $attrs, ctrl) {

				const validate = (orderValue) => {
					var multiplier = $attrs.multiplier;

					if (!orderValue || !multiplier) {
						ctrl.$setValidity('multiplier', true);
					} else {
						ctrl.$setValidity('multiplier', parseInt(orderValue) % parseInt(multiplier) == 0);
					}

					return orderValue;
				}

				ctrl.$parsers.unshift(validate);
				ctrl.$formatters.push(validate);

				$attrs.$observe('multiplier', function () {
					return validate(ctrl.$viewValue);
				});
			}
		};
	})
	.directive('imgFallback', function imgFallback() {
		return {
			link: function (scope, element, attrs) {
				element.bind('error', function () {
					if (attrs.src != attrs.imgFallback) {
						attrs.$set('src', attrs.imgFallback);
					}
				});
			}
		}
	});