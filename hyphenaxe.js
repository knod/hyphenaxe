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
	*/
		// =====================================
		// ========= QUICK AS WE CAN ===========
		// =====================================

		// If it doesn't need to be broken up at all, just return what we have in an array
		if ( wordStr.length <= maxNumChars ) { return [wordStr]; }
		// If it's just one character long, no room for symbols anyway
		if ( maxNumChars === 1 ) { return wordStr.split(''); }



		// =====================================
		// =============== SETUP ===============
		// =====================================

		var options = {
			// The symbol or symbols that will separate each string
			separator: '-',
			// The number of characters desired as a minimum for the last 
			// string (given as a fraction of the maximum characters allowed
			// in each result string)

			// ?? Can be false, I suppose? For min value? Or 1%?
			fractionOfMax: 0.5
		}

		userOptions = userOptions || {};

		for (let key in options) {
			if ( userOptions[key] ) {options[key] = userOptions[key] }
		}



		// =====================================
		// =========== CALCULATIONS ============
		// =====================================


		var unevenly = function ( word, maxChars, minForLast ) {
		/* ( str, int, int )
		* 
		* Redistribute the unevenness
		*/
			var chunkMap = [];

			// Find how much would remain after dividing the string evenly
			// If there's an imbalance, redistribute a bit (future option as to how?)
			var evenly = Math.floor(word.length/maxWithSeparator);

			// ---- last chunk ----
			var remainder 	= word.length % maxWithSeparator,  // actually left over
				wanted 		= Math.max( minForLast, remainder );  // whatever's bigger
				missing 		= wanted - remainder;  // what's missing

			// Redistribute to get that result (in a somewhat sensical? way)
			// Right now: letters are removed from the starting strings in
			// order to make up for the last string (really I'd rather take from
			// every other group, visiting all eventually (0, 2, 4, 1, 3),
			// but this is just proof of concept)

			// Don't include last chunk. Addd that in after.
			for (let counti = 0; counti < evenly; counti++) {
				chunkMap.push( maxWithSeparator );
			};

			var loopAt = chunkMap.length,
				indx   = 0;
			while ( missing > 0 ) {

				// Whatever number is here, subtract one
				// (It'll be included on that last chunk)
				chunkMap[indx] = chunkMap[indx] - 1;

				indx 	= indx + 1;
				// Start from the beginning string again if more need to be redistributed
				indx 	= indx % loopAt;
				missing 	= missing - 1;
			}

			chunkMap.push( wanted );

			return chunkMap;
		};  // End unevenly()


		var makeCharsMap = function ( word, maxNumChars, options ) {
		/* ( str, int ) -> [Int]
		* 
		* Return an array of integers represeting the length
		* of each group into which the word will be broken up
		* 
		* Ex1: makeCharsMap( '123123123', 3 ) returns: ['12-', '31-', '23-', '123']
		* Ex2: makeCharsMap( '123123', 3 ) returns: ["1-", "23-", "12-", "3"]
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

				// word, maxWithSep, options

				var remainderEvenly = Math.floor(word.length/maxWithSeparator);

				// ---- last chunk ----
				// Find how much would remain after dividing the string evenly
				// If there's an imbalance, redistribute a bit (future option?)

				var remainder 	= word.length % maxWithSeparator,  // actually left over
					min 		= Math.floor( maxNumChars * options.fractionOfMax ),
					needed 		= Math.max( min, remainder );  // whatever's bigger

				// Redistribute to get that result (in a somewhat sensical? way)
				// Right now: letters are removed from the starting strings in
				// order to make up for the last string (really I'd rather take from
				// every other group, visiting all eventually (0, 2, 4, 1, 3),
				// but this is just proof of concept)

				// Don't include last chunk. Addd that in after.
				for (let counti = 0; counti < remainderEvenly; counti++) {
					chunkMap.push( maxWithSeparator );
				};

				var loopAt 		= chunkMap.length,
					indx   		= 0;
				while ( needed > 0 ) {

					// Whatever number is here, subtract one
					// (It'll be included on that last chunk)
					chunkMap[indx] = chunkMap[indx] - 1;

					indx 	= indx + 1;
					// Start from the beginning string again if more need to be redistributed
					indx 	= indx % loopAt;
					needed 	= needed - 1;
				}

				chunkMap.push( min );
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
				sepRegex = new RegExp(separator + '$');

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
		// ============ DO THE DEED ============
		// =====================================

		var separator 	= options.separator,
			minLastStr 	= options.fractionOfMax;

		var chunkMap = makeCharsMap( wordStr, maxNumChars, options ),
			chunks 	 = splitUsingMap( wordStr, chunkMap, separator );


		return chunks;
	};  // End hyphenaxe()


    return hyphenaxe;
}));
