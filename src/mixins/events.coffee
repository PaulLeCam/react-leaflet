clone = require "lodash-node/modern/objects/clone"

module.exports = (elName) ->

  extractEvents: (props) ->
    re = /onLeaflet(.+)/i
    ret = {}

    add = (ev, cb) ->
      ev = ev.replace re, (match, p) -> p.toLowerCase()
      ret[ ev ] = cb

    add ev, cb for ev, cb of props when re.test ev

    ret

  bindEvents: (next = {}, prev = {}) ->
    return unless el = @state[ elName ]

    diff = clone prev

    add = (ev, cb) ->
      diff[ ev ] = cb
      el.on ev, cb
    rem = (ev, cb) ->
      delete diff[ ev ]
      el.off ev, cb

    rem ev, cb for ev, cb of prev when !next[ ev ] or cb isnt next[ ev ]
    add ev, cb for ev, cb of next when !prev[ ev ] or cb isnt prev[ ev ]

    diff

  fireEvent: (type, data) ->
    @state[ elName ]?.fire type, data

  componentWillMount: ->
    @setState _events: @extractEvents @props

  componentDidMount: ->
    @bindEvents @state._events

  componentWillReceiveProps: (nextProps) ->
    next = @extractEvents nextProps
    bound = @bindEvents next, @state._listeners
    @setState _events: bound

  componentWillUnmount: ->
    return unless el = @state[ elName ]
    el.off ev, cb for ev, cb of @state._events
