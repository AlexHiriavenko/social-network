import { Box } from "@mui/material";
import { useEffect } from "react";
import { getBirthdays } from '../../../redux/friends/actionCreators';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import {SidebarStyled} from '../../../components/StyledComponents/SideBarFriends'
import { SectionWraper, H1Styled, SideBarWrapper } from '../../../components/StyledComponents/FriendPageComponents';
import SideBarHeader from '../../../components/Friends/SideBar/SideBarHeader';
import SideBarList from '../SideBarList'
import OneMonthItems from './OneMonthItems';
import styled from "@emotion/styled";
import { setFriends, setUser, getUser, getFriends } from "../../../redux/user.slice/user.slice";

function FriendBirthdays() {

    const dispatch = useDispatch();

    const birthdays = useSelector((store)=>store.friends.birthdays, shallowEqual)
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const today = new Date();
    const todayBirthdays = birthdays[0]?.filter(el => (new Date(el.friend.birthDate)).getDate() === today.getDate());
    const recentBirthdays  = birthdays[0]?.filter(el => (new Date(el.friend.birthDate)).getDate() < today.getDate());
    const upcomingBirthdays  = birthdays[0]?.filter(el => (new Date(el.friend.birthDate)).getDate() > today.getDate());
    const otheBirthdays = birthdays.slice(1);
    let key = 0;

    useEffect(() => {
        dispatch(getBirthdays());
    }, [dispatch])

    const handleLinkClick = (friend) => {
        const id  = friend.id;
        dispatch(setUser({}));

        // get user friends
    const userFriendsResponse = dispatch(getFriends(id));
        userFriendsResponse
            .then((data) => {
                const friends = data.payload.filter(el => el.status === 'accepted');
                dispatch(setFriends(friends));
                localStorage.setItem("friends", JSON.stringify(friends));
            })
            .catch((error) => console.log(error.message));

        // checking if the user is authorized
        if (id === authUser.id) {
            dispatch(setUser(authUser));
            localStorage.setItem("user", JSON.stringify(authUser));
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const userResponse = dispatch(getUser(id));
            userResponse
            .then((data) => {
                dispatch(setUser(data.payload));
                localStorage.setItem("user", JSON.stringify(data.payload));
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((error) => error.message);
        }
    }
    
    const StyledItemsContainer = styled(Box)({
        display: 'flex', 
        flexDirection: 'column', 
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    })
    
    return(
        <PageBoxFriendsWrapper>
        <PageBoxFriends>
            <SidebarStyled >
                <SideBarWrapper>
                    <SideBarHeader>
                        <H1Styled>Birthdays</H1Styled>
                    </SideBarHeader>
                    <SideBarList  activeItem={"birthdays"}/>
                </SideBarWrapper>
            </SidebarStyled>         
            <SectionWraper>
                <StyledItemsContainer>
                    {todayBirthdays.length > 0 && <OneMonthItems
                            key={key++} 
                            fullInfo={true}
                            header={"Today's birthdays"}
                            ItemList={todayBirthdays} 
                            handleLinkClick={handleLinkClick}/>}
                    {recentBirthdays.length > 0 && <OneMonthItems
                            key={key++} 
                            fullInfo={true}
                            header={"Recent birthdays"}
                            ItemList={recentBirthdays} 
                            handleLinkClick={handleLinkClick}/>}
                    {upcomingBirthdays.length > 0 && <OneMonthItems
                            key={key++} 
                            fullInfo={true}
                            header={"Upcoming birthdays"}
                            ItemList={upcomingBirthdays} 
                            handleLinkClick={handleLinkClick}/>}
                {
                    otheBirthdays.length > 0 && otheBirthdays.map(el => el.length > 0 
                        ? <OneMonthItems
                            key={key++} 
                            header={(new Date(el[0].friend.birthDate)).toLocaleString('en-US', { month: 'long' })}
                            ItemList={el} 
                            handleLinkClick={handleLinkClick}/>
                        : null)
                }
                </StyledItemsContainer>
            </SectionWraper>
        </PageBoxFriends>
    </PageBoxFriendsWrapper>
    )
}

export default FriendBirthdays;