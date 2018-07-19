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

    //confirm that RSS feeds are populated adequately in app.js
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URLs', function() {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        it('have name', function() {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });

    });

    //conrfirm that menu functions as desired (show/hide behavior)
    describe('The Menu', function() {

        it('is hidden on page load',function() {
            const body = $(".menu-hidden")
            expect(body[0]).toBeDefined();
        });

        menuIcon = $('.menu-icon-link');        

        it('is visible on 1st click', function () {
            menuIcon.click();
            const body = $(".menu-hidden")
            expect(body[0]).not.toBeDefined();
        });

        it('is hidden on 2nd click', function () {
            menuIcon.click();
            const body = $(".menu-hidden")
            expect(body[0]).toBeDefined();
        });
    
    });

    //confirm that entries in feed are populated on loadFeed()
    describe('Initial Entries', function() {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('are populated', function() {
            const entries = $(".entry")
            expect(entries.length).toBeGreaterThan(0);
        })
    })

    //load feed 1 result into x and feed 0 result into y
    //confirm that the results are different
    describe('New Feed Selection', function() {

        var x;
        var y;

        beforeEach(function(done) {
            loadFeed(1, function () {
                x = $(".entry")[0].innerHTML;
                loadFeed(0, function () {
                    y = $(".entry")[0].innerHTML;
                    done();
                });
            });     
        });

        it('generated different results', function () {
            expect(x).not.toEqual(y);
        });
    });

}());
