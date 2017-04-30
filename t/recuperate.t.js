require('proof')(6, prove)

function prove (assert) {
    var recuperate = require('..')
    assert(recuperate(function () { return 1 }, 2), 1, 'happy path')
    recuperate(function () { assert(true, 'no return') })
    assert(recuperate(function () {
        throw new Error
    }, 2), 2, 'recuperated')
    assert(recuperate(/^thrown$/, function () {
        var error = new Error
        error.code = 'ENOENT'
        throw new Error('thrown')
    }, 3), 3, 'caught based on message')
    assert(recuperate(/^code:ENOENT$/, function () {
        var error = new Error
        error.code = 'ENOENT'
        throw error
    }, 4), 4, 'caught based on code')
    try {
        recuperate(/^code:ENOENT$/, function () { throw new Error('thrown') })
    } catch (error) {
        assert(error.message, 'thrown', 'failed to catch')
    }
}
