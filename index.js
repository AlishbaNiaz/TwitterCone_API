// const express = require("express");
// const app = express();
// const path = require("path");
// app.set("views", path.join(__dirname, "/views"));
// const port = 8080;
// app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("home.ejs");
// });
// app.listen(port, () => {
//   console.log(`Listening to the port ${port}`);
// });
// app.get("/ig/:username", (req, res) => {
//   let username = req.params.username;
//   let userdata = require("./data.json");
//   let data = userdata[username];
//   res.render("instagram.ejs", { data });
// });
// const express=require("express");
// const app=express();
// const path=require("path");
// const port=8080;
// app.use(express.urlencoded({extended:true}));
// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
// app.use(express.static(path.join(__dirname,"public")));

// app.listen(port,(req,res)=>{
//   console.log(`Listening to port ${port}`);
// });

const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");


let port=8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

let tweet=[
  {
    id : uuidv4(),
    username : "Alishba Niaz",
    tweet_des : "I am Learning Mern Stack"
  },
  {
     id : uuidv4(),
    username : "Elisheva Niaz",
    tweet_des : "I am using laptop"
  },
  {
     id : uuidv4(),
    username : "Zumer Niaz",
    tweet_des : "I am doing social Work"
  }
];
app.get("/tweets",(req,res)=>{
  res.render("tweets.ejs",{tweet});
});

app.get("/tweets/new",(req,res)=>{
res.render("newtweet.ejs");
});

app.post("/tweets",(req,res)=>{
  let {username , tweet_des}=req.body;
  let id=uuidv4();
tweet.push({id,username,tweet_des});
res.redirect("/tweets");
});

app.get("/tweets/:id",(req,res)=>{
let {id}=req.params;
let fulltweet=tweet.find((p)=>id==p.id);
res.render("show.ejs",{fulltweet});
});

app.patch("/tweets/:id",(req,res)=>{
  let {id}=req.params;
  let newTweetDes=req.body.tweet_des;
  let t=tweet.find((p)=>p.id==id);
  t.tweet_des=newTweetDes;
    res.redirect(`/tweets/${id}`);
});

app.get("/tweets/:id/edit",(req,res)=>{
  let {id}=req.params;
  let tweetedit=tweet.find((p)=>id==p.id);
res.render("edit.ejs",{tweet:tweetedit});
});

app.delete("/tweets/:id",(req,res)=>{
    let {id}=req.params;
  tweet=tweet.filter((p)=>p.id != id);
  res.redirect("/tweets");

});
app.listen(port,()=>{
  console.log(`Listening to the port ${port}`);
})