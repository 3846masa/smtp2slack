SMTP2SLACK
==========

Inspired by [SRARAD/slack-email].

[SRARAD/slack-email]: https://github.com/SRARAD/slack-email

## Usage

1. Set MX record
1. Install docker-compose
1. Edit ``SLACK_TOKEN`` in docker-compose.yml
1. ``docker-compose up -d``
1. Forward an email to ``channelname@yourdomain.example.com``

## Prefix

If you set ``PREFIX_REGEXP``, mail address will be tested.

For example, you will set ``slack-``, the address passed is ``slack-channelname@yourdomain.example.com``.

## Bot icon

For example, you will set ``:slack:`` icon to bot, you forward to ``channelname+slack@yourdomain.example.com``.

If you don't set icon name, bot talk with ``:email:`` icon.

## LICENSE
(c) 3846masa MIT
