import ContactForm from "./components/contactForm/ContactForm";
import ContactList from "./components/contactList/ContactList";
import SearchBox from "./components/searchBox/SearchBox";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch])

  return (
    <>
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </>
  );
}

export default App
