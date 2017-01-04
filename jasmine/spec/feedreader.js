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
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });

    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('displays/hides when icon is clicked', function() {
            if ($('body').hasClass('menu-hidden')) {
                expect($('.slide-menu').position().left).toBeLessThan(0);
            } else {
                expect($('.slide-menu').position().left).not.toBeLessThan(0);
            }
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('asynchronous function is run successfully and loads at least one .entry in .feed', function(done) {
            expect(self.initialComplete).toBe(true);
            expect($('.feed').find('.entry').length).not.toBeLessThan(1);
            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var entryFeedOne,
            entryFeedTwo;


        /* I inverted the loadFeed ID to run to loadFeed(1) prior the loadFeed(0) so that the 
         * page would correctly start on Udacity Blog feed selection
         */

        describe('First AJAX runs', function() {
            beforeEach(function(done) {
                loadFeed(1, function() {
                    done();
                });
            });

            it('and loads first batch of feeds', function(done) {
                entryFeedOne = $('.entry').text();
                expect(entryFeedOne).toBeDefined();
                expect(entryFeedOne.length).not.toBeLessThan(0);
                done();
            });
        });

        describe('Second AJAX runs', function() {
            beforeEach(function(done) {
                loadFeed(0, function() {
                    done();
                });
            });

            it('and loads a different batch of feeds', function(done) {
                entryFeedTwo = $('.entry').text();
                expect(entryFeedTwo).toBeDefined();
                expect(entryFeedTwo.length).not.toBeLessThan(0);
                expect(entryFeedOne).not.toEqual(entryFeedTwo);
                done();
            });
        });
    });

}());