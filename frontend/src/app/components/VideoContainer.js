import React from 'react';
import styles from './VideoContainer.module.css';


const VideoContainer = ({ src }) => {
  return (
    <div className={styles.videoContainer}>
      <video className={styles.video} autoPlay loop muted>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoContainer;
