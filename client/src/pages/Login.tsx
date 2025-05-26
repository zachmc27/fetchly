// 2 button components that conditionally render either create form or log in form
// Create account form should have all fields specified in wireframe 
// below create account form should have text "Already have an account? Sign in here" that renders log in form if pressed

// Log in form should include all fields specified in wireframe
// below log in account form should have text "Need an account? Sign up here" that renders create account form if pressed
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER, ADD_ORG } from '../utils/mutations';
import Form from "../components/Reusables/Form";
import Auth from '../utils/auth';
import "../SammiReusables.css";

function Login() {

  console.log("Login component rendered");

  const [login] = useMutation(LOGIN_USER);

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" }
  ];

  const initialValues = { email: "", password: "" };

  const handleFormSubmit = async (formState: Record<string, string>) => {
    console.log("handleformSubmit called");
    console.log(formState);
    try {
      const { data } = await login({
        variables: {  ...formState },
      });

      console.log("Login data:", data);
      const token = data.loginUser.token || data.loginOrg.token;
      
      if (token) {
        Auth.login(token);
      }
      else {
        console.error("No token received");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonName="Login"
        initialValues={initialValues}
      />
    </div>
  )
}

function SignupUser() {
  const [addUser] = useMutation(ADD_USER);
  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "username", label: "Username", type: "username" },
    { name: "password", label: "Password", type: "password" }
  ];
  const initialValues = { email: "", username: "", password: "" };

  const handleFormSubmit = async (formState: Record<string, string>) => {

    try {
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });
      console.log("User created:", data.addUser.user);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonName="Signup"
        initialValues={initialValues}
      />
    </div>
  )
}



function SignupOrg() {
  const [addOrg] = useMutation(ADD_ORG);
  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "orgName", label: "Org Name", type: "orgName" },
    { name: "password", label: "Password", type: "password" }
  ];
  const initialValues = { email: "", orgName: "", password: "" };

  const handleFormSubmit = async (formState: Record<string, string>) => {
    try {
      const { data } = await addOrg({
        variables: { input: { ...formState } }
      });
      console.log("Org created:", data.addOrg.org);
    } catch (e) {
      console.error(e);
    }
  };

   return (
    <div>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonName="Signup"
        initialValues={initialValues}
      />
    </div>
  )
}

function Signup() {
  const [showSignupUser, setShowSignupUser] = useState(true);

  console.log(showSignupUser);

  return (
    <div>
      <div className='signup-btn-cnt profile-sm-fnt'>
        <button className= {showSignupUser ? 'btn-fill signup-btn' : 'btn-line signup-btn'} onClick={() => setShowSignupUser(true)}>Personal</button>
        <button className={showSignupUser ? 'btn-line signup-btn' : 'btn-fill signup-btn'} onClick={() => setShowSignupUser(false)}>Organization</button>
      </div>
      {showSignupUser ? (
        <SignupUser />
      ) : (
        <SignupOrg />
      )}
    </div>
  )
}

export default function AuthForm() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <span className='form-title-ctn'> Fetchly </span>
      {showLogin ? (
        <Login />
      ) : (
        <Signup />
      )}
      <div className='form-switch-ctn'>
        <span >
          {showLogin ? 'Need an account? ' : 'Already have an account? '}
        </span>
        <span className="form-switch-text" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? ' Sign up here' : ' Log in here'}
        </span>
      </div>
    </div>
  );
}

