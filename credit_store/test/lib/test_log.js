var logger = require('../../lib/log.js');

describe("log.js", function() {
    describe("logger should logger content by level.", function() {
        it("logger should logger content by level.", function(done) {
            logger.trace('trace');
            logger.debug("debug");
            logger.info("info");
            logger.warn("warn");
            logger.error("error");
            logger.fatal("fatal");
            done();
        })
    });
});
