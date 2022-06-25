import React, { useEffect, useRef } from 'react'

export default function CarbonAd() {
  const scriptAddedRef = useRef(false)
  const containerRef = useRef()

  useEffect(() => {
    if (containerRef.current != null && scriptAddedRef.current === false) {
      const scriptTag = document.createElement('script')
      scriptTag.type = 'text/javascript'
      scriptTag.src =
        '//cdn.carbonads.com/carbon.js?serve=CEAIC2QL&placement=react-leafletjsorg'
      scriptTag.id = '_carbonads_js'
      containerRef.current.appendChild(scriptTag)
      scriptAddedRef.current = true
    }
  }, [containerRef.current])

  return <span ref={containerRef} />
}
