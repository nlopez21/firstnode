
const mongo = require('koa-mongo');
const Koa = require('koa');
var url = "mongodb://localhost:27017/";
var mydb ="pocnode";
var collectiondb = "collectiondb";


let users = {
    getAll: async function() {
        mongo({
            uri: url+mydb,
            max: 100,
            min: 1
          });
          return await ctx.db.collection(collectiondb).find().toArray();
         ;
    },

    create: async function(user) {
        let user = await ctx.db.collection(collectiondb).insertOne(user);
        return {code: "0", desc :"OK"};
    }, 

    delete: async function(name) {
        await ctx.db.collection(collectiondb).deleteOne({ name });
        return {code: "0", desc :"OK"};
    }
}


 exports.users = users;

/*
async function obtener (){
    MongoClient.connect (url, function (err,db) {
        if(err) throw err;
        var dbo = db.db(mydb);
        console.log("DB : "+mydb);
        console.log("Collection : "+collectiondb);
        dbo.collection(collectiondb).find().toArray(function(err, result){
            console.log("Resultado : "+ JSON.stringify(result) );
            if (err) throw err;
            db.close();
            return JSON.stringify(result);
        });
        });

}
*/
/*
MongoClient.connect (url, function (err,db) {
if(err) throw err;
var dbo = db.db(mydb);
console.log("DB : "+mydb);
console.log("Collection : "+collectiondb);
dbo.collection(collectiondb).find().toArray(function(err, result){
    console.log("Resultado : "+ JSON.stringify(result) );
    if (err) throw err;
    db.close();
    return JSON.stringify(result);
});
});*/
/*module.exports = this.connect.obtener;*/

