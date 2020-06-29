const {src, dest, watch, parallel, series} = require('gulp');
const wpPot = require('gulp-wp-pot');
function generate_pot_file() {
    return src(['**/*.php','!vendor/**/*.php'])
        .pipe(wpPot({
            domain: 'plugin-text-domain',
            package: 'Digthis Package'
        }))
        .pipe(dest('languages/plugin-text-domain.pot'));
}

exports.generate_pot = generate_pot_file
