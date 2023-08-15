/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState, memo, useRef } from "react";
import { SearchDiv, SearchIconWrapper, StyledInputBase } from "../Header/HeaderSearch/SeacrhComponents/searhStyles";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from '@mui/material/styles';

function Search(props) {

    const theme = useTheme();

    const { placeholderText, initialValue, handleChangeValue } = props;

    const [inputValue, setInputValue] = useState('');
    const timeoutRef = useRef(null);

    function debounce(f, t) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(f, t);
      }

    const handleSearchImput = (event) => {
        setInputValue(event.target.value);
        debounce(() => handleChangeValue(event.target.value), 2000);
    }

    useEffect(() => {
        setInputValue(initialValue);
    }, [])

    return(
        <>
            <SearchDiv sx={{m:0, px: 1, my: 1, width: '100%'}}>
                <SearchIconWrapper sx={{px: 1.5,}}>
                    <SearchIcon sx={{color: theme.palette.textColor.secondary}}/>
                </SearchIconWrapper>
                <StyledInputBase placeholder={placeholderText} inputRef={input => input && input.focus()}
                    sx={{width: '100%', px: 1, color: theme.palette.textColor.main}}
                    onChange={handleSearchImput}
                    value={inputValue}/>
            </SearchDiv>
        </>
    )
}

export default memo(Search);