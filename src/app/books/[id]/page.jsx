import React from 'react'

async function Page({ params }) {
    const { id } = await params
  
    return (
      <div>Book {id}</div>
    )
  }
  
export default Page