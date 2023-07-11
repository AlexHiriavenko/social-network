import { Formik, Field } from "formik";

const CheckboxMenu = () => {
    const initialValues = {
        options: ["sprots", "edu", "humor", "other"], // Здесь можно задать начальные значения флажков
    };

    const handleSubmit = (values) => {
        console.log(values.options);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <button>Select All</button>
                    <label>
                        <Field type="checkbox" name="options" value="sprots" />
                        Sports
                    </label>
                    <br />
                    <label>
                        <Field type="checkbox" name="options" value="humor" />
                        Humor
                    </label>
                    <br />
                    <label>
                        <Field type="checkbox" name="options" value="edu" />
                        Education
                    </label>
                    <br />
                    <label>
                        <Field type="checkbox" name="options" value="other" />
                        Other
                    </label>
                    <br />
                    <button type="submit">Filter</button>
                </form>
            )}
        </Formik>
    );
};

export default CheckboxMenu;
