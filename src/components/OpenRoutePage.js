function OpenRoutePage(props) {
  return(
    <section className='open-route-page__content'>
      <form onSubmit={props.onSubmit} className='open-route-page__form' name={props.name}>
        <h2 className='open-route-page__title'>{props.title}</h2>
        <section className='open-route-page__form-section'>
          <input onChange={props.onChange} type='email' className='open-route-page__form-field' name='email' required minLength='5' placeholder='Email' value={props.email} />
        </section>
        <section className='open-route-page__form-section'>
          <input onChange={props.onChange} type='password' className='open-route-page__form-field' name='password' required minLength='5' placeholder='Пароль' value={props.password} />
        </section>
        <input type='submit' className='open-route-page__form-submit' value={props.inputValue} name={`submit-${props.name}`} />
      </form>
      {props.children}
    </section>
  )
}

export default OpenRoutePage;
