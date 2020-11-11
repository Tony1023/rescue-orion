  
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import { shallow, mount } from 'enzyme';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AdminLogin from '../admin/Login'
import createBrowserHistory from "history/createBrowserHistory"

const history = createBrowserHistory();
const user = {
    username: "Brady",
    password: "RescueOrion",
    error: "",
  };

describe('Admin page', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<AdminLogin history={history}/>);
      //console.log(wrapper.debug());
      const title = wrapper.find("h3").text();
      console.log(title);
      expect(title).toEqual("Sign In to Manage Rescue Orion");

      const Button = wrapper.find("Button").text();
      console.log(Button);
      expect(Button).toEqual("Sign In");
});

  it('should render admin login page', () => {
    const { getByText } = render(<AdminLogin history={history}/>);
    expect(getByText('Sign In to Manage Rescue Orion')).toBeInTheDocument();
    expect(getByText('Username')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
  });

  it('should display error message when username and password are empty', () => {
    const { getByText } = render(<AdminLogin history={history}/>);
    fireEvent.click(screen.getByText('Sign In'));
    expect(getByText('Username and password must not be empty.')).toBeInTheDocument();
  });
});