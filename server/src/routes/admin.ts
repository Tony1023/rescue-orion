import express from 'express';
import io from 'socket.io';
import csvParser from 'csv-parser';
import fs from 'fs';



export default (router: express.Router) => {
    router.post('/login', (req, res) => {
        const username=req.body.username;
        const password=req.body.password;
        var found=false;
        
        //compare username, password with csv file
        const results: any[] = [];
        fs.createReadStream(__dirname+'/credentials.csv')
        .pipe(csvParser())
        .on('data', (data) => {
            if(username === data.admin){
                found=true;
                if(password === data.password){
                    //send a token
                    console.log('Login Successful');
                }else{
                    res.status(401).send('Wrong Password for user: ' + username);
                    console.log('Wrong Password for user: ' + username);
                }
            }
        })
        .on('end', () => {
            if(found==false){
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