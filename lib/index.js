
'use strict';

module.exports = ThisPlugin;

function ThisPlugin() {}

ThisPlugin.prototype.install
    = function(less) {
        less.functions.functionRegistry
            .addMultiple(require("./main")(less));
};
