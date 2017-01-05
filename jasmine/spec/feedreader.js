/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* Test making sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test checking that all feed sources in the allFeeds
         * object exist, have a URL defined and that the URL is not empty.
         */

        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
                // Truthy in this situation covers cases where feed.url 
                // is undefined and where it is an empty string
                expect(feed.url).toBeTruthy();
            });
        });

        /* Test looping through each feed in the 
         * allFeeds object and ensuring it has a name defined
         * and that the name is not empty.
         */

        it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
        });

    });


    describe('The menu', function() {
        var defaultClass, removeClass, addClassBack;

        /* beforeEach will record whether body has the menu-hidden class when
         * 1) page loads (defaultClass) 
         * 2) after 1st menu-icon click (removeClass)
         * 3) after 2nd menu-icon click (addClassBack)
         */
        beforeEach(function() {
            defaultClass = $('body').hasClass('menu-hidden'); 
            $('.menu-icon-link').trigger('click');
            removeClass = $('body').hasClass('menu-hidden');
            $('.menu-icon-link').trigger('click');
            addClassBack = $('body').hasClass('menu-hidden');
        });

        // Test ensuring the menu element is hidden by default.
        it('is hidden by default', function() {
            expect(defaultClass).toBe(true);
        });

        it('displays after click', function() {
            expect(removeClass).toBe(false);
        });        

        it('hides after second click', function() {
            expect(addClassBack).toBe(true);
        });        
    });


    describe('Initial Entries', function() {

        /* Test ensuring loadFeed function is called and 
         * completes its work & there is at least a single
         * .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('asynchronous function is run successfully and loads at least one .entry in .feed', function(done) {
            expect(self.initialComplete).toBe(true);
            expect($('.feed .entry').length).not.toBeLessThan(1);
            done();
        });

    });


    describe('New Feed Selection', function() {

        var entryFeedOne, entryFeedTwo;


        /* beforeEach will run loadFeed asynchronously twice & record 
         * the text from $('.entry') array when:
         * 1) page loads first feed (entryFeedOne) 
         * 2) page loads second feed (entryFeedTwo)
         */
        beforeEach(function(done) {
            loadFeed(1, function() {
                entryFeedOne = $('.entry').text();
                loadFeed(0, function() {
                    entryFeedTwo = $('.entry').text();
                    done();
                });
            });
        });


        // Test ensuring that both feeds have loaded and that they are not empty

        it('feeds are loaded successfully', function() {
            expect(entryFeedOne).toBeTruthy();
            expect(entryFeedTwo).toBeTruthy();
        });

        // Test ensuring that both loaded feeds are different 

        it('loaded feeds are different from one another', function() {
            expect(entryFeedOne).not.toEqual(entryFeedTwo);
        });
    });

}());