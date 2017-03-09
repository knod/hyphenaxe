describe("hyphenaxe,", function() {

  var axe = require('../../lib/hyphenaxe.js');


  var isAnArrayOfStrings = function ( maybeArr ) {
  // Return true if an array contains only strings, otherwise false
    if( Object.prototype.toString.call( maybeArr ) !== '[object Array]' ) {
        return false;
    }

    var allAreStrings = true;
    for (var indx = 0; indx < maybeArr.length; indx++) {
       if ( typeof maybeArr[indx] !== 'string' ) { allAreStrings = false;}
    };
    return allAreStrings;
  };  // End isAnArrayOfStrings()


  describe("given (an) UNEXPECTED VALUE(S)", function() {

    describe("a NON-STRING value for a first argument,", function() {
      it('should throw a TYPE error', function() {
        expect( function() {axe( undefined, 2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( null,      2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( true,      2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( false,     2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( {},        2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( [],        2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( 0,         2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( 1,         2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( 3,         2 )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( -3,        2 )} ).toThrowError( TypeError, /The first argument/ );
      });
    });

    describe("a NON-NUMBER value for a second argument (should be a positive integer > 0),", function() {
      it('should throw a TYPE error', function() {  // ??: Accept parsable string as second argument
        expect( function() {axe( 'test', undefined  )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', null       )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', true       )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', false      )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', 'thing'    )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', '0'        )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', '1'        )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', '2'        )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', {}         )} ).toThrowError( TypeError, /The second argument/ );
        expect( function() {axe( 'test', []         )} ).toThrowError( TypeError, /The second argument/ );
      });
    });

    describe("a NON-INTEGER number for a second argument (should be a positive integer > 0),", function() {
      it('should throw a RANGE error', function() {
        expect( function() {axe( 'test', 0.5  )} ).toThrowError( RangeError, /The second argument/ );
        expect( function() {axe( 'test', -0.5 )} ).toThrowError( RangeError, /The second argument/ );
      });
    });

    describe("a NEGATIVE INTEGER for a second argument (should be a positive integer > 0),", function() {
      it('should throw a RANGE error', function() {
        expect( function() {axe( 'test', -1 )} ).toThrowError( RangeError, /The second argument/ );
        expect( function() {axe( 'test', -3 )} ).toThrowError( RangeError, /The second argument/ );
      });
    });

    describe("0 for a second argument (should be a positive integer > 0),", function() {
      it('should throw a RANGE error', function() {
        expect( function() {axe( 'test', 0 )} ).toThrowError( RangeError, /The second argument/ );
      });
    });

    describe("INVALID inputs for both of the first two arguments (should be a string followed by a positive integer > 0),", function() {
      it('should fail from first to last, at the first error encountered', function() {
        expect( function() {axe( undefined, undefined )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( null,      0.5       )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( 0,         'thing'   )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( 1,         -3        )} ).toThrowError( TypeError, /The first argument/ );
        expect( function() {axe( true,      -3        )} ).toThrowError( TypeError, /The first argument/ );
      });
    });

    // ========== CUSTOM OPTIONS ==========
    describe("a NON-STRING value for userOptions.separator,", function() {
      it('should throw a TYPE error', function() {
        expect( function() {axe( 'test',  2, {separator: undefined} )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: null     } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: true     } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: false    } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: {}       } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: []       } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: 0        } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: 1        } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: 5        } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: -1       } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {separator: 1.1      } )} ).toThrowError( TypeError, /Your userOptions value/ );
      });

    });  // End "options.separator: Unexpected type"

    describe("a NON-NUMBER value for options.fractionOfMax (should be an integer that is <= 1 and > 0),", function() {
      it('should throw a TYPE error', function() {
        expect( function() {axe( 'test',  2, {fractionOfMax: undefined} )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: null     } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: true     } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: false    } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: {}       } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: []       } )} ).toThrowError( TypeError, /Your userOptions value/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: 'test'   } )} ).toThrowError( TypeError, /Your userOptions value/ );
      });
    });

    describe("a NUMBER > 1 for options.fractionOfMax (should be an integer that is <= 1 and > 0),", function() {
      it('should throw a RANGE error', function() {
        expect( function() {axe( 'test',  2, {fractionOfMax: 5   } )} ).toThrowError( RangeError, /fractionOfMax/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: 1.1 } )} ).toThrowError( RangeError, /fractionOfMax/ );
      });
    });  // End "options.fractionOfMax: Unexpected type"

    describe("0 for options.fractionOfMax (should be an integer that is <= 1 and > 0),", function() {
      it('should throw a RANGE error', function() {
        expect( function() {axe( 'test',  2, {fractionOfMax: 0 } )} ).toThrowError( RangeError, /fractionOfMax/ );
      });
    });  // End "options.fractionOfMax: Unexpected type"

    describe("a NEGATIVE NUMBER for options.fractionOfMax (should be an integer that is <= 1 and > 0),", function() {
      it('should throw a RANGE error', function() {
        expect( function() {axe( 'test',  2, {fractionOfMax: -1   } )} ).toThrowError( RangeError, /fractionOfMax/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: -1.1 } )} ).toThrowError( RangeError, /fractionOfMax/ );
      });
    });  // End "options.fractionOfMax: Unexpected type"

    describe("a NEGATIVE NUMBER for options.fractionOfMax (should be an integer that is <= 1 and > 0),", function() {
      it('should throw a RANGE error', function() {
        expect( function() {axe( 'test',  2, {fractionOfMax: 0        } )} ).toThrowError( RangeError, /fractionOfMax/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: 5        } )} ).toThrowError( RangeError, /fractionOfMax/ );
        expect( function() {axe( 'test',  2, {fractionOfMax: -1       } )} ).toThrowError( RangeError, /fractionOfMax/ );
      });
    });  // End "options.fractionOfMax: Unexpected type"

    describe(", for options.redistribute,", function() {
      // Should also take no more than 3 arguments...?

      describe("a NON-FUNCTION,", function() {
        it('should throw an error', function() {
          expect( function() {axe( 'test',  2, {redistribute: undefined} )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: null     } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: true     } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: false    } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: {}       } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: []       } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: 'test'   } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: 0        } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: 5        } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: -1       } )} ).toThrowError( TypeError, /Your userOptions value/ );
          expect( function() {axe( 'test',  2, {redistribute: 1.1      } )} ).toThrowError( TypeError, /Your userOptions value/ );
        });
      });

      var custom, func;

      describe("a function that DOESN'T return an ARRAY,", function() {
        it('should throw a TYPE error', function() {

          custom = function () { return undefined; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return null; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return true; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return false; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return {}; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return 'a string'; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return 0; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return 1; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return 5; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return -1; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return 0.5; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );

        });
      });  // End options.redistribute return not array

      describe("a function that returns an array containing a NON-NUMBER (should return an array of integers > 0),", function() {
        it('should throw a TYPE error', function() {

          custom = function () { return [2, undefined]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return [2, null]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return [2, true]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return [2, false]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return [2, {}]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return [2, []]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );
          
          custom = function () { return [2, 'a string']; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( TypeError, /redistribution/ );

        });
      });  // End options.redistribute return array with item !== num

      describe("a function that returns an array containing a NON-INTEGER number (should return an array of integers > 0),", function() {
        it('should throw a RANGE error', function() {
          custom = function () { return [2, 0.5]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( RangeError, /redistribution/ );

          custom = function () { return [2, 1.5]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( RangeError, /redistribution/ );
        });
      });  // End options.redistribute return array with item !== int

      describe("a function that returns an array containing an NEGATIVE NUMBER (should return an array of integers > 0),", function() {
        it('should throw a RANGE error', function() {
          custom = function () { return [2, -1]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( RangeError, /redistribution/ );

          custom = function () { return [2, -1.5]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( RangeError, /redistribution/ );

          custom = function () { return [2, -0.5]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( RangeError, /redistribution/ );
        });
      });  // End options.redistribute return array with item !== positive int

      describe("a function that returns an array containing 0 (should return an array of integers > 0),", function() {
        it('should throw a RANGE error', function() {
          custom = function () { return [2, 0]; }
          func   = function () { isAnArrayOfStrings( axe( 'tests',  4, {redistribute: custom} ) ) }
          expect( func ).toThrowError( RangeError, /redistribution/ );
        });
      });  // End options.redistribute return array with item !== non-zero

    });  // End "options.redistribute: Unexpected type"

  });  // End _UNEXPECTED VALUES_




  describe("given a string 'str' and a positive integer 'posInt',", function() {

    it('should return an array of strings', function() {  // ?
      expect( isAnArrayOfStrings( axe( 'test', 3 ) ) ).toBe( true );  // ? []? null? error?
    });


    // ========= IRREGULARS =========
    describe("where `posInt` is 1,", function() {
      it('should return single character strings with no hyphen/separator', function() {
        expect( axe( '123', 1 ) ).toEqual( ['1', '2', '3'] );
      });
    });

    describe("where `str.length <= posInt`,", function() {
      it('should return [ str ]', function() {

        expect( axe( '1',    2    ) ).toEqual( ['1'] );
        expect( axe( '12',   2    ) ).toEqual( ['12'] );
        expect( axe( '123',  3    ) ).toEqual( ['123'] );
        expect( axe( '123',  105  ) ).toEqual( ['123'] );

      });
    });


    // ========= REGULARS =========
    var isTooBig = function ( strings, max ) {
    /* ( [str], int ) -> Bool
    * If any string in `strings` > max, returns true. Otherwise returns false
    */
      var tooBig = false;

      for (let stri = 0; stri < strings.length; stri++) {
        if ( strings[ stri ].length > max ) {
          tooBig = true;
          break;  // If one is too big, we're done
        }
      }

      return tooBig;
    };  // End isTooBig()


    describe("where `str.length > posInt`", function() {

      it("should return an array of strings in which no individual string is ever longer than `posInt`", function() {
          var max = 3, result = axe( '123123', max );
          expect( isTooBig( result ) ).toEqual( false );
          // Other tests?
      });

      it("should return an array of strings in which every string except the last one is terminated with a hyphen", function() {
          expect( axe( '123123', 3 ) ).toEqual( ['12-', '31-', '23'] );
          // Other tests?
      });

      describe("and the last array string length is LESS THAN ~75% OF `posInt`,", function() {
        it('should make sure that the number of characters per string group is decently evenly distributed (the last group should have a length no less than ~75% of `posInt`)', function() {
          
          expect( axe( '123123123123',  6 ) ).toEqual( ['1231-', '2312-', '3123'] );
          expect( axe( '123123',        5 ) ).toEqual( ['123-', '123'] );
          // TODO: more examples?

        });
      });

      describe("and the last array string length is EQUAL TO OR GREATER THAN ~75% of `posInt`,", function() {
        it('should end up with the last character group length remaining at that value', function() {

          expect( axe( '123',       2 ) ).toEqual( ['1-', '23'] );
          expect( axe( '123123123', 3 ) ).toEqual( ['12-', '31-', '23-', '123'] );
          expect( axe( '1231',      3 ) ).toEqual( ['12-', '31'] );

        });
      });

      describe("and the last character group is EQUAL TO `posInt` MINUS THE LENGTH OF THE SEPARATOR,", function() {
        it('should end up with the last character group length being equal to `posInt - separator.length`', function() {
          // Yes, this was an issue that had to be accounted for
          expect( axe( '123123', 3 ) ).toEqual( ['12-', '31-', '23'] );
        });
      });

      describe("and a string has a hyphen/separator on a boundry,", function() {
        it('should not repeat the hyphen/separator', function() {

          expect( axe( '1-23', 3 ) ).toEqual( ['1-', '23'] );
          expect( axe( '1--2', 3 ) ).toEqual( ['1-', '-2'] );
          expect( axe( '1-23', 3 ) ).toEqual( ['1-', '23'] );

        });
      });

      describe("and a string with punctuation or spaces or tabs,", function() {
        it('should treat those characters just like any other character', function() {

          expect( axe( '1.2',   2 ) ).toEqual( ['1-', '.2'] );
          expect( axe( '1 2',   2 ) ).toEqual( ['1-', ' 2'] );
          expect( axe( '1\t2',  2 ) ).toEqual( ['1-', '\t2'] );

        });
      });

      describe("and a string with new line characters,", function() {
      // ??: What about new lines? Should they be accepted at all?
        xit('~~WHAT SHOULD IT DO?~~');
      });

    });  // End "where `str.length > posInt`"



    // ========== CUSTOM OPTIONS ==========
    // --- separator ---
    describe("and a custom separator (with options.separator)", function() {
      it("should return strings terminated in that given separator", function() {
        expect( axe( '123', 2, {separator: '@'} ) ).toEqual( ['1@', '23'] );
      });

      describe("of a different length than the default one", function() {
        it("should return strings terminated in that given separator with the length accounted for", function() {
          expect( axe( '1234', 3, {separator: '--'} ) ).toEqual( ['1--', '234'] );
        });
      });

      describe("that's an empty string", function() {
        it("should return strings terminated with nothing and with that lack of length accounted for", function() {
          expect( axe( '123', 2, {separator: ''} ) ).toEqual( ['12','3'] );
          expect( axe( '1234', 3, {separator: ''} ) ).toEqual( ['12', '34'] );
        });
      });

      describe("that's a regex symbol", function() {
        it("should return escape that/those charcters properly and return the expected value", function() {
          expect( axe( '123', 2, {separator: '*'} ) ).toEqual( ['1*', '23'] );
          expect( axe( '1234', 3, {separator: '..'} ) ).toEqual( ['1..', '234'] );
        });
      });

      describe("that's on a boundry and matches the text that's on that boundry", function() {
        it("should not repeat the custom separator", function() {
          expect( axe( '1*23', 3, {separator: '*'} ) ).toEqual( ['1*', '23'] );
          expect( axe( '1--234', 5, {separator: '--'} ) ).toEqual( ['1--', '234'] );
        });
      });
    });  // End options.separator


    // --- fractionOfMax ---
    describe("and a custom fractionOfMax (with options.fractionOfMax)", function() {
      it("should use the custom value in place of the default one", function() {

        // This test assumes a default fractionOfMax value of not matching the results of 0.5
        var defaultResult = axe( '123123', 5 ),  // ["123-", "123"]
            customResult  = axe( '123123', 5, {fractionOfMax: 0.5} );

        expect( customResult ).toEqual( ['1231-', '23'] );
        expect( customResult ).not.toEqual( defaultResult );

      });
    });  // End options.fractionOfMax


    // --- redistribute ---
    describe("and options.redistribute doesn't generate errors", function() {
      it("should do be used instead of the default", function() {

        var defaultResult = axe( '1234567', 6);  // ["123-", "4567"],
            custom = function ( currentChunksMap ) { return currentChunksMap; },
            customResult  = axe( '1234567', 6, {redistribute: custom} ),
        // The 6 is left off because separator is '-' and is accounted for, but then never used
        expect( customResult ).toEqual( ['12345'] );
        expect( customResult ).not.toEqual( defaultResult );

      });
    });  // End options.redistribute

  });  // End "expected types"

});  // End hyperaxe
