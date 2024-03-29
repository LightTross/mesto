const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // подключаем плагины к PostCSS
  plugins: [
    // подключаем autoprefixer
    autoprefixer,
    // cssnano при подключении  передаем объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};
