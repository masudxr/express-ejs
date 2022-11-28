import express from "express";
const app = express();
const port = 3000;

// Register view engine
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
});

// middleware//
app.use((req, res, next)=>{
  // console.log('new request mode: ');
  // console.log('host: ', req.hostname);
  // console.log('path: ', req.path);
  // console.log('method: ', req.method);
  next();
});
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get ('/home', (req, res) => {
  res.render('home', { title: 'Home Page', Blogs});
});

app.get ('/about', (req, res) => {
  // res.send("This is a About page");
  const info = [
    {Name: 'Masud'},
    {Name: 'Arafath'},
  ];
  // console.log(path.resolve())
  res.render('about', { title: 'About', info});
});

let Blogs = [];
let ArrId;
let p=1;
class FormClass {
  id;
  title;
  body;
  constructor (p, title, body){
    this.id = p;
    this.title = title;
    this.body = body;
  }
  getId(){
    return this.id;
  }
  Push(A){
    this.id = A;
    p++;
  }
  getTitle(){
    return this.title;
  }
  getBody(){
    return this.body;
  }
}

//post from create form///
app.post('/home', (req,res) => {
  console.log(req.body);
  const info = new FormClass(p,req.body.title, req.body.body);
  info.Push(p);
  console.log('info id:', info.id);
  Blogs.push(info);
  console.log(Blogs);
  
  // console.log(Blogs[Blogs.length-1]);
  // console.log(Blogs[Blogs.length-1].getId());
  // console.log(Blogs[Blogs.length-1].getTitle());
  // console.log(Blogs[Blogs.length-1].getBody());
  res.render('home', { title: 'Post input info', Blogs});
});

app.get('/create/blogs', (req, res) => {
  res.render('create', { title: 'Create New blogs'});
});

app.get('/blogs/:id/remove', (req, res) => {
let Arr2 = [];
let RemoveId;
  ArrId = Number(req.params.id);
  console.log(req.params);
  console.log('id', ArrId);
    for (let i=0; i<Blogs.length; i++){
      if (ArrId !=Blogs[i].getId()){
          Arr2.push(Blogs[i]);
      }
      if (ArrId ==Blogs[i].getId()){
        RemoveId = Blogs[i].getId();
      }
      console.log('Arr 2 new values', Arr2);
      console.log('RemoveId new values', RemoveId);

    }
  if (Arr2.length >0){
    Blogs = Arr2;
    res.render('remove', { title: 'Succesfully deleted', RemoveId})
  }

});


app.get('/blogs', (req, res) => {
  res.render('blogs', { title: 'Post blogs', Blogs, ArrId});
});

app.get('/blogs/:id', (req, res) => {
  let Arr3 = [];
  let BlogsId = Number(req.params.id);
  console.log(req.params);
  console.log('id', BlogsId);
  for (let i=0; i<Blogs.length; i++){
    if (BlogsId == Blogs[i].getId()){
      Arr3.push(Blogs[i]);
    }
  }
    console.log('Arr3 new values', Arr3);
    res.render('blogs', { title: 'Post with Id', Blogs, BlogsId, Arr3})
  
});

app.get('/remove', (req, res) => {
  res.render('remove', { title: 'Remove post blogs', Blogs, ArrId});
});

// 404 page
app.use ((req, res) => {
  // console.log(path.resolve())
  res.status(404).render('404', { title: '404'});
});
