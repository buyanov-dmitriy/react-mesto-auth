import { useState } from "react";
import AuthPage from "./AuthPage";

function Login(props) {
  const [userData, setUserData] = useState({ email: '', password: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    setUserData({
      email: '',
      password: ''
    })
    props.onLogin(userData);
  }

  return(
    <AuthPage email={userData.email} password={userData.password} onSubmit={handleSubmit} onChange={handleChange} title='Вход' inputValue='Войти' name='login' />
  )
}

export default Login;
