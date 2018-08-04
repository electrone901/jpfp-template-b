import React from 'react'

export const Dummy = () => <h1>HELLO THERE</h1>

const Root = () => {
  return (
    <div>
      <nav>
        Welcome!
      </nav>
      <main>
        <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        <Dummy />
        <p>This seems like a nice place to get started with some Routes!</p>
      </main>
    </div>
  )
}

export default Root
