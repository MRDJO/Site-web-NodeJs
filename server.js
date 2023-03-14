let express = require("express")
const { request } = require("http")
let bodyparser = require('body-parser')
let session = require('express-session')

let app = express() 

//ROUTER DE TEMPLATES
app.set('view engine','ejs')

//MIDDLEWARE
app.use('/assets',express.static('public'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(session({
    secret: 'keykeykey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))


//ROUTE
app.get('/',(request,response) =>{
    let Message = require('./models/message')
    Message.all(function(messages){
        response.render('pages/index',{messages:messages}) 
    })
})

app.post('/',(request,response) =>{
    if(request.body.message === undefined || request.body.message === ""){
        request.flash('error',"Vous n'aves pas poster de message")
        response.redirect('/')
    }else{
        let Message = require('./models/message')
        Message.create(request.body.message,function(){
            request.flash('success',"Merci !")
            response.redirect('/')
        })
    }
})

app.get('/message/:id',(request,response)=>{
    let Message = require('./models/message')
    Message.find(request.params.id,function(message){
        response.render('messages/show',{message:message})
    })
})

app.listen(8080)