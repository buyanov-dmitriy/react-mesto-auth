import successRegistrationLogo from '../images/registred-icon.svg';
import nonSuccessRegistrationLogo from '../images/nonregistred-icon.svg';

function RegistrationPopup(props) {
  const successRegistrationText = 'Вы успешно зарегистрировались!';
  const nonSuccessRegistrationText = 'Что-то пошло не так! Попробуйте еще раз.'
  return (
    <section className={`popup ${props.isOpen && `popup_opened`}`}>
      <div className="popup__container">
        <img className='popup__registration-icon' alt='Иконка результата регистрации' src={props.openedWithError ? nonSuccessRegistrationLogo : successRegistrationLogo} />
        <p className="popup__title popup__registration-text">{props.openedWithError ? nonSuccessRegistrationText : successRegistrationText}</p>
        <button onClick={props.onClose} className="popup__close" type="button"></button>
      </div>
    </section>
  )
}

export default RegistrationPopup;
