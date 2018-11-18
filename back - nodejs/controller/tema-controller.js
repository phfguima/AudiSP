const Tema = require('../sequelize').Tema;
const AudienciaTema = require('../sequelize').AudienciaTema;
const User = require('../sequelize');

function getTemas(req) {
    return new Promise(
        async (resolve, reject) => {
            resolve(
                Tema.findAll()
            )
        }
    );
}

function addTemas(req){
    return new Promise(
        async (resolve, reject) => {
            await Promise.all(req.body.temas.map(async (tema)=>{
                Tema.findOne({
                    where:{
                        nome: tema.trim().toLowerCase()
                    }
                }).then(busca =>{
                    if(busca){
                        //do nothing
                    } else {
                        Tema.create({
                            nome: tema.trim().toLowerCase()
                        });
                    }
                });
            }));
            resolve(
                {
                    text: "OK"
                }
            )
        }
    );
}

function searchTema(req){
    return new Promise(
        async (resolve,reject)=>{
            var name = req.body.busca.trim().toLowerCase();
            resolve(
                Tema.findAll(
                    {
                        where: {nome: {$like: '%'+name+'%'}}
                    }
                )
            );
        }
    );
}

function updateTema(req){
    return new Promise(
        async (resolve,reject)=>{
            var tema = req.body.tema;
            if(tema && tema.nome && tema.id){
                Tema.findOne({
                    where: {id: tema.id}
                }).then(t => {
                    if(t){
                        t.updateAttributes({
                            nome: tema.nome
                        })
                    }
                })
            }
            resolve(
                { text: "OK"}
            );
        }
    );
}

function addToAudiencia(req){
    return new Promise(
        
        async (resolve,reject)=>{
            var id_tema = req.body.temaid;
            var id_aud = req.body.audid;
            if(id_tema && id_aud){
                id_tema = parseInt(id_tema);
                id_aud = parseInt(id_aud);

                AudienciaTema.findOne({
                    where: {
                        id_audiencia: id_aud,
                        id_tema: id_tema
                    }
                }).then(val => {
                    if(!val){
                        AudienciaTema.create({
                            id_audiencia: id_aud,
                            id_tema: id_tema
                        })
                    }
                })
            }  
            resolve({
                text: "OK"
            })  
        }
        
    );
}

function removeFromAudiencia(req){
    return new Promise(
        
        async (resolve,reject)=>{
            var id_tema = req.body.temaid;
            var id_aud = req.body.audid;
            if(id_tema && id_aud){
                id_tema = parseInt(id_tema);
                id_aud = parseInt(id_aud);

                AudienciaTema.findOne({
                    where: {
                        id_audiencia: id_aud,
                        id_tema: id_tema
                    }
                }).then(val => {
                    if(val){
                        AudienciaTema.destroy({
                            where:{
                                id_audiencia: id_aud,
                                id_tema: id_tema
                            }
                        })
                    }
                })
            }  
            resolve({
                text: "OK"
            })  
        }
        
    );
}

module.exports = {
    getTemas: getTemas,
    addTemas: addTemas,
    updateTema: updateTema,
    searchTema: searchTema,
    addToAudiencia: addToAudiencia,
    removeFromAudiencia: removeFromAudiencia
};