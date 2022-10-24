module.exports = {
    output: {
      publicPath: '/public/'
    },
    module: {
      loaders: [
        {
          test: /\.(gif|jpeg|jpg|png|svg)$/,
          loader: 'image-size-loader'
        }
      ]
    }
  };