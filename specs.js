/// <reference path="typings/jasmine/jasmine.d.ts" />
'use strict';

describe('javaScript', function () {

    it('scope', function () {
        var itemA = 1;

        function f1() {
            expect(itemA === undefined).toBeTruthy();
            var itemA = 2;
            expect(itemA === 2).toBeTruthy();
        };

        function f2(itemA) {
            expect(itemA === undefined).toBeTruthy();
            itemA = 3;
            itemB = 4;

            var itemC = 5;
        };

        f1();
        expect(itemA === 1).toBeTruthy();
        f2();
        expect(itemB === 4).toBeTruthy();
        expect(itemA === 1).toBeTruthy();
        expect(function(){ itemC }).toThrow();
        var itemB;
    });


    it('named function expression', function () {
        var functionExpression = function functionHiddenDeclaration(param1) {
            function innerFunction() {
                if (param1 === 2) {
                    return functionHiddenDeclaration(param1 - 1);
                } else if (param1 === 1) {
                    return 1;
                } else {
                    return param1;
                }
            }
            return innerFunction();
        }
        expect(functionExpression(2) === 1).toBeTruthy();
        expect(function(){ functionHiddenDeclaration(2) }).toThrow();
        expect(functionExpression(0) === 0).toBeTruthy();
        expect(function(){ functionHiddenDeclaration(0) }).toThrow();
    });


    it('IIFE', function () {
        var itemA = 1;
        var itemB = 1;
        (function f1(param1) {
            expect(itemA === 1).toBeTruthy();
            expect(itemB === undefined).toBeTruthy();
            itemA = param1;
            var itemB;
            itemB = 2;
            var itemC = 1;
        })(2);
        expect(itemA === 2).toBeTruthy();
        expect(itemB === 1).toBeTruthy();
        expect(function(){ itemC }).toThrow();
        expect(function(){ f1() }).toThrow();
    });


    it('let', function () {
        expect(function(){ itemA }).toThrow();
        expect(itemB === undefined).toBeTruthy();
        if (true) {
            expect(function(){ itemA }).toThrow();
            expect(itemB === undefined).toBeTruthy();
            let itemA = 1;
            var itemB = 1;
            expect(itemA === 1).toBeTruthy();
            expect(itemB === 1).toBeTruthy();
        };
        expect(function(){ itemA }).toThrow();
        expect(itemB === 1).toBeTruthy();
    });

    it('hoisting', function () {
        var itemA = f1();
        var itemB = itemC;
        expect(itemA === 1).toBeTruthy();
        expect(itemB === undefined).toBeTruthy();
        function f1() {
            return 1;
        };
        var itemC = function () {
            return f1();
        };
    });


    it('this - implicit binding', function () {
        function f1() {
            expect(function(){ this.itemA }).toThrow();
            expect(itemA === 1).toBeTruthy();
        }
        var itemA = 1;
        f1();

        function f2() {
            expect(this.itemB === 2).toBeTruthy();
            expect(itemB === 1).toBeTruthy();
        };
        var itemB = 1;
        var itemC = { itemB: 2, f3: f2 };
        itemC.f3();
    });

    it('explicit binding - call', function () {
        function f1(param1, param2, param3) {
            expect(this.itemA === 2).toBeTruthy();
            expect(param1 === 2).toBeTruthy();
            expect(param2 === 3).toBeTruthy();
            expect(param3 === undefined).toBeTruthy();
        }

        var itemA = 1;
        var itemB = { itemA: 2 };
        f1.call(itemB, 2, 3);
    });


    it('explicit binding - apply', function () {
        function f1(param1, param2, param3) {
            expect(this.itemA === 2).toBeTruthy();
            expect(param1 === 2).toBeTruthy();
            expect(param2 === 3).toBeTruthy();
            expect(param3 === undefined).toBeTruthy();            
        }

        var itemA = 1;
        var itemB = { itemA: 2 };
        f1.apply(itemB, [2,3]);
    });


    it('call - explicit binding - manual hard binding example', function () {
        function f1() {
            expect(this.itemA === 1).toBeTruthy();
        }

        var obj1 = { itemA: 1 };
        var obj2 = { itemA: 2 };

        var ftemp = f1;
        f1 = function () {
            ftemp.call(obj1);
        }

        f1.call(obj2);
    });

    it('call - explicit binding - dedicated bind function', function () {
        function bind(fn, obj) {
            return function () {
                fn.call(obj);
            }
        }
        function f1() {
            expect(this.itemA === 1).toBeTruthy();
        }

        var obj1 = { itemA: 1 };
        var obj2 = { itemA: 2 };

        f1 = bind(f1, obj1);

        f1.call(obj2);
    });


    it('bind function from ES5', function () {
        function f1() {
            expect(this.itemA === 1).toBeTruthy();
        }

        var obj1 = { itemA: 1 };
        var obj2 = { itemA: 2 };

        f1 = f1.bind(obj1);

        f1.call(obj2);
    });

    it('this - new binding', function () {
        function f1() {
            var itemA = 1;
        }
        var obj1 = new f1();
        expect(obj1.itemA === undefined).toBeTruthy();

        function f2() {
            this.itemB = 1;
        }
        var obj2 = new f2();
        expect(obj2.itemB === 1).toBeTruthy();
    });

    it('this - new vs hard binding', function () {
        function f1() {
            expect(this.itemA === undefined).toBeTruthy();
        }

        var obj1 = { itemA: 1 };

        f1 = f1.bind(obj1);

        var obj3 = new f1();
    });


    it('closure', function () {
        function f1() {
            var itemA = 1;
            function f1Inner() {
                expect(itemA === 1).toBeTruthy();
            }
            f2(f1Inner);
        }

        function f2(f3) {
            var itemA = 2;
            f3();
        }
        var itemA = 3;        
        f1();
    });


    it('closure set timeout', function (done) {
        function f1() {
            var itemA = 1;
            setTimeout(function f1Inner() {
                expect(itemA === 1).toBeTruthy();
                done();
            }, 50);
        }
        f1();
    });


    it('closure set timeout in for loop with var', function (done) {
        var sum = 0;
        function f1() {
            for (var i = 1; i <= 2; i++) {
                setTimeout(function f1Inner() {
                    sum+=i;
                }, 50);
            }
        }
        f1();
        setTimeout(function () {
            expect(sum === 6).toBeTruthy();
            done();
        }, 100);
    });  

    it('closure set timeout in for loop with IIFE', function (done) {
        var sum = 0;
        function f1() {
            for (var i = 1; i <= 2; i++) {
                (function (i){
                    setTimeout(function f1Inner() {
                        sum+=i;
                    }, 50);                    
                })(i);
            }
        }
        f1();
        setTimeout(function () {
            expect(sum === 3).toBeTruthy();
            done();
        }, 100);
    }); 

    it('closure set timeout in for loop with let', function (done) {
        var sum = 0;
        function f1() {
            for (let i = 1; i <= 2; i++) {
                setTimeout(function () {
                    sum+=i;
                }, 50);
            }
        }
        f1();
        setTimeout(function () {
            expect(sum === 3).toBeTruthy();
            done();
        }, 100);
    });    

    it('module pattern', function() {
        var module1 = (function  module1Func(){
            var privateItemA = 1;
            return {
                f1: function  (){
                    return privateItemA;
                }
            }
        })();

        expect(module1.f1() === 1).toBeTruthy();
        expect(module1.privateItemA === undefined).toBeTruthy();
    });

    
    it('module pattern with object collecting public members', function() {
        var module1 = (function module1Func(){
            var privateItemA = 1;
            var publicMembers = {
                f1: function  (){
                    return privateItemA;
                }
            };
            publicMembers.f2 = function  (){
                    return 2;
                }
            return publicMembers;
        })();

        expect(module1.f1() === 1).toBeTruthy();
        expect(module1.f2() === 2).toBeTruthy();
        expect(module1.privateItemA === undefined).toBeTruthy();
    });

});


