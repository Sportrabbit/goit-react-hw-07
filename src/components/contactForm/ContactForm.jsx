import css from "./ContactForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

const initialValues = { name: "", tel: "" };

const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
        .min(3)
        .max(50, "Must be less than 50")
        .required("Required"),
    tel: Yup.string()
        .min(3)
        .max(50, "Must be less than 50")
        .required("Required"),
});
    
export default function ContactForm() {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        dispatch(addContact(values.name, values.tel));
        resetForm();
    };

    return (
        <div>
            <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
            >
                <Form className={css["form"]}>
                    <div className={css["form-container"]}>
                        <div className={css["input-container"]}>
                            <label htmlFor="nameId" className={css["form-label"]}>
                                Name
                            </label>
                            <Field
                            name="name"
                            type="text"
                            className={css["input-field"]}
                            />
                            <ErrorMessage name="name" as="span"/>
                        </div>
                        <div className={css["input-container"]}>
                            <label htmlFor="telId" className={css["form-label"]}>
                                Number
                            </label>
                            <Field
                            name="tel"
                            type="tel"
                            className={css["input-field"]}
                            />
                            <ErrorMessage name="tel" as="span"/>
                        </div>
                    </div>
                    <button type="submit" className={css["btn-sub"]}>
                        Add contact
                    </button>
                </Form>
            </Formik>
        </div>
    );
}