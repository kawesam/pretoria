import React, { Component } from "react";
import AppDataService from "../services/user.service";

export default class anApp extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getApp = this.getApp.bind(this);
        this.updateApp = this.updateApp.bind(this);

        this.state = {
            currentApp: {
                id: null,
                name: "",
                description: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getApp(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentApp: {
                    ...prevState.currentApp,
                    name: name
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentApp: {
                ...prevState.currentApp,
                description: description
            }
        }));
    }

    getApp(id) {
        AppDataService.getAppById(id)
            .then(response => {
                this.setState({
                    currentApp: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    updateApp() {
        AppDataService.updateApp(
            this.state.currentApp.id,
            this.state.currentApp
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The App was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { currentApp } = this.state;

        return (
            <div>
                {currentApp ? (
                    <div className="edit-form">
                        <h4>Tutorial</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentApp.name}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentApp.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>


                        </form>


                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateApp}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an App...</p>
                    </div>
                )}
            </div>
        );
    }
}
