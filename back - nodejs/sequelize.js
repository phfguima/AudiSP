const Sequelize = require('sequelize')
const UserModel = require('./models/usuario')
const AudienciaModel = require('./models/audiencia')
const PautaModel = require('./models/pauta')
const PublicacaoModel = require('./models/publicacao')
const InteresseModel = require('./models/interesse')
var config = require('./configuration/config')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
const Pauta = PautaModel(sequelize,Sequelize)
const Interesse = InteresseModel(sequelize,Sequelize)
const Audiencia = AudienciaModel(sequelize,Sequelize)
const Publicacao = PublicacaoModel(sequelize,Sequelize)
const AudienciaPauta = sequelize.define('audienciaPauta', {})
Audiencia.belongsTo(Publicacao, {
    foreignKey: {
    name: 'id_publicacao',
    allowNull: false
  }})
Audiencia.belongsToMany(Pauta, {
    through: AudienciaPauta,
    foreignKey:"id_audiencia",
    otherKey:"id_pauta"
})
User.belongsToMany(Pauta, {
    through:Interesse,
    foreignKey: "id_usuario",
    otherKey: "id_pauta"
})

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Pauta,
  Audiencia,
  Interesse,
  Publicacao
}