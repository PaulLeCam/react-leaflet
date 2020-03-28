/* eslint-disable react/prop-types */

const React = require('react')
const hljs = require('highlight.js')

const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (err) {}
  }

  try {
    return hljs.highlightAuto(str).value
  } catch (err) {}

  return ''
}

const Code = (props = {}) => (
  <pre>
    <code className={'hljs css ' + props.lang}>
      <div
        dangerouslySetInnerHTML={{
          __html: highlight(props.source, props.lang),
        }}
      />
    </code>
  </pre>
)

module.exports = Code
