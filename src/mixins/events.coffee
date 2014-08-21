clone = require "lodash-node/modern/objects/clone"

extract = (props) ->
  re = /onLeaflet(.+)/i
  ret = {}
  add = (ev, cb) ->
    ev = ev.replace re, (match, p) -> p.toLowerCase()
    ret[ ev ] = cb
  add ev, cb for ev, cb of props when re.test ev
  ret

bind = (el, next = {}, prev = {}) ->
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

unbind = (el, listeners) ->
  el.off ev, cb for ev, cb of listeners

module.exports = (elName) ->

  componentWillMount: ->
    @setState _listeners: extract @props

  componentDidMount: ->
    return unless el = @state[ elName ]
    bind el, @state._listeners

  componentWillReceiveProps: (nextProps) ->
    return unless el = @state[ elName ]
    next = extract nextProps
    bound = bind el, next, @state._listeners
    @setState _listeners: bound

  componentWillUnmount: ->
    return unless el = @state[ elName ]
    unbind el, @state._listeners
