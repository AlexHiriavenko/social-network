import React from "react";
import { Formik, Field } from "formik";

const CheckboxMenu = () => {
    const initialValues = {
        options: ["sprots", "edu", "comedy", "other"],
    };

    const handleSubmit = (values) => {
        console.log(values.options);
    };

    const handleSelectAll = (formik) => {
        const { setFieldValue } = formik;
        const { options } = initialValues;

        setFieldValue("options", options);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit, ...formik }) => (
                <form onSubmit={handleSubmit} className="checkbox-form">
                    <button
                        type="button"
                        className="watch__btn-all"
                        onClick={() => handleSelectAll(formik)}>
                        Select All
                    </button>
                    <label>
                        <Field type="checkbox" name="options" value="sprots" />
                        Sports
                    </label>
                    <label>
                        <Field type="checkbox" name="options" value="comedy" />
                        Comedy
                    </label>
                    <label>
                        <Field type="checkbox" name="options" value="edu" />
                        Education
                    </label>
                    <label>
                        <Field type="checkbox" name="options" value="other" />
                        Other
                    </label>
                    <button type="submit" className="watch__btn-submit">
                        Filter
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default CheckboxMenu;
