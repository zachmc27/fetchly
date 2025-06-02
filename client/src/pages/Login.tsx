// 2 button components that conditionally render either create form or log in form
// Create account form should have all fields specified in wireframe 
// below create account form should have text "Already have an account? Sign in here" that renders log in form if pressed

// Log in form should include all fields specified in wireframe
// below log in account form should have text "Need an account? Sign up here" that renders create account form if pressed
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, LOGIN_ORG, ADD_USER, ADD_ORG } from '../utils/mutations';
import Form from "../components/Reusables/Form";
import Auth from '../utils/auth';
import "../main.css";
import BoneIcon from '../images/BoneIcon';

import { motion } from 'framer-motion';

function Login() {

  console.log("Login component rendered");

  const [login] = useMutation(LOGIN_USER);
  const [loginOrg] = useMutation(LOGIN_ORG);

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" }
  ];

  const initialValues = { email: "", password: "" };

  const handleFormSubmit = async (formState: Record<string, string>) => {
    try {
      const { data } = await login({
        variables: {  ...formState },
      });

       console.log("Login data:", data.loginUser.token);
    const token = data.loginUser.token;
    const userId = data.loginUser.user._id;


    if (token) {
      Auth.login(token, userId);
      localStorage.setItem('accountType', "user");
      console.log("Cool")
      return;
    }
  } catch {
    // If user login fails, try org login
    try {
      const { data } = await loginOrg({
        variables: { ...formState },
      });

      console.log("Org login data:", data);
      const token = data.loginOrg.token;
      const orgId = data.loginOrg.org._id;

      if (token) {
        Auth.login(token, orgId);
        localStorage.setItem('accountType', "org");
        return;
      } else {
        console.error("No token received from org login");
      }
    } catch (orgError) {
      console.error("Both user and org login failed:", orgError);
    }
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

function SignupUser({ setShowLogin }: { setShowLogin: (show: boolean) => void }) {
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
    setShowLogin(true);
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



function SignupOrg({ setShowLogin }: { setShowLogin: (show: boolean) => void }) {
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

    setShowLogin(true);
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

function Signup({ setShowLogin }: { setShowLogin: (show: boolean) => void }) {
  const [showSignupUser, setShowSignupUser] = useState(true);

  console.log(showSignupUser);

  return (
    <div>
      <div className='signup-btn-cnt profile-sm-fnt'>
        <button className= {showSignupUser ? 'btn-fill signup-btn main-button' : 'btn-line signup-btn main-button'} onClick={() => setShowSignupUser(true)}>Personal</button>
        <button className={showSignupUser ? 'btn-line signup-btn main-button' : 'btn-fill signup-btn main-button'} onClick={() => setShowSignupUser(false)}>Organization</button>
      </div>
      {showSignupUser ? (
        <SignupUser setShowLogin={setShowLogin}/>
      ) : (
        <SignupOrg setShowLogin={setShowLogin}/>
      )}
    </div>
  )
}

export default function AuthForm() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <span className='form-title-ctn'> 
        Fetchly
        <motion.div
        animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ display: "inline-block" }}
        >
        <BoneIcon />
        </motion.div> 
       
       </span>
      {showLogin ? (
        <Login />
      ) : (
        <Signup setShowLogin={setShowLogin}/>
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

