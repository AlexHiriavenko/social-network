const YouTubeVideo = (props) => {
    const { videoURL, w, h } = props;

    return (
        <div>
            <iframe
                width={Math.round(w / 1.5) > 320 ? 280 : Math.round(w / 1.5)}
                height={Math.round(h / 1.5)}
                src={videoURL}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </div>
    );
};

export default YouTubeVideo;
