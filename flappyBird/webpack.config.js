var path = require('path');
module.exports = {
    mode: "development",
    entry: {
        DataStore: './js/base/DataStore.js',
        ResourceLoader: './js/base/ResourceLoader.js',
        Resources: './js/base/Resources.js',
        Sprite: './js/base/Sprite.js',
        Birds: './js/player/Birds.js',
        Score: './js/player/Score.js',
        StartButton: './js/player/StartButton.js',
        ApiExamples: './js/ApiExamples.js',
        directors: './js/Director.js',
        game:'./game.js',
        Main:'./Main.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{test: /\.js$/, exclude: /node_modules/}]
    }
}