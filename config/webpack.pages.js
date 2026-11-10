const HtmlWebpackPlugin = require('html-webpack-plugin')

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks
  })
}

const htmlPages = [
  createPages('./src/index.html', './index.html', ['index', 'events']),
  createPages('./src/pages/about.html', './about.html', ['index', 'events']),
  //createPages('./src/events.html', './events.html', ['index']),
  createPages('./src/pages/events/event1.html', './events/event1.html', ['index', 'events']),
  createPages('./src/pages/events/event2.html', './events/event2.html', ['index', 'events']),
  createPages('./src/pages/events/event3.html', './events/event3.html', ['index', 'events']),
  createPages('./src/pages/game-diceduel.html', './game-diceduel.html', ['index','game-dicecuel']),
]

module.exports = htmlPages
