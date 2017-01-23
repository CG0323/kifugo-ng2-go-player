import * as gulp from 'gulp';
import Config from '../../config';

export = () => {
return gulp.src(Config.CSS_IMAGE_SRC)
    .pipe(gulp.dest(Config.CSS_IMAGE_DEST));
};