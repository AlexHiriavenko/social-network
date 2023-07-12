import React from "react";
import { Formik, Field } from "formik";

const CheckboxMenu = (props) => {
    const { onFilterCategories } = props;

    const initialValues = {
        options: ["sports", "edu", "comedy", "other"],
    };

    const handleSubmit = (values) => {
        const checkedItems = values.options;
        onFilterCategories(checkedItems);
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
                        onClick={() => handleSelectAll(formik)}
                    >
                        Select All
                    </button>
                    <label>
                        <Field type="checkbox" name="options" value="sports" />
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
