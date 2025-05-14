import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

function ContactList({ contacts, onDelete }) {
  if (!contacts || contacts.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ContactList;