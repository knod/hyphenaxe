# hyphenaxe
Crudely splits a one-word string into a list of pre-hyphenated strings by desired max number of characters per unit, not by syllable or prefix/suffix

The separation symbol doesn't have to be a hyphen, it can be any string, but any characters in the string will be counted against

##Boring Examples

```js
var axe = require( "hyphenaxe" );

axe( "123123123", 3 );
// returns ["12-", "31-", "23-", "123"]

axe( "123123", 3 );
// returns ["12-", "31-", "23"]

axe( "123123", 5 );
// returns ["123-", "123"]

axe( "123123", 5, {separator: "**"} );
// returns ["123**", "123"]

axe( "123123", 5, {fractionOfMax: 0.5} );
// returns ["1231-", "23"]
```

##Options

User option defaults are:

```js
{
	// (Fairly simple)
	// The symbol or symbols that will separate each string
	separator: '-',
	
	// (Intermediate)
	// The number of characters desired as a minimum for the last 
	// string chunk (given as a fraction of the maximum characters
	// allowed in each result string)
	fractionOfMax: 0.75,

	// (Advanced)
	// A function that makes the string chunks of the word more
	// evenly distributed. It takes an array of already evenly
	// distributed strings that do not include the last chunk,
	// an integer representing how many are desired in the last
	// chunk, and an integer of how many are currently slated
	// for being in the last chunk. Check out the default function
	// for more details
	redistribute: defaultRedistribute
}
```

##Install with npm

```
npm install --save @knod/hyphenaxe
```

MIT License

Issues and pull requests welcome
