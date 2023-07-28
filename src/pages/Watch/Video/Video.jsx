const YouTubeVideo = (props) => {
    const { videoURL, w, h } = props;

    return (
        <div>
            <iframe
                className="iframe"
                src={videoURL}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubeVideo;
