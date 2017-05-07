
'use strict';

module.exports = function(less) {

// ............................................................

    var tree        = less.tree,
        Anonymous   = tree.Anonymous,
        Value       = tree.Value;

// ............................................................

    var functions = {

        // ....................................................

        'current-selector': function(y) {
            var context = this.context,
                frames  = context.frames,
                level   = [],
                selectors, list,
                i, j, n = frames.length - 1;

            // extract selectors array(s) from frames:
            for (i = 0; i < (frames.length - 1); i++) {
                selectors = frames[i].selectors;
                if ((frames[i].type === 'Ruleset') && selectors) {
                    level.push(list = []);
                    for (j = 0; j < selectors.length; j++)
                        list.push(selectors[j].toCSS(context)); // note: this won't handle proper scope of variable interpolation (if any)
                }
            }

            // build combinatorial list:
            list = explode(level, 0);
            for (i = 0; i < list.length; i++)
                list[i] = new Anonymous(list[i].trim());
            return new Value(list);
        }

        // ....................................................

    };

    return functions;

// ............................................................
// helpers:

    function explode(list, i) {
        if (!list[i + 1])
            return list[i];
    
        var r = [],
            tail = explode(list, i + 1);
        list = list[i];
    
        for (var j = 0; j < list.length; j++)
            for (var k = 0; k < tail.length; k++)
                r.push(tail[k] + list[j]);
        return r;
    }

// ............................................................

}; // ~ end of module.exports
