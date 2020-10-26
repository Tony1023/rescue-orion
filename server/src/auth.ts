import fs from 'fs';
import csvParser from 'csv-parser';
import { cwd } from 'process';
import passport from 'passport';
import passportJWT from 'passport-jwt';

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'skrskr',
};

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
	let found = false;
	fs.createReadStream(cwd() + '/credentials.csv')
		.pipe(csvParser())
		.on('data', (data) => {
			if (jwtPayload.username === data.username) {
				found = true;
				next(null, data.username);
			}
		})
		.on('end', () => {
			if (!found) {
				next(null, null);
			}
		});
});

passport.use(strategy);
export { passport };