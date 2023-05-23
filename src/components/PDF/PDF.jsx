import React from 'react'

const PDF = ({html}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: html}}></div>
  )
}

export default PDF