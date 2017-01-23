import * as gulp from 'gulp';
import Config from '../../config';

export = () => {
  return gulp.src(Config.THEME_FONTS_SRC)
      .pipe(gulp.dest(Config.THEME_FONTS_DEST));
};