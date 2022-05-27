import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom";


describe("Home Page When Not Logged In",() =>{
  //test if login link is available
  test(" login button is shown if user is not logged in",()=>{
    render(<BrowserRouter><App/></BrowserRouter>);

    expect(screen.getByText('Apps Listing')).toBeInTheDocument();

  });

  //test if sign up link is displayed if user is not logged in.
  test(" sign link is shown if user is not signed in",()=>{
    render(<BrowserRouter><App/></BrowserRouter>);

    expect(screen.getByText('Sign Up')).toBeInTheDocument();

  });

});

describe("Home page when user is logged in",() =>{
  test('Pretia Technologies', () => {
    render(<BrowserRouter><App/></BrowserRouter>);

    expect(screen.getByText('Pretia Technologies')).toBeInTheDocument();

  });



});

