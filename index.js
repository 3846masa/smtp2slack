'use strict'

const mailin = require('mailin')
const Slack = require('@slack/client')
const config = require('config')

const slack = new Slack.WebClient(config.get('slack.token'))
const prefixRegexp =
  new RegExp(`^${ config.get('prefix_regexp') }`)

mailin.start({
  port: 25,
  disableWebhook: true
})

mailin.on('authorizeUser', () => {
  done(new Error('Unauthorized'), false)
})

mailin.on('message', (conn, msg) => {
  console.dir(msg, { depth: null })

  const hasPrefix =
    msg.envelopeTo.some((i) => i.address.match(prefixRegexp))
  if (!hasPrefix) return false

  const sentConfs =
    msg.envelopeTo.map((i) => {
      const local =
        i.address.split('@')[0].replace(prefixRegexp, '')
      const [ channel, icon ] = local.split('+')
      return { channel, icon }
    })

  const postDataDefault = {
    username: 'Mailbot',
    icon_emoji: ':email:',
    attachments: [{
      fallback: msg.subject,
      title: msg.subject,
      author_name: msg.from[0].address,
      text: msg.text
    }]
  }

  sentConfs.forEach((conf) => {
    const postData = Object.assign({}, postDataDefault, {
      icon_emoji: (conf.icon) ? `:${ conf.icon }:` : ':email:'
    })
    slack.chat.postMessage(`#${ conf.channel }`, '', postData)
  })
})
