import assert from 'assert'
import resize from '../src/index.js'

const domain = 'https://example.com'

describe('general', function() {
    it('should be quality equal to 75', function() {
        assert.strictEqual(resize(`${domain}/images/example.jpg`), `${domain}/cdn-cgi/image/q=75/images/example.jpg`)
    })
    it('check with several options', function() {
        assert.strictEqual(
            resize(`${domain}/images/example.jpg`, 500, { fit: 'cover' }),
            `${domain}/cdn-cgi/image/fit=cover,w=500,q=75/images/example.jpg`
        )
    })
})

describe('width', function() {
    it('should be without width, just quality', function() {
        assert.strictEqual(resize(`${domain}/images/example.jpg`), `${domain}/cdn-cgi/image/q=75/images/example.jpg`)
    })

    it('should be width equal to 640', function() {
        assert.strictEqual(resize(`${domain}/images/example.jpg`, 640), `${domain}/cdn-cgi/image/w=640,q=75/images/example.jpg`)
    })

    it('should be width equal to 200', function() {
        assert.strictEqual(resize(`${domain}/images/example.jpg`, 640, { w: 200 }), `${domain}/cdn-cgi/image/w=200,q=75/images/example.jpg`)
    })

    it('should be width equal to 100', function() {
        assert.strictEqual(resize(`${domain}/images/example.jpg`, null, { w: 100 }), `${domain}/cdn-cgi/image/w=100,q=75/images/example.jpg`)
    })
})

describe('quality', function() {
    it('should be quality equal to 50', function() {
        assert.strictEqual(resize(`${domain}/images/example.jpg`, null, { q: 50 }), `${domain}/cdn-cgi/image/q=50/images/example.jpg`)
    })
})
