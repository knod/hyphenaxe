describe("hyphenaxe", function() {

  var axe = require('../../lib/hyphenaxe.js');

  // beforeEach(function() {
  //   player = new Player();
  //   song = new Song();
  // });

  // it("should be able to play a Song", function() {
  //   player.play(song);
  //   expect(player.currentlyPlayingSong).toEqual(song);

  //   //demonstrates use of custom matcher
  //   expect(player).toBePlaying(song);
  // });

  describe("when given a non-string value as the first argument", function() {
    it('should return that value'), function() {
      expect( axe( undefined, 2 ) ).toEqual( undefined );
      expect( axe( null,      2 ) ).toEqual( null );
      expect( axe( 0,         2 ) ).toEqual( 0 );  // Should error?
      expect( axe( 1,         2 ) ).toEqual( 1 );
      expect( axe( 3,         2 ) ).toEqual( 3 );
    });
  });

  describe("when given ( str, int ) where str.length <= int", function() {
    it('should return [ str ]'), function() {
      expect( axe( '1',    2) ).toEqual( ['1'] );
      expect( axe( '12',   2) ).toEqual( ['12'] );
      expect( axe( '123',  3) ).toEqual( ['123'] );
    });
  });
      // expect( axe( '1-2',  2) ).toEqual( ['1-', '2'] );
      // expect( axe( '1.2',  2) ).toEqual( ['1-', '.2'] );
      // expect( axe( 0 ).toEqual( [ '' ] );  // ? []? null? error?
      // expect( axe( 0.5 ).toThrow() // warning? error?
      // expect( axe( 1 ).toEqual( [ '1', '2', '3' ] );
      // expect( axe( 2 ).toEqual( [ '1-', '23' ] );
      // expect( axe( 5 ).toEqual( [ '123' ] );
      // expect( axe( 105 ).toEqual( [ '123' ] );
      // expect( axe( '1', 3 ).toEqual( [ '1' ] );
      // expect( axe( '123', 3 ).toEqual( [ '123' ] );
      // expect( axe( '1231', 3 ).toEqual( [ '12-', '31' ] );
      // expect( axe( '12-31', 3 ).toEqual( [ '12-', '31' ] );  // ?
      // expect( axe( '123123', 5 ).toEqual( [ '123-', '123' ] );  // Redistribution test?
      // expect( axe( '123', 3, {separator: '--'} ).toEqual( [ '1--', '2--', '3' ] );    (separator plain test)
      // expect( axe( '123', 3, {separator: ''} ).toEqual( [ '1--', '2--', '3' ] );      (separator empty test)
      // expect( axe( '123', 3, {separator: 1} ).toEqual( [ '1--', '2--', '3' ] );       (separator non-string test)
      // expect( axe( '123', 3, {separator: undefined} ).toEqual( [ '1--', '2--', '3' ] );   (separator undefined test)
      // expect( axe( '123', 3, {separator: null} ).toEqual( [ '1--', '2--', '3' ] );    (separator null test)
      // expect( axe( '123', 3, {separator: '**'} ).toEqual( [ '1**', '2**', '3' ] );    (regex escape test)
      // expect( axe( '1--23', 3, {separator: '--'} ).toEqual( [ '1--', '23' ] );      (separator interference test)
      // expect( axe( '123123', 5, {fractionOfMax: 0.5} ).toEqual( [ '1231-', '23' ] );    (fractionOfMax plain test)
      // expect( axe( '123123', 5, {fractionOfMax: '2'} ).toEqual( [ '1231-', '23' ] );    (fractionOfMax non-int test)
      // expect( axe( '123123', 5, {fractionOfMax: undefined} ).toEqual( [ '1231-', '23' ] ); (fractionOfMax undefined test)
      // expect( axe( '123123', 5, {fractionOfMax: null} ).toEqual( [ '1231-', '23' ] );   (fractionOfMax null test)

        
  // describe("when given ( str, int ) where str.length < int", function() {
  //   it('should return [ str ] of `str` split into groups based on `int`, separated by hyphens'), function() {
  //     expect( axe( '1',    2) ).toEqual( ['1'] );
  //     expect( axe( '12',   2) ).toEqual( ['12'] );
  //     expect( axe( '123',  2) ).toEqual( ['123'] );
  //     expect( axe( '1-2',  2) ).toEqual( ['1-', '2'] );
  //     expect( axe( '1.2',  2) ).toEqual( ['1-', '.2'] );
  //   });
  // });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrowError("song is already playing");
  //   });
  // });
});
