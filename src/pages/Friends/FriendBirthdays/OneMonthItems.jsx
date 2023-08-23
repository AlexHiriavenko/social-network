import { Box } from "@mui/material";
import { 
    ContemtWraper, 
    CardMediaStyled, 
    StyledLink, 
    StyledTooltip, 
    StyledHeader, 
    StyledDescription, 
    FriendName, 
    BirthdayDate, 
    CardContentStyled 
} from './StyledComponents';

function OneMonthItems(props) {

    const { header, ItemList, handleLinkClick, fullInfo } = props;
    const userProfileImageDefault = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANEhAODg0NDw0NDg0PDQ4NEBANDQ4QFhEXFhUVFRMYHSggGBolGxMTITEhJikrLi4uFyAzODMsNygtLisBCgoKDQ0NEA0PDysZFRkrLTctNzctKysrLTcrKystKzc3LSsrNysrLSsrNysrKy0rKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQQFBgMCB//EADQQAQACAAMEBQsFAQEAAAAAAAABAgMFEQQhMVESQVJhkhUiMjNxgaGxssHREyNCcpGCc//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/RAG2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfX6kgPkAAAAAAAAAAAAECpEAiQAAAAAAAAAAAAAAAAAAAAAAAIjXd1tHZMqm2+86R1RHF75TsMV/ctvtPCJ6mpozaqrhZfhU4V1nnOqxXDrH8Y/wAfQivO2BSeNY3qmPldLejHRnu4L4I5radjvhelGsdUxweDqsSkWiazwmJiXPbds04VtONZ31lqCsAqAAAAAAAAAAAAAAAAAAC5lezxiX3xrWu+VKW7kuHpTpab7SlVoRAkZVAlAAJBCtt2zxiVndvjfXuWkCOTnlyJWcxw4piWiI47+5Wa0AFQAAAAAAAAAAAAAAABDptirpSvV5sOZdRsvoU/rX5JVewhLKgAAACJSiQYudxpas6cYnXv4M1qZ9xw/Zb7MtUAGkAAAAAAAAAAAAAAAAQ6TLsTpYdZ5Rp/m5zjWyTHjzqTx4xySq1xCWVAAAAEJfN7aRMzwgGHnWLreK9mPnooQ9NqxOna1uczMa8nlDSJAVAQkAAAAAAAAAAAAAAB94GJNLRaOMS+CCq6jAxoxKxaJjv06pernNg2z9Gd+vRnjH3dBh4kWiJid0sK+wAAAGVm+17pw68d3S+axmG2xhRMRvvMTEadU85YFrTMzMzrM8VkR8pBpAAAAAAAAAAAAAAAAAAAgIFQ9tn2q+H6M7uU74eQg1tnznqvX3wsxm2F2p8Nvw58MG7fN8ONdNZ5bpj5qWLmuJbhpWO7izzUwfV7zaZmZmZnmhAqJAAAAAAAAAAAAAAAAAgB9YeHa86ViZ+S9sOW9PffWK7tI65bOFg1pGlaxGiarHwMptO+09HuXKZRhxxm8++Pw0BlVLyVhdmfFJ5LwuzPildAUvJWF2Z8Uo8lYXZnxSvAKPkrC7M+KTyVhdmfFK8Ao+SsLsz4pfNsow54TePZMfeGgAyb5LH8cSffXVUxssxa/wAelHOs6/Di6EXUxyVomN0xMTyndI6jH2emJGl6xPf1x7JYe3ZfbC86POpz649qyimAqAAAAAAAAAAENbLsu/nf3Qr5Ts3Tt0p4V+bfiGbViIhIIqEgAAAAAAAAAAAiY13TwlIDBzPYf0/Pr6Ezvjsz+FB1d6RaJrMaxMaTDmtrwJwrTWerfE846mpUeICoAAAAAAJpWbTERxmYiEL+TYPSv0p4UjX3zw+5VbGybPGFWKx755z1y9gYUAAAAAAAAAAAAAAAAZ2dYHSp04404/1lovjGp0q2r2qzHwByohLbIAAAAAA28ir5lp530/yI/LEb+TR+1Hfa0/HT7JVi8AyoAAAAAAAAAAAAAAAAADldorpe8cr2j4vh67X6zE/9L/VLybZAAAAAAHQ5R6qv/X1S550GUeqr7bfVKVYugMqAAAAAAAAAAAAAAAAAA5nbo/cxP72eCzmcaYt/bHyhWbQAEAAAAHQZR6qvtt9UglWLoDKgAAAAAAAAAAAAAAAIkhIDnc19bf8A5+mFQG4gAIAA/9k=';

    const month=(new Date(ItemList[0].friend.birthDate)).toLocaleString('en-US', { month: 'long' });

    const countForDisplayMF = 2;

    const friendListDescription =  ItemList && ItemList.length > countForDisplayMF
    ? ( 
        <span>
            {ItemList.slice(0, countForDisplayMF).map(el => <FriendName to={`/Profile`} 
                onClick={() => handleLinkClick(el.friend)} 
                key={el.id}>{el.friend.fullName} </FriendName>)}
            <span> and {ItemList.length - countForDisplayMF} more...</span>
        </span>
        ) 
    : ( 
        <span>
            {ItemList.map(el => <FriendName to={`/Profile`} 
                onClick={() => handleLinkClick(el.friend)}
                key={el.id}>{el.friend.fullName} </FriendName>)}
        </span>
        );

    return (
        <ContemtWraper>
            <StyledHeader sx={{}}>{header? header : month}</StyledHeader>
            {<StyledDescription>{!fullInfo && friendListDescription}</StyledDescription>}
            <Box sx={{width: '100%', display: 'flex', p: '10px', gap: 1, flexDirection: fullInfo ? 'column' : 'row'}}>
            {ItemList.length > 0 && ItemList.map(el => { 
                const birthdate = new Date(el.friend.birthDate);
                return <CardContentStyled key={el.id}> 
                        <StyledTooltip key={el.id} sx={{pointerEvents: 'all', display: 'flex'}} 
                            title={fullInfo ? null : el.friend.fullName + "`s birthday is " + birthdate?.getDate() + " " + month}>
                            <StyledLink to={`/Profile`}  onClick={() => handleLinkClick(el.friend)}>
                                <CardMediaStyled
                                    image={el.friend.profilePicture ? el.friend.profilePicture : userProfileImageDefault}
                                    alt="Profile Picture"
                                />
                            </StyledLink>
                        </StyledTooltip>
                        {fullInfo && 
                            <Box sx={{ display: 'flex', gap: 1/2, height: 30, flexDirection: 'column', ml: 2}}>
                                <FriendName to={`/Profile`} 
                                             onClick={() => handleLinkClick(el.friend)} 
                                            key={el.id} sx={{fontWeight: 800}}>
                                    {el.friend.fullName}
                                </FriendName>
                                <BirthdayDate>
                                    {(new Date(el.friend.birthDate))
                                        .toLocaleDateString('en-us', {  day:"numeric", month:"long", year:"numeric" })}
                                </BirthdayDate>
                            </Box>}
                        </CardContentStyled>;
                        })}
            </Box>
        </ContemtWraper>
    )
}

export default OneMonthItems;