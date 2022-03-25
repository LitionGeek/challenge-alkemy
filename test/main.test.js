
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const Personajes = require('../database/models/Personajes');

chai.use(chaiHttp);


//Variables utilizadas
const url = "http://localhost:4000";
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsYW5AZ21haWwuY29tIiwiaWF0IjoxNjQ4MjI0MDk3LCJleHAiOjE2NDgyMjc2OTd9.mmcpLG2IcStCLfKxaFbcpHR78R701JSnTPlMWmyvzAo';
const email = {
    email:"alan@gmail.com"
};
const objPersonaje = {
    "imagen":"dsadas",
    "nombre":"Personaje",
    "edad":5,
    "peso":22,
    "historia":"dasdasd",
    "pelicula":"prueba"
 };
const objPelicula = {
    "imagen":"dsadas",
    "titulo":"Sherk5",
    "calificacion":2,
    "genero":"dasdasd",
    "nombrePersonaje":"Personaje2"
 }
 let token;

 let should = chai.should();
 

describe("Api Personajes",()=>{
    beforeEach(()=>{
        chai
            .request(url)
            .post("/auth/login")
            .send(email)
            .end((error,res)=>{
                if(!error){
                    token = res.body.accessToken;
                    res.should.have.status(200)
                }else{
                    res.should.have.status(203);
                }
            })
    })
/*     afterEach(done=>{
        Personajes.remove({},error=>{
            done();
        })
    }) */
 describe("TEST CRUD API PERSONAJES",()=>{
       /*  it("Crear cliente",async()=>{
        chai.request(url)
        .post("/auth/register")
        .send(email)
        .end(function(error,res){
            expect(res)
                .to.have.status(200)
                .that.includes.all.keys(['ok',"msg"])
        })
    }) */

/*     it("Obtener accessToken",async()=>{
        chai.request(url)
        .post("/auth/login")
        .send({
            "email":"alana@gmail.com"
            })
        .end(function(err,res){
            expect(res)
                .to.have.status(200)
                .that.includes.all.keys(['accessToken'])
            accessToken = res.body.accessToken;
        })
    })
 */
    it("Crear personaje",async()=>{
            chai.request(url)
            .post("/personaje")
            .set({ "Authorization": `Bearer ${token}`})
            .send(email)
            .end((error,res)=>{
                res.should.have.status(201)
        })
    })
    

    it("No puede existir registros con el mismo nombre",async()=>{
        chai.request(url)
        .post("/personaje")
        .set({ "Authorization": `Bearer ${accessToken}`})
        .send(objPersonaje)
        .end(function(err, res) {
            expect(res).to.have.status(400)
        });
    }) 

    it("Crear sin nombre",async()=>{
        let objsinNombre = {
            "imagen":"dsadas",
            "nombre":"",
            "edad":5,
            "peso":22,
            "historia":"dasdasd",
            "pelicula":"pelicula"
         }
        chai.request(url)
        .post("/personaje")
        .set({ Authorization: `Bearer ${accessToken}`})
        .send(objsinNombre)
        .end(function(err, res) {
            expect(res).to.have.status(400);
        });
    }) 

    it("Crear sin pelicula",async()=>{
        let objsinNombre = {
            "imagen":"dsadas",
            "nombre":"Personaje2",
            "edad":5,
            "peso":22,
            "historia":"dasdasd",
            "pelicula":""
         }
        chai.request(url)
        .post("/personaje")
        .set({ "Authorization": `Bearer ${accessToken}`})
        .send(objsinNombre)
        .end(function(err, res) {
            expect(res).to.have.status(201);
        });
    }) 

    it("Crear personaje sin valores",async()=>{
        const objsinNombre = {
            "imagen":"",
            "nombre":"",
            "edad":"",
            "peso":"",
            "historia":"",
            "pelicula":""
         }
        chai.request(url)
        .post("/personaje")
        .set({ "Authorization": `Bearer ${accessToken}`})
        .send(objsinNombre)
        .end(function(err, res) {
            expect(res).to.have.status(400);
        });
    }) 
    
    it("Editar personaje",async()=>{
        const objsinNombre = {
            "imagen":"dsadas",
            "nombre":"Personaje2",
            "edad":5,
            "peso":22,
            "historia":"editado",
            "pelicula":"editado"
         }
        chai.request(url)
        .put("/personaje/Personaje2")
        .set({ "Authorization": `Bearer ${accessToken}`})
        .send(objsinNombre)
        .end(function(err, res) {
            expect(res)
            .to.have.status(200)
        });
    }) 

        
    it("Eliminar personaje",async()=>{
        chai.request(url)
        .delete("/personaje")
        .set({ "Authorization": `Bearer ${accessToken}`})
        .send({"nombre":"Personaje"})
        .end(function(err, res) {
            expect(res)
            .to.have.status(200)
        });
    }) 

        
    it("Eliminar personaje2",async()=>{
        chai.request(url)
        .delete("/personaje")
        .set({ "Authorization": `Bearer ${accessToken}`})
        .send({"nombre":"Personaje2"})
        .end(function(err, res) {
            expect(res)
            .to.have.status(200)
        });
    }) 
 })

 //--------------------------------------------------//
 describe("TEST CRUD API PELICULAS",()=>{
    /*  it("Crear cliente",async()=>{
     chai.request(url)
     .post("/auth/register")
     .send(email)
     .end(function(error,res){
         expect(res)
             .to.have.status(200)
             .that.includes.all.keys(['ok',"msg"])
     })
 }) */

/*     it("Obtener accessToken",async()=>{
     chai.request(url)
     .post("/auth/login")
     .send({
         "email":"alana@gmail.com"
         })
     .end(function(err,res){
         expect(res)
             .to.have.status(200)
             .that.includes.all.keys(['accessToken'])
         accessToken = res.body.accessToken;
     })
 })
*/
 it("Crear PELICULA",async()=>{
     chai.request(url)
     .post("/movie")
     .set({ Authorization: `Bearer ${accessToken}` })
     .send(objPelicula)
     .end(function(err, res) {
         expect(res)
             .to.have.status(201)
     });
 }) 


 it("Obtener PELICULA",async()=>{
     chai.request(url)
     .get("/listmovies")
     .set({ "Authorization": `Bearer ${accessToken}` })
     .end(function(err, res) {
         expect(res).to.have.status(200);
     });
 }) 

 it("Obtener PELICULA inexistente",async()=>{
    chai.request(url)
    .get("/movies?name=inexistente")
    .set({ "Authorization": `Bearer ${accessToken}` })
    .end(function(err, res) {
        expect(res).to.have.status(200);
    });

}) 

 it("No puede existir registros con el mismo titulo",async()=>{
     chai.request(url)
     .post("/movie")
     .set({ "Authorization": `Bearer ${accessToken}`})
     .send(objPelicula)
     .end(function(err, res) {
         expect(res).to.have.status(400)
     });
 }) 

 it("Crear sin titulo",async()=>{
     const objsinNombre = {
        "imagen":"dsadas",
        "titulo":"",
        "calificacion":2,
        "personajeAsociado":"Fiona",
        "genero":"dasdasd",
        "nombre":"y"
     }
     chai.request(url)
     .post("/movie")
     .set({ Authorization: `Bearer ${accessToken}`})
     .send(objsinNombre)
     .end(function(err, res) {
         expect(res).to.have.status(400);
     });
 }) 

 it("Crear pelicula sin valores",async()=>{
     const objsinNombre = {
        "imagen":"",
        "titulo":"",
        "calificacion":2,
        "personajeAsociado":"",
        "genero":"",
        "nombre":""
     }
     chai.request(url)
     .post("/movie")
     .set({ "Authorization": `Bearer ${accessToken}`})
     .send(objsinNombre)
     .end(function(err, res) {
         expect(res).to.have.status(400);
     });
 }) 
 
 it("Editar pelicula",async()=>{
     const objsinNombre = {
        "imagen":"editado",
        "titulo":"Sherk",
        "calificacion":2,
        "genero":"editado",
        "nombre":"editado"
     }
     chai.request(url)
     .put("/movie/Sherk")
     .set({ "Authorization": `Bearer ${accessToken}`})
     .send(objsinNombre)
     .end(function(err, res) {
         expect(res)
         .to.have.status(200)
     });
 }) 

     
    it("Eliminar pelicula",async()=>{
     chai.request(url)
     .delete("/movie")
     .set({ "Authorization": `Bearer ${accessToken}`})
     .send({"nombre":"Sherk"})
     .end(function(err, res) {
         expect(res)
         .to.have.status(200)
     });
 }) 

     

})
})