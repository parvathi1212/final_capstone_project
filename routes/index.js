var express = require('express');

var router = express.Router();
var path = require('path');
const request = require("request");

const {initializeApp , cert} = require("firebase-admin/app");
const {getFirestore} = require('firebase-admin/firestore');

var serviceAccount = {
  "type": "service_account",
  "project_id": "capstoneproject-794c1",
  "private_key_id": "7d982c024e5f7968eb7239fffa1e30acb52a5fec",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtdkk5b+cixIaw\nvQEnOSc4LsHkvnHRSV8vSLYpeIIAWJZUukSwESf9WBOvClRcGcK5K403DT4NKAcQ\nvKHAeHfsnDnqUYmrjaDxFcwIZR2u3P18SDS0NIviTQIO//LXo1u2wurUClilc114\nQOuc1X+9DGW5SlVHoF7TDPu94fg444sQCw8Tca8MzoYxSKxZnkqo+UbghVo9s6u2\nEaPDtjgm0PumwYrTDHc7Z+9/dGFfvCFekZsjpNR/8UD6r57YtyAlEPhcVZ/cUFL9\nTiJx0IyyklsqZtha7vqPiKqrsreTsUU8v9EdCPOXeYzZWjcX2N89zAMWAC65vqKO\nItZuX7zHAgMBAAECggEAG2MaUJKVyxbTBUNHfqqMF1dv5EPFXfvYUXOI1Kdi2dci\nyncrsnjNouGtyeyMQTZirjBteAxZMw6SKaxUBZAqWcCYzEwvZldS2n2h3I7KeaSz\n86lwLiZAZ8HXhLLDOWoLaExXcz8Rm/MeW4bfLGtGYyd6msoHs5VjI1i2GSwnsCN0\nc/4KMOcgf/rfAbpPoAVoA1tFMrhoO4lbH2I6fX6lK2ppZVkYivq3byBJ1mKMveIT\nXR/UWndl61zyC1NScKVJgUNvCaqo8t4KicUsL63A/rdTkDwnz7Pz9zfCNvySd0rB\nKxfjeoQxIob7SYYgctlrNQNpa+5Gn7qrctu9xXRBEQKBgQDyprltlm6rr1flNRI9\nhW9MQq+gjcRcdCyPUsZvNwgRWExWG7px68huEzM+vuhQovVCP09XHIxd9185gkFX\ngFzWue8RLlHz8YfcW5hkARZtTwxuHDOnc9QpqXRM78dHny6CV63UQHK/b/iUJwZU\nW41DOkUeUXwhP3nFfC2hwxnMowKBgQC3ASo4/k6RxyvOHSauTiErzfgGVXO+b50l\nkraEVjkDRxCoply8VqI0fXgTode2AsoKX0IY45+i8urc5K28b28qCJ/1I6Ww9ZyJ\n5q13ETJQCKakiwxhSFMu94D5qhIHoqNwyuKN0MTS46EGAtTzQTBkrtUhHj/ewCd1\ngDjp479NjQKBgFE+f4Fwx9dWGzDURyowHibDgThZnzBxeWX3ihc8rsfX7585I4D3\nOCGa7iKJGxG8ri+jMPZyyZDAvbJsqWIZyXvfv2raPnhWG24tgOWi85ZfzEKl0Km1\nf4j/gsAr3GZfptvfbYVOmtz8KZe5RUZDbRXgUbooAE7FiQkVXdX2lBHPAoGBAIhU\nb9XhbTqgO3vir4wuW/u8BscBJaZ6k4EIGLvhV7ufV0OsG22axF+CEM/fQ0kuLsEn\nUaAlAilr+ZbxLJQyF4giwLboBWkcr67zj8ohn2+L4ki15VUbggx9CTH0hlX1zPgb\nzEaFffr05GIL/gPxTlHTBKcVV9NjJoIcMUncBgmJAoGAGz9jyBmQ5ZcisFIT6OdG\nKfOdXK3urg4CIDwK8kQPfr8MYO9VQDZP4Lr0KnrTtr36JEa/IUv+l1QtGf7w6sZo\nmjh/J0WZHqTNC0ZBNAc8jumukktHQuIo0F7JkuEch07c09lMH31HCKeE97odmDkp\n8YkzqVKDlvAeAIcGhATEA+A=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-dzlep@capstoneproject-794c1.iam.gserviceaccount.com",
  "client_id": "111574532583452475635",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dzlep%40capstoneproject-794c1.iam.gserviceaccount.com"
}

initializeApp({
  credential:cert(serviceAccount),
});
const db = getFirestore();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loginpage',function(req,res){
  res.render('loginpage');
});

router.get('/navsubmit',function(req,res){
  res.render('signuppage');
});

router.get('/loginsubmit',(req,res)=>{
    const email = req.query.email;
    const password = req.query.password;

    db.collection("users")
    .where("email","==",email)
    .where("password","==",password)
    .get()
    .then(
      (docs)=>{
        if(docs.size > 0){
          var usersData = [];
          db.collection("users")
          .get()
          .then(
            (docs)=>{
              docs.forEach((doc)=>{
                usersData.push(doc.data());
              })
            }
          ).then(()=>{
            console.log(usersData);
            res.render('home',{userData:usersData});
          })
        }
        else{
           res.send("Invalid Login");
        }
      }
    )
});

router.get('/signuppage',function(req,res){
  res.render('signuppage');
});
router.get('/signupsubmit',function(req,res){
    const name = req.query.name;
    const email = req.query.email;
    const password = req.query.password;
    const age = req.query.age;
    const phone = req.query.phno;
    db.collection("users").add({
      name:name,
      email:email,
      password:password,
      age:age,
      phno:phone

    }).then(()=>{
      res.render('loginpage');
    })
});



router.get("/getMovie", function (req, res) {
  res.render("moviepage");
});

router.get("/movieName", function (req, res) {
  const movieNameeee = req.query.name_of_movie;

  request(
    "http://www.omdbapi.com/?t=" + movieNameeee + "&apikey=12bd2b2f",
    function (error, response, body) {
      console.log(JSON.parse(body));
      if (JSON.parse(body).Response == "True") {
        const director = JSON.parse(body).Director;
        const imdb = JSON.parse(body).imdbRating;
        const coll = JSON.parse(body).BoxOffice;
        res.render("movies", {
          director: director,
          movieName: movieNameeee,
          coll : coll,
          imdb : imdb
        });
      } else {
        res.send("<h1>Somenthing went Wrong! Try Again </h1>");
      }
    }
  );
});



module.exports = router;
