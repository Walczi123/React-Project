import React from "react";
import { withRouter } from "react-router-dom";
import '../css/LoginPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class PageLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            error: false,
            loggingIn: false
        };

        this.loginHandler = this.loginHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    loginHandler(e) {
        // this.setState({ loggingIn: true })
        if (e.target.username.value === "asd" && e.target.password.value === "asd") {
            document.cookie = `token=asd`
            this.props.history.push("/bookings");
            return;
        }

        e.preventDefault();
        this.setState({ error: false, loggingIn: true })
        fetch('http://minibookly.us-east-1.elasticbeanstalk.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ "username": e.target.username.value, "password": e.target.password.value })

        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        document.cookie = `token=${data.jwt}`;
                        this.props.history.push("/bookings")
                    });
                }
                else {
                    this.setState({ error: true });
                    //console.log(res.status)
                }
            })
            .then(() => {
                this.setState({ loggingIn: false });
            })

    }

    getCookieValue = (key) => {
        return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
    }

    logoutHandler() {
        if (this.getCookieValue("token") === undefined) {
            console.log("XD")
            return;
        }
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        this.props.history.push("/");
        // console.log(document.cookie)
    }

    render() {
        const btnProgress = (
            <button className="btn btn-primary" type="button" disabled>
                <span>Signing in... </span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />

            </button>
        )
        const btnIdle = (
            <button className="btn btn-primary" type="submit">
                <span>Sign in</span>
            </button>
        )

        const loginForm = (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h2 className="card-title text-center">Sign In</h2>
                                <form className="form-signin" onSubmit={this.loginHandler}>
                                    <div className="form-label-group">
                                        <input type="text" id="username" className="form-control" placeholder="Username" required autoFocus />
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="password" className="form-control" placeholder="Password" required />
                                    </div>
                                    <hr style={{ marginBottom: "0" }} />
                                    {this.state.loggingIn ? btnProgress : btnIdle}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        const loggedInInfo = (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title text-center">You're already logged in!</h3>
                                    <hr style={{ marginBottom: "0" }} />
                                    <button className="btn btn-primary" onClick={this.logoutHandler}>Sign out</button>
                                    <button className="btn btn-secondary" onClick={() => this.props.history.push("/bookings")}>Bookings history</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
        return (
            document.cookie ? loggedInInfo : loginForm
        )
    }
}

export default withRouter(PageLogin);