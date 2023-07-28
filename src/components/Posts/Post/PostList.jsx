import Post from "./Post";

const mockPosts = [
  {
    author: "Viktor Ostapenko",
    authorImage:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=2000",
    likes: 35,
    comments: ['fdsl,fl'],
    reposts: 2,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur perspiciatis placeat, rerum a fugiat atque velit maxime quibusdam itaque ullam, nulla dicta inventore officiis aspernatur facilis, asperiores similique! Ducimus, officiis!",
    images: [
      "https://media.istockphoto.com/id/484202576/photo/catch-the-star.jpg?s=612x612&w=0&k=20&c=AwV_fDJD5FIsABp-ju2_yB3tSTDwnav--7mZqRV1AVo=",
      "https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      "https://images.unsplash.com/photo-1599839931705-734dd04eb858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
      "https://blog.assets.triptrivia.com/2020/10/shutterstock_1734865871.jpg",
      "https://www.wolfsklamm.com/wp-content/uploads/2022/09/Sehenswuerdigkeiten-Alpen.jpg",
      "https://assets.kurz-mal-weg.de/image/2434342722/Zj1wL3Byb2QvMTEzODhfd2FuZGVydXJsYXViLWFscGVuanBlZyZ3PTYwMCZoPTMzMCZjPWF0dGVudGlvbg/",
    ],
  },
];

export default function PostList() {
  return (
    <ul>
      {mockPosts.map((post, index) => (
        <Post {...post} key={index}/>
      ))}
    </ul>
  );
}
