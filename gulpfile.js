const {src, dest, watch, parallel, series} = require('gulp');
const wpPot = require('gulp-wp-pot');

function generate_pot_file() {
    return src(['src/**/*.php', 'views/**/*.php'])
        .pipe(wpPot({
            domain: 'plugin-text-domain',
            package: 'Digthis Package'
        }))
        .pipe(dest('languages/plugin-base.pot'));
}

exports.generate_pot = generate_pot_file;