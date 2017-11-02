/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-02 22:25:18
 * @version $Id$
 */
var r20 = /%20/g;
var rbracket = /\[\]$/;
var tools = {
    isFunction: function(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    },
    isArray: function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
};

//Serializea set of key/values into a query string
tools.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
            // If value is a function, invoke it and return its value
            value = tools.isFunction(value)
                ? value()
                : value == null ? '' : value;
            s[s.length] =
                encodeURIComponent(key) + '=' + encodeURIComponent(value);
        };

    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
    }

    // Return the resulting serialization
    return s.join('&').replace(r20, '+');
};

function buildParams(prefix, obj, traditional, add) {
    var name;

    if (tools.isArray(obj)) {
        // Serialize array item.
        obj.forEach(function(v, i) {
            if (traditional || rbracket.test(prefix)) {
                // Treat each array item as a scalar.
                add(prefix, v);
            } else {
                // Item is non-scalar (array or object), encode its numeric index.
                buildParams(
                    prefix + '[' + (typeof v === 'object' ? i : '') + ']',
                    v,
                    traditional,
                    add
                );
            }
        });
    } else if (!traditional && typeof obj === 'object') {
        // Serialize object item.
        for (name in obj) {
            buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
        }
    } else {
        // Serialize scalar item.
        add(prefix, obj);
    }
}