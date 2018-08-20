import React from 'react'
// import * as rrd from 'react-router-dom'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'

// import sinon from 'sinon'
// sinon.mock(Router, ({ children }) => {
//   console.log('MOCKED BROWSER ROUTER')
//   return (<div>{children}</div>)
// })

const VeryNaughtyComponent = () => {
  throw Error("I'm full of mischief 😈 ")
}

export const Dummy = () => {
  console.log('DUMMY RENDERED')
  return (
    <div>
      <h1>HELLO THERE</h1>
      <VeryNaughtyComponent />
    </div>
  )
}

const Root = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
          <Link to="/">Home</Link>
          <Link to="/campuses">Campuses</Link>
          <Link to="/students">Students</Link>
        </nav>
        <main>
          <Switch>
            <Route path="/campuses" component={AllCampuses} />
            <Route path="/students" component={AllStudents} />
            <Route render={() => (
              <div>
                <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
                {/* <Dummy /> */}
                <p>This seems like a nice place to get started with some Routes!</p>
              </div>
            )} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default Root
