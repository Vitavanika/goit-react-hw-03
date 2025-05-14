import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import styles from "./App.module.css";

const initialContactsData = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem("contacts");
  if (savedContacts !== null) {
    try {
      const parsedContacts = JSON.parse(savedContacts);
      if (
        Array.isArray(parsedContacts) &&
        parsedContacts.every(
          (contact) =>
            typeof contact === "object" &&
            contact !== null &&
            "id" in contact &&
            "name" in contact &&
            "number" in contact
        )
      ) {
        return parsedContacts;
      }
      console.warn(
        "Data from localStorage is corrupted. Using initial contacts."
      );
      return initialContactsData;
    } catch (error) {
      console.error("Error parsing contacts from localStorage:", error);
      return initialContactsData;
    }
  }
  return initialContactsData;
};

function App() {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const contactExists = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (contactExists) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts((prevContacts) => [
      ...prevContacts,
      { id: nanoid(), ...newContact },
    ]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      {contacts.length > 0 ? (
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      ) : (
        <p className={styles.message}>
          You don't have any contacts yet. Add your first one!
        </p>
      )}
      {contacts.length > 0 && filteredContacts.length === 0 && filter && (
        <p className={styles.message}>
          No contacts found matching your search.
        </p>
      )}
    </div>
  );
}

export default App;
