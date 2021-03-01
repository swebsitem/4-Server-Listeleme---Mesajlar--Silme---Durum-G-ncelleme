const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')


client.on('ready', () => {
  console.log('Bot Hazır ve Online!')

  command(client, ['açık' , 'hazır' , 'hadi'], (message) => {
      message.channel.send('Botunuz Hazır ve Emirlerinize Avade Patron')
  })

  command(client, 'sunucu', (message) => {
      client.guilds.cache.forEach((guild) => {
       // console.log(guild)
        message.channel.send(
          `${guild.name} Sunucusunda Toplamda ${guild.memberCount} üye bulumaktadır.`
        )
      })    
  })

  command(client, ['cc', 'temizle'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'durum', (message) => {
    const content = message.content.replace('!durum', '' )
    //"!durum Davet Kodu :....   - > Davet Kodu : ....."

    client.user.setPresence({
      activity:{
        name: content,
        type:0,
      }
    })
  })


})
client.login(config.token)
