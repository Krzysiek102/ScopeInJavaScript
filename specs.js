/// <reference path="typings/jasmine/jasmine.d.ts" />
'use strict';

describe('javaScript', function () {

    it('scope', function () {
        var itemA = 1;

        function f1() {
            //expect(itemA === ).toBeTruthy();
            var itemA = 2;
            //expect(itemA === ).toBeTruthy();
        };

        function f2(itemA) {
            //expect(itemA === ).toBeTruthy();
            itemA = 3;
            itemB = 4;

            var itemC = 5;
        };

        f1();
        //expect(itemA === ).toBeTruthy();
        f2();
        //expect(itemB === ).toBeTruthy();
        //expect(itemA === ).toBeTruthy();
        //expect(itemC === ).toBeTruthy();
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
        //expect(functionExpression(2) === ).toBeTruthy();
        //expect(functionHiddenDeclaration(2) === ).toBeTruthy();
        //expect(innerFunction() === ).toBeTruthy();
    });

    it('named function expression - hoisting', function () {
        var itemA = f1();
        var itemB = itemC;
        //expect(itemA === ).toBeTruthy();
        //expect(itemB === ).toBeTruthy();
        function f1() {
            return 1;
        };
        var itemC = function () {
            return f1();
        };
    });    


    it('IIFE', function () {
        var itemA = 1;
        var itemB = 1;
        (function f1(param1) {
            //expect(itemA === ).toBeTruthy();
            //expect(itemB === ).toBeTruthy();
            itemA = param1;
            var itemB;
            itemB = 2;
            var itemC = 1;
        })(2);
        //expect(itemA === ).toBeTruthy();
        //expect(itemB === ).toBeTruthy();
        //expect(itemC === ).toBeTruthy();
        //expect(f1() === ).toBeTruthy();
    });


    it('let', function () {
        //expect(itemA === ).toBeTruthy();
        //expect(itemB === ).toBeTruthy();
        if (true) {
            //expect(itemA === ).toBeTruthy();
            //expect(itemB === ).toBeTruthy();
            let itemA = 1;
            var itemB = 1;
            //expect(itemA === ).toBeTruthy();
            //expect(itemB === ).toBeTruthy();
        };
        //expect(itemA === ).toBeTruthy();
        //expect(itemB === ).toBeTruthy();
    });


    it('this - implicit binding', function () {
        function f1() {
            //expect(this.itemA === ).toBeTruthy();
            //expect(itemA === ).toBeTruthy();
        }
        var itemA = 1;
        f1();

        function f2() {
            //expect(this.itemB === ).toBeTruthy();
            //expect(itemB === ).toBeTruthy();
        };
        var itemB = 1;
        var itemC = { itemB: 2, f3: f2 };
        itemC.f3();
    });


    it('explicit binding - call', function () {
        function f1(param1, param2, param3) {
            //expect(this.itemA === ).toBeTruthy();
            //expect(param1 === ).toBeTruthy();
            //expect(param2 === ).toBeTruthy();
            //expect(param3 === ).toBeTruthy();
        }

        var itemA = 1;
        var itemB = { itemA: 2 };
        f1.call(itemB, 2, 3);
    });


    it('explicit binding - apply', function () {
        function f1(param1, param2, param3) {
            //expect(this.itemA === ).toBeTruthy();
            //expect(param1 === ).toBeTruthy();
            //expect(param2 === ).toBeTruthy();
            //expect(param3 === ).toBeTruthy();            
        }

        var itemA = 1;
        var itemB = { itemA: 2 };
        f1.apply(itemB, [2,3]);
    });

    it('call - explicit binding - manual hard binding example', function () {
        function f1() {
            //expect(this.itemA === ).toBeTruthy();
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
            //expect(this.itemA === ).toBeTruthy();
        }

        var obj1 = { itemA: 1 };
        var obj2 = { itemA: 2 };

        f1 = bind(f1, obj1);

        f1.call(obj2);
    });


    it('bind function from ES5', function () {
        function f1() {
            //expect(this.itemA === ).toBeTruthy();
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
        //expect(obj1.itemA === ).toBeTruthy();

        function f2() {
            this.itemB = 1;
        }
        var obj2 = new f2();
        //expect(obj2.itemB === ).toBeTruthy();
    });

    it('this - new vs hard binding', function () {
        function f1() {
            //expect(this.itemA === ).toBeTruthy();
        }

        var obj1 = { itemA: 1 };

        f1 = f1.bind(obj1);

        var obj3 = new f1();
    });


    it('closure', function () {
        function f1() {
            var itemA = 1;
            function f1Inner() {
                //expect(itemA === ).toBeTruthy();
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
                //expect(itemA === ).toBeTruthy();
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
            //expect(sum === ).toBeTruthy();
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
            //expect(sum === ).toBeTruthy();
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
            //expect(sum === ).toBeTruthy();
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

        //expect(module1.f1() === ).toBeTruthy();
        //expect(module1.privateItemA === ).toBeTruthy();
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

        //expect(module1.f1() === ).toBeTruthy();
        //expect(module1.f2() === ).toBeTruthy();
        //expect(module1.privateItemA === ).toBeTruthy();
    });

});

