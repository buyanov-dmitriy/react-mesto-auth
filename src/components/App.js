import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as authorisation from '../utils/authorisation';
import InfoToolTip from './InfoToolTip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [registrationPopup, setRegistrationPopup] = useState({ isOpen: false, openedWithError: false });
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({ name: 'Загрузка...', about: 'Загрузка...' });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }
  function closeAllPopups() {
    if (isEditAvatarPopupOpen) { handleEditAvatarClick() };
    if (isEditProfilePopupOpen) { handleEditProfileClick() };
    if (isAddPlacePopupOpen) { handleAddPlaceClick() };
    if (registrationPopup.isOpen) {
      if (!registrationPopup.openedWithError) {
        history.push('/sign-in');
      }
      setRegistrationPopup({ ...registrationPopup, isOpen: false });
    };
    if (selectedCard.link !== '') { setSelectedCard({ name: '', link: '' }) };
  }
  function handleUpdateUser(userInformation) {
    api.editProfile(userInformation)
      .then(newUserInformation => {
        setCurrentUser(newUserInformation);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(newUserInformation => {
        setCurrentUser(newUserInformation);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.putLike(card._id, !isLiked)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));

      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleAddPlace(card) {
    api.addNewCardToServer(card)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleLogin({ email, password }) {
    authorisation.authorize({ 'password': password, 'email': email })
      .then(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          getUserEmail(response.token)
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  function handleRegister({ email, password }) {
    authorisation.register({ 'password': password, 'email': email })
      .then(() => {
        setRegistrationPopup({ isOpen: true, openedWithError: false });
      })
      .catch(error => {
        setRegistrationPopup({ isOpen: true, openedWithError: true });
      })
  }
  function getUserEmail(token) {
    authorisation.getEmail(token)
      .then(response => {
        setUserEmail(response.data.email);
        setLoggedIn(true);
      })
      .catch(error => {
        console.log(error);
      })
  }
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      getUserEmail(token);
    }
  }
  function handleEnterButton() {
    history.push('/sign-in');
  }
  function handleRegistrationButton() {
    history.push('/sign-up');
  }
  function handleEscapeButton() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/sign-in');
  }

  useEffect(() => {
    Promise.all([api.getUserInformation(), api.getCards()])
      .then(([userInformation, cardsFromServer]) => {
        setCurrentUser(userInformation);
        setCards(cardsFromServer);
        setIsLoading(false);
        tokenCheck();
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {loggedIn && <Header email={userEmail} headerButton='Выйти' onClick={handleEscapeButton} />}
        <Switch>
          <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Main} isLoading={isLoading} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
          <Route path='/sign-up'>
            <Header headerButton='Войти' onClick={handleEnterButton} />
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Header headerButton='Регистрация' onClick={handleRegistrationButton} />
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name='view-card' title='Вы уверены?' inputValue="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip openedWithError={registrationPopup.openedWithError} isOpen={registrationPopup.isOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
