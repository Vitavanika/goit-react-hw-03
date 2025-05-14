import styles from './Contact.module.css';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';

function Contact({ id, name, number, onDelete }) {
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <p className={styles.text}>
          <FaUser className={styles.icon} /> {name}
        </p>
        <p className={styles.text}>
          <FaPhoneAlt className={styles.icon} /> {number}
        </p>
      </div>
      <button onClick={() => onDelete(id)} className={styles.button}>
        Delete
      </button>
    </li>
  );
}

export default Contact;