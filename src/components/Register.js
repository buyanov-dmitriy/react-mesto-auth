import { useState } from "react";
import { Link } from "react-router-dom";
import OpenRoutePage from "./OpenRoutePage";

function Register(props) {
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
    setUserData({
      email: '',
      password: ''
    })
    props.onRegister(userData);
  }

  return (
    <OpenRoutePage email={userData.email} password={userData.password} onSubmit={handleSubmit} onChange={handleChange} title='Регистрация' inputValue='Зарегистрироваться' name='registration'>
      <section className='open-route-page__login-propose'>
        <p className='open-route-page__login-propose-caption'>
          Уже зарегистрированы? <Link className='open-route-page__login-propose-caption' to='/sign-in'>Войти</Link>
        </p>
      </section>
    </OpenRoutePage>
  )
}

export default Register;
