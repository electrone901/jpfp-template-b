import React from 'react'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'

const BadComponent = () => {
  throw Error('Oh no! I contemplated the fleeting nature of existence!')
}

export const Dummy = () => (
  <div>
    <h1>HELLO THERE</h1>
    <BadComponent />
  </div>
)

const Root = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
        </nav>
        <main>
          {/* <Switch> */}
            <Route path="/campuses" component={AllCampuses} />
            <Route path="/students" component={AllStudents} />
            <Route render={() => (
              <div>
                <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
                <Dummy />
                <p>This seems like a nice place to get started with some Routes!</p>
              </div>
            )} />
          {/* </Switch> */}
        </main>
      </div>
    </Router>
  )
}

export default Root
