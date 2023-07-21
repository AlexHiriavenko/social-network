import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserPage() {
    const { id } = useParams();

    const mockInfo = [
        {
            userPhoto:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SX9B49bv1yhPTT3zTSerDv4-jDoT2SN975WZ_dEEGqHaI9U09woZkiJej2vxeqUypeY&usqp=CAU",
            userName: "Garry Potter",
            mutualFriends: 3,
            userID: 13241,
            friends: [
                {
                    userId: 13242,
                    userName: "Hermione Granger",
                    userPhoto: "https://myhero.com/images/guest/g282317/hero105677/image2.jpg",
                },
                {
                    userID: 13243,
                    userName: "Ron Weasley",
                    userPhoto:
                        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg",
                },
            ],
        },
        {
            userPhoto: "https://myhero.com/images/guest/g282317/hero105677/image2.jpg",
            userName: "Hermione Granger",
            mutualFriends: 2,
            userID: 13242,
            friends: [
                {
                    userID: 13241,
                    userName: "Garry Potter",
                    userPhoto:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SX9B49bv1yhPTT3zTSerDv4-jDoT2SN975WZ_dEEGqHaI9U09woZkiJej2vxeqUypeY&usqp=CAU",
                },
                {
                    userID: 13243,
                    userName: "Ron Weasley",
                    userPhoto:
                        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg",
                },
            ],
        },
        {
            userPhoto:
                "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg",
            userName: "Ron Weasley",
            userID: 13243,
            friends: [
                {
                    userId: 13242,
                    userName: "Hermione Granger",
                    userPhoto: "https://myhero.com/images/guest/g282317/hero105677/image2.jpg",
                },
                {
                    userID: 13241,
                    userName: "Garry Potter",
                    userPhoto:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SX9B49bv1yhPTT3zTSerDv4-jDoT2SN975WZ_dEEGqHaI9U09woZkiJej2vxeqUypeY&usqp=CAU",
                },
            ],
        },
    ];
    const [userPage, setUserPage] = useState(null);

    useEffect(() => {
        const user = mockInfo.find((user) => user.userID === +id);
        setUserPage(user);
    }, [id]);

    if (!userPage) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h3 style={{ textAlign: "center", margin: "20px" }}>User Name: {userPage.userName} </h3>
            <p style={{ textAlign: "center", margin: "20px" }}>
                <img src={userPage.userPhoto} width={220}></img>
            </p>
            <h3 style={{ textAlign: "center", margin: "20px" }}>Friends:</h3>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: "10px",
                }}
            >
                {userPage.friends.map((friend) => (
                    <div key={"friend " + friend.userID}>
                        <p>{friend.userName}</p>
                        <img src={friend.userPhoto} width={200}></img>
                    </div>
                ))}
            </div>
        </>
    );
}

export default UserPage;
