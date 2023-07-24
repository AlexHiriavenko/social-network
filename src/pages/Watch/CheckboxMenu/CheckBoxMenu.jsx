import React from "react";
import { Formik } from "formik";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useTheme } from "@mui/material/styles";

const CheckboxMenu = (props) => {
    const theme = useTheme();
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
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="comedy"
                                    name="options"
                                    value="comedy"
                                    checked={formik.values.options.includes("comedy")}
                                    onChange={formik.handleChange}
                                    icon={
                                        <CheckBoxOutlineBlankIcon
                                            style={{ color: theme.palette.textColor.main }}
                                        />
                                    }
                                />
                            }
                            label="Comedy"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="edu"
                                    name="options"
                                    value="edu"
                                    checked={formik.values.options.includes("edu")}
                                    onChange={formik.handleChange}
                                    icon={
                                        <CheckBoxOutlineBlankIcon
                                            style={{ color: theme.palette.textColor.main }}
                                        />
                                    }
                                />
                            }
                            label="Education"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="sports"
                                    name="options"
                                    value="sports"
                                    checked={formik.values.options.includes("sports")}
                                    onChange={formik.handleChange}
                                    icon={
                                        <CheckBoxOutlineBlankIcon
                                            style={{ color: theme.palette.textColor.main }}
                                        />
                                    }
                                />
                            }
                            label="Sports"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="other"
                                    name="options"
                                    value="other"
                                    checked={formik.values.options.includes("other")}
                                    onChange={formik.handleChange}
                                    icon={
                                        <CheckBoxOutlineBlankIcon
                                            style={{ color: theme.palette.textColor.main }}
                                        />
                                    }
                                />
                            }
                            label="Other"
                        />
                    </FormGroup>
                    <button type="submit" className="watch__btn-submit">
                        Filter
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default CheckboxMenu;
