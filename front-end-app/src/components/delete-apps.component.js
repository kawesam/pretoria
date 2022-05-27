import React,{useState,useEffect,Component} from "react";

const API_URL = 'http://localhost:8080/api/app/';

export default class deleteApps extends Component{
    constructor(props){
        super(props);
        this.state = {
            products:[]
        };
        this.state = { checkedBoxes: []	};
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.deleteProducts = this.deleteProducts.bind(this);
        this.headers = [
            { key: 'id', label: 'Id'},
            { key: 'name', label: 'Name' },
            { key: 'description', label: 'Description' }
        ];


    }
    componentDidMount() {

        fetch(API_URL +`list`)
            .then(response => {
                return response.json();
            }).then(result => {
            //console.log(result);
            this.setState({
                products:result
            });
        });
    }

    toggleCheckbox = (e, item) => {
        if(e.target.checked) {
            let arr = this.state.checkedBoxes;
            arr.push(item.id);

            this.setState = { checkedBoxes: arr};
        } else {
            let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(item.id), 1);

            this.setState = {
                checkedBoxes: items
            }
        }
    }
    deleteProducts = () => {
        const  user = JSON.parse(localStorage.getItem('user'));

        if(window.confirm('Are you sure, want to delete the selected product?')) {
            var data = JSON.stringify({'ids' : this.state.checkedBoxes});

            fetch(API_URL+`delete`,{
                method: 'POST',
                body: data,
                headers: {'Content-Type' : 'application/json; charset=UTF-8','x-access-token':user.accessToken}
            })
            .then(response => {
                if(response.status === 200) {
                    document.getElementById('msg').innerHTML = '<span style="color:green;">Apps deleted successfully</span>';
                    window.location.reload(false);

                }
            }).catch(e => {
                document.getElementById('msg').innerHTML = '<span style="color:red;">Sorry we could not delete the apps. An error occurred during deletion</span>';
            });
        }
    }
    render() {
        const productFound = this.state.products && this.state.products.length;
        if(productFound) {
            return (
                <div id="container">
                    <div id="msg"></div>
                    <button type="button" onClick={this.deleteProducts}>Delete Selected App(s)</button>
                    <table className="datatable">
                        <thead>
                        <tr>
                            {
                                this.headers.map(function(h) {
                                    return (
                                        <th key={h.key}>{h.label}</th>
                                    )
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.products.map(function(item, index) {
                                return (
                                    <tr key={index} className={(index % 2) ? "odd_col" : "even_col"}>
                                        <td><input type="checkbox" className="selectsingle" value="{item.id}" checked={this.state.checkedBoxes.find((p) => p.id === item.id)} onChange={(e) => this.toggleCheckbox(e, item)}/>
                                            &nbsp;&nbsp;{item.id}
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                    </tr>
                                )}.bind(this))
                        }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div id="container">
                    No App found
                </div>
            )
        }
    }
}
