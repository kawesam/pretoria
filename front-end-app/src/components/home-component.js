import React, { Component } from "react";
import AppDataService from "../services/user.service";
import { Link } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.retrieveApps = this.retrieveApps.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveApp = this.setActiveApp.bind(this);

        this.state = {
            apps: [],
            currentApp: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveApps();
    }


    retrieveApps() {
        AppDataService.getApps()
            .then(response => {
                this.setState({
                    apps: response.data
                });
                // console.log(response.data);
            })
            .catch(e => {
                // console.log(e);
            });
    }

    refreshList() {
        this.retrieveApps();
        this.setState({
            currentApp: null,
            currentIndex: -1
        });
    }

    setActiveApp(app, index) {
        this.setState({
            currentApp: app,
            currentIndex: index
        });
    }


    render() {
        const {  apps, currentApp, currentIndex } = this.state;

        return (
            <div className="list row">

                <div className="col-md-6">
                    <h4>Apps Listing</h4>

                    <ul className="list-group">
                        {apps &&
                        apps.map((app, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveApp(app, index)}
                                key={index}
                            >
                                {app.name}
                            </li>
                        ))}
                    </ul>


                </div>
                <div className="col-md-6">
                    {currentApp ? (
                        <div>
                            <h4>App Details</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentApp.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentApp.description}
                            </div>


                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on an App to View Details...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
