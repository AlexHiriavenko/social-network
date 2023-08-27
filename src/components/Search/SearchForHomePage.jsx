import React, { memo, useRef,useState } from "react";
import { SearchDiv, SearchIconWrapper, StyledInputBase } from "../Header/HeaderSearch/SeacrhComponents/searhStyles";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {findByPartOfName} from "../../redux/user.slice/user.slice.js";

function Search(props) {

    const theme = useTheme();
    const dispatch = useDispatch();
;
    const { placeholderText, setFoundUser } = props;

    const timeoutRef = useRef(null);
    const valueRef = useRef(null);

    function findUser(part){
        let nameByPart = dispatch(findByPartOfName(part))
        nameByPart.then(result =>setFoundUser(result.payload))

    }

    function debounce(f, t) {
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(f, t);
        setFoundUser([])

    }

    const handleSearchImput = (event) => {
        valueRef.current = event.target.value;
        debounce(() =>{
            if(event.target.value.length >0){
                findUser(event.target.value)
            }

        }, 800);
    }

    return(
        <SearchDiv sx={{m:0, px: 1, my: 1, width: '100%'}}>
            <SearchIconWrapper sx={{px: 1.5,}}>
                <SearchIcon sx={{color: theme.palette.textColor.secondary}}/>
            </SearchIconWrapper>
            <StyledInputBase placeholder={placeholderText} inputRef={input => input && input.focus()}
                             sx={{width: '100%', px: 1, color: theme.palette.textColor.main}}
                             onChange={handleSearchImput}/>
        </SearchDiv>
    )
}

Search.propTypes = {
    handleChangeValue: PropTypes.func,
    placeholderText: PropTypes.string,
};

Search.defaultProps = {
    handleChangeValue: () => {},
    placeholderText: '',
};

export default memo(Search);