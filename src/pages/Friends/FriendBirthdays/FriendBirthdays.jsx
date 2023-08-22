import { useEffect } from "react";
import { getBirthdays } from '../../../redux/friends/actionCreators';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import {SidebarStyled} from '../../../components/StyledComponents/SideBarFriends'
import { SectionWraper, H1Styled, SideBarWrapper } from '../../../components/StyledComponents/FriendPageComponents';
import SideBarHeader from '../../../components/Friends/SideBar/SideBarHeader';
import SideBarList from '../SideBarList'
import OneMonthItems from './OneMonthItems';
import { handleLinkClick } from '../handleClickLink';
import { StyledItemsContainer } from './StyledComponents';

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

    const handleClickLinklocal = (friend) => {
        handleLinkClick(dispatch, friend, authUser);
    }
    
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
                            handleLinkClick={handleClickLinklocal}/>}
                    {recentBirthdays.length > 0 && <OneMonthItems
                            key={key++} 
                            fullInfo={true}
                            header={"Recent birthdays"}
                            ItemList={recentBirthdays} 
                            handleLinkClick={handleClickLinklocal}/>}
                    {upcomingBirthdays.length > 0 && <OneMonthItems
                            key={key++} 
                            fullInfo={true}
                            header={"Upcoming birthdays"}
                            ItemList={upcomingBirthdays} 
                            handleLinkClick={handleClickLinklocal}/>}
                {
                    otheBirthdays.length > 0 && otheBirthdays.map(el => el.length > 0 
                        ? <OneMonthItems
                            key={key++} 
                            header={(new Date(el[0].friend.birthDate)).toLocaleString('en-US', { month: 'long' })}
                            ItemList={el} 
                            handleLinkClick={handleClickLinklocal}/>
                        : null)
                }
                </StyledItemsContainer>
            </SectionWraper>
        </PageBoxFriends>
    </PageBoxFriendsWrapper>
    )
}

export default FriendBirthdays;