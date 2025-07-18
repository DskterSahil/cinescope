export default function MovieCardSlider({ image }) {
  if (!image) return null;

  return (
    <img
      src={image}
      alt="Backdrop"
      className="image"
      
    />
  );
}
