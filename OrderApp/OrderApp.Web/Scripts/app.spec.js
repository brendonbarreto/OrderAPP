describe('CustomerService', function () {
	var CustomerService;

	beforeEach(angular.mock.module('OrderApp'));

	beforeEach(inject(function (_CustomerService_) {
		CustomerService = _CustomerService_;
	}));

	it('should exist', function () {
		expect(CustomerService).toBeDefined();
	});

	it('defaultNames should exist', function () {
		expect(CustomerService.defaultNames).toBeDefined();
	});

	it('defaultNames should be an array', function () {
		expect(Array.isArray(CustomerService.defaultNames)).toBeTruthy();
	});

	it('defaultNames should have star wars characters', function () {
		expect(CustomerService.defaultNames).toEqual(["Darth Vader", "Obi-Wan Kenobi", "Luke Skywalker", "Imperador Palpatine", "Han Solo"]);
	});

	it('getall should exist', function () {
		expect(CustomerService.getAll).toBeDefined();
	});

	it('getall should return star wars characters', function () {
		CustomerService.getAll().then(function (value) {

			expect(true).toEqual([
				{
					id: 1,
					name: 'Darth Vader'
				},
				{
					id: 2,
					name: 'Obi-Wan Kenobi'
				},
				{
					id: 3,
					name: 'Luke Skywalker'
				},
				{
					id: 4,
					name: 'Imperador Palpatine'
				},
				{
					id: 5,
					name: 'Han Solo'
				}
			]);
		});
	});
});

describe('LocalizationService', function () {
	var LocalizationService;

	beforeEach(angular.mock.module('OrderApp'));

	beforeEach(inject(function (_LocalizationService_) {
		LocalizationService = _LocalizationService_;
	}));

	it('culture should exist', function () {
		expect(LocalizationService.culture).toBeDefined();
	});

	it('culture should be pt', function () {
		expect(LocalizationService.culture).toEqual("pt");
	});

	it('try some text inputs', function () {
		expect(LocalizationService.getText("Yes")).toEqual("Sim");
		expect(LocalizationService.getText("No")).toEqual("Não");
		expect(LocalizationService.getText("High")).toEqual("Ótima");
	});
});

describe('ProductService', function () {
	var ProductService;

	beforeEach(angular.mock.module('OrderApp'));

	beforeEach(inject(function (_ProductService_) {
		ProductService = _ProductService_;
	}));

	it('should exist', function () {
		expect(ProductService).toBeDefined();
	});

	it('getall should exist', function () {
		expect(ProductService.getAll).toBeDefined();
	});

	it('getall should return star wars content', function () {
		ProductService.getAll().then(function (value) {

			expect(true).toEqual([
				{
					id: 1,
					name: 'Millenium Falcon',
					unitValue: 550000,
					multiple: null,
					minValue: 495000
				},
				{
					id: 2,
					name: 'X-Wing',
					unitValue: 60000,
					multiple: 2,
					minValue: 54000
				},
				{
					id: 3,
					name: 'Super Star Destroyer',
					unitValue: 4570000,
					multiple: null,
					minValue: 4113000
				},
				{
					id: 4,
					name: 'TIE Fighter',
					unitValue: 75000,
					multiple: 2,
					minValue: 67500
				},
				{
					id: 5,
					name: 'Lightsaber',
					unitValue: 6000,
					multiple: 5,
					minValue: 5400
				},
				{
					id: 6,
					name: 'DLT-19 Heavy Blaster Rifle',
					unitValue: 5800,
					multiple: null,
					minValue: 5220
				},
				{
					id: 7,
					name: 'DL-44 Heavy Blaster Pistol',
					unitValue: 1500,
					multiple: 10,
					minValue: 1350
				}
			]);
		});
	});
});

describe('RedirectService', function () {
	var RedirectService;

	beforeEach(angular.mock.module('OrderApp'));

	beforeEach(inject(function (_RedirectService_) {
		RedirectService = _RedirectService_;
	}));

	it('should exist', function () {
		expect(RedirectService).toBeDefined();
	});

	it('new should exist', function () {
		expect(RedirectService.new).toBeDefined();
	});

	it('edit should exist', function () {
		expect(RedirectService.edit).toBeDefined();
	});

	it('github should exist', function () {
		expect(RedirectService.github).toBeDefined();
	});

	it('updateURL should exist', function () {
		expect(RedirectService.updateURL).toBeDefined();
	});

	it('editDialog should exist', function () {
		expect(RedirectService.editDialog).toBeDefined();
	});
});

describe('OrderService', function () {
	var OrderService;

	beforeEach(angular.mock.module('OrderApp'));

	beforeEach(inject(function (_OrderService_) {
		OrderService = _OrderService_;
	}));

	it('should exist', function () {
		expect(OrderService).toBeDefined();
	});

	it('save should exist', function () {
		expect(OrderService.save).toBeDefined();
	});
});

describe('OrderItemService', function () {
	var OrderItemService;

	beforeEach(angular.mock.module('OrderApp'));

	beforeEach(inject(function (_OrderItemService_) {
		OrderItemService = _OrderItemService_;
	}));

	it('should exist', function () {
		expect(OrderItemService).toBeDefined();
	});

	it('profitability should exist', function () {
		expect(OrderItemService.profitability).toBeDefined();
	});

	it('profitability.all should exist', function () {
		expect(OrderItemService.profitability.all).toBeDefined();
	});

	it('profitability.find should exist', function () {
		expect(OrderItemService.profitability.find).toBeDefined();
	});

	it('low profitability should exist', function () {
		expect(OrderItemService.profitability.all.find(a => a.code == "low")).toBeDefined();
	});

	it('medium profitability should exist', function () {
		expect(OrderItemService.profitability.all.find(a => a.code == "medium")).toBeDefined();
	});

	it('high profitability should exist', function () {
		expect(OrderItemService.profitability.all.find(a => a.code == "high")).toBeDefined();
	});

	it('profitability should be high', function () {
		expect(OrderItemService.profitability.find(100.01, 100))
			.toEqual(OrderItemService.profitability.all.find(a => a.code == "high"));
	});

	it('profitability should be medium', function () {
		expect(OrderItemService.profitability.find(100, 100))
			.toEqual(OrderItemService.profitability.all.find(a => a.code == "medium"));

		expect(OrderItemService.profitability.find(90, 100))
			.toEqual(OrderItemService.profitability.all.find(a => a.code == "medium"));
	});

	it('profitability should be low', function () {
		expect(OrderItemService.profitability.find(89.99, 100))
			.toEqual(OrderItemService.profitability.all.find(a => a.code == "low"));
	});
});