import express from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';
import { cwd } from 'process';

import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {
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

export default (router: express.Router) => {
	router.post('/login', (req, res) => {
		const username=req.body.username;
		const password=req.body.password;
		let found = false;
		
		//compare username, password with csv file
		console.log(cwd());
		fs.createReadStream(cwd() + '/credentials.csv')
		.pipe(csvParser())
		.on('data', (data) => {
			if(username === data.username){
				found=true;
				if(password === data.password){
					let token = jwt.sign({
						username: username,
					}, jwtOptions.secretOrKey);
					res.status(200).send({ token: token });
				}else{
					res.status(401).send('Wrong Password for user: ' + username);
					console.log('Wrong Password for user: ' + username);
				}
			}
		})
		.on('end', () => {
			if(!found){
				res.status(401).send('Unauthorized username: '+ username);
				console.log('Unauthorized username: '+ username);
			}
		});
	});
	
	//register

	// router.post('/register', (req, res) => {
//     const username=req.body.username;
//     const password=req.body.password;

//     if(true){
//         res.status(400).send('Username '+ username +'is already taken');
//     }else{
//         res.status(200).send('Registration success');
//     }
	// });

}