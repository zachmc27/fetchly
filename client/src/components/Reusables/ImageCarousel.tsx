import { useState } from "react"


export default function ImageCarousel( { slides }: { slides: string[] }) {

  const [current, setCurrent] = useState(0) 
  
   const imageUrl = slides && slides.length > 0 && slides[current]
    ? slides[current]
    : "";
  const slideStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${imageUrl})`
  };

  const goToPrevious = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  
  return (
     <div className="carousel-container">
      <button onClick={goToPrevious} className="carousel-button prev">
        &lt; 
      </button>
      <div style={slideStyle} className="carousel-slide"> 
      </div>
      <button onClick={goToNext} className="carousel-button next">
        &gt; 
      </button>
      <div className="carousel-dots">
        {slides.map((_slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`carousel-dot ${current === slideIndex ? "active" : ""}`}
            onClick={() => setCurrent(slideIndex)}
          ></div>
        ))}
      </div>
    </div>
  )
}
