import React, { Suspense, lazy } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Redirect } from "react-router"

const Login = lazy(() => import("./RegisterAndLogin/Login"))
const Register = lazy(() => import("./RegisterAndLogin/Register"))
const Dashboard = lazy(() => import("./RegisterAndLogin/Dashboard"))

const PageNotFound = lazy(() => import("./PageNotFound"))


const Routes = () => (
  <main>
    <Suspense fallback={<div></div>}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Dashboard} /> 
                <Route exact path="/page-not-found" component={PageNotFound} />
                <Route exact path="/" component={Login} />
                <Redirect from="*" to="/page-not-found" />
            </Switch>
        </BrowserRouter>
    </Suspense>
  </main>
);

export default Routes;