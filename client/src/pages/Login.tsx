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

function Login() {

  const [login] = useMutation(LOGIN_USER);

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" }
  ];

  const initialValues = { email: "", password: "" };

  const handleFormSubmit = async (formState: Record<string, string>) => {
    console.log(formState);
    try {
      const { data } = await login({
        variables: {  ...formState },
      });
      console.log("token:" + data.login.token);
      Auth.login(data.loginUser.token);
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

  return (
    <div>
      <div>
        <button onClick={() => setShowSignupUser(showSignupUser)}>Personal</button>
        <button onClick={() => setShowSignupUser(!showSignupUser)}>Organization</button>
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
      {showLogin ? (
        <Login />
      ) : (
        <Signup />
      )}
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
}

