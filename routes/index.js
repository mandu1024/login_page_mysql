var express = require('express');
var router = express.Router();

var mysql=require('mysql');
var nodemailer = require('nodemailer');


const connection = mysql.createConnection({
  host: "*************************.amazonaws.com",
  port: "3306",
  database: '*****',
  user: "*******",
  password: "********",
});

connection.connect(err=>{
  if(err) console.error('mysql connection error:' + err);
  else console.log('mysql is connected successfully!');
});


router.post('/checkid', function(req,res){
  const user_email = req.body.id;

  console.log('mailcheck:' +user_email);

  const sql = 'SELECT email FROM usertable WHERE email=?'

  connection.query(sql, [user_email], function(err,rows,fields){
    console.log(rows);

    let checkid = new Object();
    checkid.bool = false;

    if(rows[0] ===undefined){
      checkid.bool = true;
      res.send(checkid)
    }else{
      checkid.bool = false;
      res.send(checkid);
    }

  })
})

router.post('/sendEmail', async function(req,res){
  const user_email = req.body.id;
  const auth_number = req.body.num;

  console.log('auth_number: '+ auth_number);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
      user: '*******@gmail.com',
      pass: '********'
    }
  });

  let info = await transporter.sendMail({
    from: '*****@gmail.com',
    to: user_email,
    subject: '안녕하세요. ',
    text: auth_number,
  });
})

module.exports = router;
