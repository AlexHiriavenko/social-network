/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState, memo, useRef } from "react";
import { SearchDiv, SearchIconWrapper, StyledInputBase } from "../Header/HeaderSearch/SeacrhComponents/searhStyles";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

function Search(props) {

    const theme = useTheme();

    const { placeholderText, handleChangeValue } = props;

    const timeoutRef = useRef(null);  
    const valueRef = useRef(null);

    const placeholderCurrent = valueRef.current ? valueRef.current : placeholderText;

    function debounce(f, t) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(f, t);
      }

    const handleSearchImput = (event) => {
        useRef.current = event.target.value;  
        debounce(() => handleChangeValue(event.target.value), 800);
    }

    return(
        <>
            <SearchDiv sx={{m:0, px: 1, my: 1, width: '100%'}}>
                <SearchIconWrapper sx={{px: 1.5,}}>
                    <SearchIcon sx={{color: theme.palette.textColor.secondary}}/>
                </SearchIconWrapper>
                <StyledInputBase placeholder={placeholderCurrent} inputRef={input => input && input.focus()}
                    sx={{width: '100%', px: 1, color: theme.palette.textColor.main}}
                    onChange={handleSearchImput}
                    value={valueRef.current}/>
            </SearchDiv>
        </>
    )
}

Search.propTypes = {
    handleChangeValue: PropTypes.func,
    placeholderText: PropTypes.string,
    initialValue: PropTypes.string,
  };
  
  Search.defaultProps = {
    handleChangeValue: () => {},
    placeholderText: '',
    initialValue: '',
  };

export default memo(Search);