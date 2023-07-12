const YouTubeVideo = ({ videoURL }) => {
    return (
        <iframe
            width="230"
            height="406"
            src={videoURL}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
};

export default YouTubeVideo;
