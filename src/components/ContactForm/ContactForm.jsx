import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number must be at least 3 characters')
    .max(50, 'Number must be at most 50 characters')
    .matches(/^[0-9\-+() ]+$/, "Number can only contain digits, spaces, dashes, parentheses and plus")
    .required('Number is required'),
});

function ContactForm({ onAdd }) {
  const handleSubmit = (values, { resetForm }) => {
    onAdd(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Field type="text" name="name" id="name" className={styles.input} />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="number" className={styles.label}>
            Number
          </label>
          <Field type="tel" name="number" id="number" className={styles.input} />
          <ErrorMessage name="number" component="div" className={styles.error} />
        </div>

        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;