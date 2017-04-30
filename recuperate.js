module.exports = function (f, v) {
    var vargs = Array.prototype.slice.call(arguments), match = null
    if (vargs[0] instanceof RegExp) {
        var $ = /^\/\^([$\w][$\w\d]*):/.exec(vargs[0].toString())
        var test = $ ? {
            regex: vargs.shift(),
            prefix: $[1] + ':',
            property: $[1]
        } : {
            regex: vargs.shift(),
            prefix: '',
            property: 'message'
        }
        match = function (error) {
            return test.regex.test(test.prefix + error[test.property])
        }
    } else {
        match = function () { return true }
    }
    try {
        return vargs.shift().call()
    } catch (e) {
        if (!match(e)) {
            throw e
        }
        if (vargs.length) {
            return vargs.shift()
        }
    }
}
