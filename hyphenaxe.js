/* hyphenaxe.js
* 
* Crudely split a one-word string into a list of pre-hyphenated strings
* by desired max number of characters per unit, not by syllable or prefix/suffix
* 
* TODO:
* - ??: Custom inclusion of hyphens?
* - ??: Custom spread/evening out of words with very few letters remaining on
* 	the end?
*/

(function (root, axeFactory) {  // root is usually `window`
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define( [], function () { return ( root.hyphenaxe = axeFactory() ); });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but only CommonJS-like
        // environments that support module.exports, like Node.
        module.exports = axeFactory();
    } else {
        // Browser globals
        root.hyphenaxe = axeFactory();
    }

// These are `root` and `axeFactory`
}(this, function () {

	"use strict";


	var hyphenaxe = function ( wordStr, maxNumChars, userOptions ) {
	/* ( str, int, [{}] ) -> [ Str ]
	* 
	* Takes a string and integer and returns an array
	* of strings, each of which isn't longer than the integer.
	*
	* The third, and optional, parameter is additional data
	* about how to construct the result. (??: should `userOptions`
	* actually just be a bool that tells whether or not to include
	* a hypen?)
	* 
	* Note: The separator will be counted in the number of characters
	* in a unit. That is, 'abso-' will be counted as 5 characters,
	* where '-' is the separator.
	* 
	* Ex1: hyphenaxe( '123123123', 3 ) returns: ['12-', '31-', '23-', '123']
	* Ex2: hyphenaxe( '123123', 3 ) returns: ["12-", "31-", "23"]
	* Ex3: hyphenaxe( '123123', 5 ) returns: ["1231-", "23"]
	* Ex4: hyphenaxe( '123123', 5, {fractionOfMax: 0.75} ) returns: ["123-", "123"]
	*/
		// =====================================
		// ========= QUICK AS WE CAN ===========
		// =====================================

		// If it doesn't need to be broken up at all, just return what we have in an array
		if ( wordStr.length <= maxNumChars ) { return [wordStr]; }
		// If it's just one character long, no room for symbols anyway
		if ( maxNumChars === 1 ) { return wordStr.split(''); }



		// =====================================
		// =========== CALCULATIONS ============
		// =====================================

		var defaultRedistribute = function ( chunkMap, numInLastStr, currentlyLeftOver ) {
		/* ( [int], int, int ) -> [ Int ]
		* 
		* Default redistribution function
		* 
		* Redistributes number of characters in each chunk to
		* make sure the last chunk has the `numInLastStr` number of characters
		* 
		* Right now: letters are removed from the starting strings in
		* order to make up for the last string
		*/
			var toBeMadeUp 	= numInLastStr - currentlyLeftOver;

			var loopAt 		= chunkMap.length,
				indx   		= 0;

			// Keep looping around the non-last ones until the subtraction of
			// characters is evenly distributed, starting with the first chunk
			while ( toBeMadeUp > 0 ) {
				// Whatever number is here, subtract one
				// (It's going to be in that last chunk)
				chunkMap[indx] = chunkMap[indx] - 1;

				indx 		= indx + 1;
				// Start from the beginning string again if more need to be redistributed
				indx 		= indx % loopAt;
				toBeMadeUp  = toBeMadeUp - 1;
			}

			// Add that last one back in
			chunkMap.push( numInLastStr );
// console.log('after redistribute:', chunkMap);
			return chunkMap;
		};  // End defaultRedistribute()


		var unevenly = function ( word, maxWithSep, options ) {
		/* ( str, int, int )
		* 
		* Break up the word unevenly, redistributing a bit if necessary
		*/
			var chunkMap 		= [],
				remainderEvenly = Math.floor( word.length/maxWithSep );

			// ---- last chunk ----
			// Find how much would remain after dividing the string evenly

			var remainder 	= word.length % maxWithSep,  // actually left over
				userMin 	= Math.floor( maxNumChars * options.fractionOfMax ),
				wanted 		= Math.max( userMin, remainder );  // if we have more than min, use that
			// console.log( 'remainder:', remainder, 'min:', userMin, 'wanted:', wanted, 'toBeMadeUp:', toBeMadeUp )

			// Don't include last chunk. Add that in after if needed, along with redistribution.
			for (let counti = 0; counti < remainderEvenly; counti++) {
				// console.log('push one. count:', counti, 'total:', remainderEvenly)
				chunkMap.push( maxWithSep );
			};
			// console.log('after first loop:', chunkMap.slice())

			// If there's an imbalance, redistribute a bit
			if (remainder !== 0 ) {
				chunkMap = options.redistribute( chunkMap, wanted, remainder )
			}

			return chunkMap;
		};  // End unevenly()


		var makeCharsMap = function ( word, maxNumChars, options ) {
		/* ( str, int ) -> [ Int ]
		* 
		* Return an array of integers represeting the length
		* of each group into which the word will be broken up
		* 
		* Ex1: makeCharsMap( '123123123', 3 ) returns: [2, 2, 2, 3]
		* Ex2: makeCharsMap( '123123', 3 ) returns: [2, 2, 2]
		*/

			var chunkMap = [];

			// If we're adding any symbols, we have to remember to count
			// that/those symbol(s) as if they were regular characters.
			// This is the maximum number of characters allowed with
			// the separator
			var separator 		 = options.separator,
				maxWithSeparator = maxNumChars - separator.length;

			// This bit can be a bit complicated. The word needs to be
			// split evenly counting the separator, but the last set
			// of characters doesn't include the separator. When we say,
			// 'this word can be split evenly into parts' here, we mean
			// this word can be split into parts with a hypen plus
			// an end part without a hyphen with each part having the
			// maximum allowed number of characters.
			// (Ex1 above splits "evenly", Ex2 doesn't)

			// We have to test for this "even" splitting, accounting
			// for that last, non-separator'ed chunk
			var noTail 			= word.slice( 0, maxNumChars * -1 ),
				noTailRemainder = noTail.length % maxWithSeparator;

			// (if the rest of the word can be split evenly)
			// If the word can actually be split "evenly", make that map
			if ( noTailRemainder === 0 ) {

				var remainderEvenly = noTail.length/maxWithSeparator;

				for ( var i = 0; i < remainderEvenly; i++ ) {
					chunkMap.push( maxWithSeparator );
				}
				// Add on that last, differently lengthed, chunk
				chunkMap.push( maxNumChars );

			// Otherwise, we kind of have to start from scratch
			} else {

				// When the distribution is uneven, try to even it out a bit
				chunkMap = unevenly( word, maxWithSeparator, options )
			}  // end if splits "evenly"

			return chunkMap;
		};  // End makeCharsMap()



		var splitUsingMap = function ( word, splitMap, separator ) {
		/* ( str, [int], str ) -> [ Str ]
		* 
		* Return the final array of strings using the splitMap to break
		* up the word into bits and adding whatever `separator` is
		*/
			var split 	 = [],
				regStr 	 = separator.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
				sepRegex = new RegExp(regStr + '$');

			// Build the list of strings with the right number of letters
			// as determined by the map
			var start = 0;
			for (let numi = 0; numi < splitMap.length; numi++) {
				let str = word.slice( start, start + splitMap[numi] );

				// Make sure last string doesn't get a separator
				if (numi < splitMap.length - 1) {
					// A string that already ends with the separator symbol(s)
					// shouldn't get /another/ separator
					if ( !sepRegex.test(str) ) { str = str + separator; }

				}

				split.push(str);

				// Start the next one where we finished this one
				start = start + splitMap[numi];
			};

			return split;
		};  // End splitUsingMap()



		// =====================================
		// =============== SETUP ===============
		// =====================================

		var options = {
			// The symbol or symbols that will separate each string
			separator: '-',
			// The number of characters desired as a minimum for the last 
			// string chunk (given as a fraction of the maximum characters
			// allowed in each result string)
			fractionOfMax: 0.5,
			redistribute: defaultRedistribute
		}

		userOptions = userOptions || {};

		for (let key in options) {
			if ( userOptions[key] ) { options[key] = userOptions[key] }
		}




		// =====================================
		// ============ DO THE DEED ============
		// =====================================

		var separator 	= options.separator;

		var chunkMap = makeCharsMap( wordStr, maxNumChars, options ),
			chunks 	 = splitUsingMap( wordStr, chunkMap, separator );


		return chunks;
	};  // End hyphenaxe()


    return hyphenaxe;
}));
