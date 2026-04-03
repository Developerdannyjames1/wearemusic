const VIDEO_SRC =
  'https://wearemusic.testlinkhub.com/wp-content/uploads/2025/07/7031209-3D-Animated-3840X2160.mp4';

export function RainVideo({ className = '' }) {
  return (
    <video
      className={`position-absolute top-0 start-0 w-100 h-100 object-fit-cover ${className}`}
      style={{ zIndex: 0 }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="https://via.placeholder.com/1920x1080?text=Loading"
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
