
const Koa = require('koa');
const Router = require('koa-router');
const mongo = require('koa-mongo');
const bodyParser = require('koa-body')()
const app = new Koa();
const router = new Router;



var url = "mongodb://172.30.188.93:27017/";
var mydb ="pocnode";
var collectiondb = "collectiondb";


router.get('/obtener', async (ctx) => {
    ctx.body = await ctx.db.collection(collectiondb).find().toArray();
});

router.get('/obtener/:name',  async (ctx) => {
    var query = {name : ctx.params.name};
    ctx.body = await ctx.db.collection(collectiondb).find(query).toArray();
});

router.post('/create', bodyParser, async (ctx)=>{
    const user = await ctx.db.collection(collectiondb).insert(ctx.request.body);
    ctx.body = ({code:"0",desc: "OK", user});
});

router.post('/delete', bodyParser, async (ctx)=>{
    const user = await ctx.db.collection(collectiondb).remove(ctx.request.body);
    ctx.body = ({code:"0",desc: "OK", user});
});   


app.use(mongo({
    uri: url+mydb,
    max: 100,
    min: 1
  }));




        
  /*  router.get('/obtener', async (ctx) => {
        var payload = "";
        await MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(mydb);
            console.log("DB : " + mydb);
            console.log("Collection : " + collectiondb);
            dbo.collection(collectiondb).find().toArray(function (err, result) {
    
                if (err) throw err;
                db.close();
                payload = JSON.stringify(result)
                console.log("Resultado : " + payload);
                
                
            });
        });
        console.log("Payload 2 : " + payload);
        ctx.body = payload;
    });*/


    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000);