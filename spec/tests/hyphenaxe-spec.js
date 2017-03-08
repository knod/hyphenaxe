describe("hyphenaxe", function() {

  var axe = require('../../lib/hyphenaxe.js');

  describe("is given _TWO ARGUMENTS_ with at least one having an _UNEXPECTED TYPE_", function() {

    // describe("and the first argument is a non-string value", function() {
    //   it('should return that value', function() {
    //     expect( axe( undefined, 2 ) ).toEqual( undefined );  // X
    //     expect( axe( null,      2 ) ).toEqual( null );
    //     expect( axe( 0,         2 ) ).toEqual( 0 );  // Should error?
    //     expect( axe( 1,         2 ) ).toEqual( 1 );  // Should error?
    //     expect( axe( 3,         2 ) ).toEqual( 3 );  // Should error?
    //     expect( axe( -3,        2 ) ).toEqual( -3 );  // Should error?
    //   });
    // });

    // describe("and the second argument is a non-int value", function() {
    //   it('should throw an error', function() {  // warning? error?
    //     expect( axe( 'test', undefined  ) ).toThrow(  );  // X
    //     expect( axe( 'test', null       ) ).toThrow(  );
    //     expect( axe( 'test', 0.5        ) ).toThrow(  );
    //     expect( axe( 'test', 'string'   ) ).toThrow(  );
    //     expect( axe( 'test', '0'        ) ).toThrow(  );
    //     expect( axe( 'test', '1'        ) ).toThrow(  );
    //     expect( axe( 'test', '2'        ) ).toThrow(  );
    //   });
    // });

    // describe("and the second argument is a negative integer", function() {
    //   it('should... throw an error?', function() {  // null? error?
    //     expect( axe( 'test', -1 ) ).toThrow(  );  // X
    //     expect( axe( 'test', -5 ) ).toThrow(  );
    //   });
    // });

    // // ??: How to handle?
    // describe("both arguments are of unexpected types", function() {
    //   it('should fail from first to last, at the first error encountered', function() {
    //     expect( axe( undefined, undefined ) ).toThrow(  );
    //     expect( axe( null,      0.5       ) ).toEqual( null );
    //     expect( axe( 0,         'string'  ) ).toEqual( 0 );  // Should error on first or second?
    //     expect( axe( 1,         -5        ) ).toEqual( 1 );  // Should error on first or second?
    //   });
    // });
    

  });  // End "Two arguments: unexpected types"



  // WITH `tooBig` THE CODE IS MUCH HARDER TO READ, BUT IT DOES HAVE TO BE TESTED...
  // `afterEach()` won't help, because that's just after a spec
  var tooBig = function ( strings, max ) {
  /* ( [str], int ) -> Bool
  * 
  * If any string in `strings` > max, returns true
  * Otherwise returns false
  */
    var tooBig = false;
    for (let stri = 0; stri < strings.length; stri++) {
      // If one is too big, we're done
      if ( strings[ stri ].length > max ) {
        tooBig = true;
        break;
      }
    }

    return tooBig;
  };  // End tooBig()

  // describe("is given _ARGUMENTS_ wit _EXPECTED TYPES_ of the format ( str, int ), no string in the returned array should ever be longer than `int` and", function() {
  //   describe("when given _TWO ARGUMENTS_", function() {

  describe("is given _TWO ARGUMENTS_ with _EXPECTED TYPES_ of the format ( str, int ), no string in the returned array should ever be longer than `int` and", function() {

    // should return an array of strings

    var max, result;
    beforeEach( function() { max = null; result = null; } );

    describe("the length of each string in the returned array should be affected by the value of `int` (the maximum number of characters per string).", function() {

      // length should never be greater than `int`

      describe("When `int` is 0", function() {
        it('should return [""]', function() {  // ?
          // expect( axe( 'test', 0 ) ).toEqual( [''] );
          max = 0, result = axe( 'test', max )
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( [''] );  // ? []? null? error?
        });
      });

      describe("When `int` is 1", function() {
        it('should return single character strings with no hyphen/separator', function() {
          // expect( axe( '123', 1 ) ).toEqual( ['1', '2', '3'] );
          max = 1, result = axe( '123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1', '2', '3'] );
        });
      });

      describe("When `str.length <= int`", function() {
        it('should return [ str ]', function() {

          // expect( axe( '1',    2    ) ).toEqual( ['1'] );
          // expect( axe( '12',   2    ) ).toEqual( ['12'] );
          // expect( axe( '123',  3    ) ).toEqual( ['123'] );
          // expect( axe( '123',  105  ) ).toEqual( ['123'] );

          max = 2, result = axe( '1', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1'] );

          max = 2, result = axe( '12', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['12'] );

          max = 3, result = axe( '123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['123'] );

          max = 105, result = axe( '123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['123'] );

        });
      });

      describe("When `str.length > int`", function() {
        it('should return [ String ], where `str` has been separated into parts no longer than `int` and, all except the last part, been terminated with a hyphen (which will be counted as part of the length)', function() {
          // expect( axe( '123123', 3) ).toEqual( ['12-', '31-', '23'] );
          max = 3, result = axe( '123123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['12-', '31-', '23'] );
        });
      });

      describe("When the last character group is LESS THAN ~75% OF `int`", function() {
        it('should make sure that the number of characters per string group is decently evenly distributed (the last group should have a length no less than ~75% of `int`)', function() {
          // expect( axe( '123123123123',  6 ) ).toEqual( ['1231-', '2312-', '3123'] );
          // expect( axe( '123123',        5 ) ).toEqual( ['123-', '123'] );
          max = 6, result = axe( '123123123123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1231-', '2312-', '3123'] );

          max = 5, result = axe( '123123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['123-', '123'] );
          // TODO: more examples?
        });
      });

      describe("when given ( str, int ) where `str.length > int` where, accounting for the added length of the hyphens/separators, the last character group length is EQUAL TO OR GREATER THAN ~75% of `int`", function() {
        it('should end up with the last character group length remaining at that value', function() {
          // expect( axe( '123',       2 ) ).toEqual( ['1-', '23'] );
          // expect( axe( '123123123', 3 ) ).toEqual( ['12-', '31-', '23-', '123'] );
          // expect( axe( '1231',      3 ) ).toEqual( ['12-', '31'] );
          max = 2, result = axe( '123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1-', '23'] );

          max = 3, result = axe( '123123123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['12-', '31-', '23-', '123'] );

          max = 3, result = axe( '1231', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['12-', '31'] );
        });
      });

      describe("when given ( str, int ) where `str.length > int` where, accounting for the added length of the hyphens/separators, the last character group is EQUAL TO `int` MINUS THE LENGTH OF THE SEPARATOR", function() {
        it('should end up with the last character group length being equal to: `int - separator.length`', function() {
          // expect( axe( '123123', 3 ) ).toEqual( ['12-', '31-', '23'] );
          max = 3, result = axe( '123123', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['12-', '31-', '23'] );
        });
      });

    });  // End length of the string/word vs. value of max number of characters



    describe("when given ( str, int ) where those values are such that the string has a hyphen (or whatever separator) on a boundry", function() {
      it('should not repeat the hyphen/separator', function() {
        // expect( axe( '1-23',   3 ) ).toEqual( ['1-', '23'] );
        // expect( axe( '1--2',  3 ) ).toEqual( ['1-', '-2'] );
        // expect( axe( '12-31', 3 ) ).toEqual( ['12-', '31'] );
          max = 3, result = axe( '1-23', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1-', '23'] );

          max = 3, result = axe( '1--2', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1-', '-2'] );
      });
    });

    describe("when given a string with punctuation", function() {
      it('should treat punctuation or spaces or tabs just like any other character', function() {
        // expect( axe( '1.2',   2 ) ).toEqual( ['1-', '.2'] );
        // expect( axe( '1 2',   2 ) ).toEqual( ['1-', ' 2'] );
        // expect( axe( '1\t2',  2 ) ).toEqual( ['1-', '\t2'] );
          max = 2, result = axe( '1.2', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1-', '.2'] );

          max = 2, result = axe( '1 2', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1-', ' 2'] );

          max = 2, result = axe( '1\t2', max );
          expect( tooBig(result, max) ).toBe( false );
          expect( result ).toEqual( ['1-', '\t2'] );
      });
    });

    // ??: What about new lines?

  });  // End "Two arguments: expected types"



  describe("Custom user options", function() {

    describe("options.separator: Unexpected type", function() {
      it('should throw an error', function() {
        expect( axe( '1.2',  2 ) ).toEqual( ['1-', '.2'] );
      });

    });  // End "options.separator: Unexpected type"

    describe("options.separator: expected type", function() {

    });  // End "options.separator: expected type"



    describe("options.fractionOfMax: Unexpected type", function() {

    });  // End "options.fractionOfMax: Unexpected type"

    describe("options.fractionOfMax: expected type", function() {

    });  // End "options.fractionOfMax: expected type"



    describe("options.redistribute: Unexpected type", function() {

    });  // End "options.redistribute: Unexpected type"

    describe("options.redistribute: expected type", function() {

    });  // End "options.redistribute: expected type"

  });  // End "Custom user options"

      // expect( axe( '123', 3, {separator: '--'} ) ).toEqual( ['1--', '2--', '3'] );    (separator plain test)
      // expect( axe( '123', 3, {separator: ''} ) ).toEqual( ['1--', '2--', '3'] );      (separator empty test)
      // expect( axe( '123', 3, {separator: 1} ) ).toEqual( ['1--', '2--', '3'] );       (separator non-string test)
      // expect( axe( '123', 3, {separator: undefined} ) ).toEqual( ['1--', '2--', '3'] );   (separator undefined test)
      // expect( axe( '123', 3, {separator: null} ) ).toEqual( ['1--', '2--', '3'] );    (separator null test)
      // expect( axe( '123', 3, {separator: '**'} ) ).toEqual( ['1**', '2**', '3'] );    (regex escape test)
      // expect( axe( '1--23', 3, {separator: '--'} ) ).toEqual( ['1--', '23'] );      (separator interference test)
      // expect( axe( '123123', 5, {fractionOfMax: 0.5} ) ).toEqual( ['1231-', '23'] );    (fractionOfMax plain test)
      // expect( axe( '123123', 5, {fractionOfMax: '2'} ) ).toEqual( ['1231-', '23'] );    (fractionOfMax non-int test)
      // expect( axe( '123123', 5, {fractionOfMax: undefined} ) ).toEqual( ['1231-', '23'] ); (fractionOfMax undefined test)
      // expect( axe( '123123', 5, {fractionOfMax: null} ) ).toEqual( ['1231-', '23'] );   (fractionOfMax null test)


});
