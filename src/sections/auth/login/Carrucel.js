import React from 'react';
import { Carousel } from 'react-bootstrap';

function Carrusel() {
  return (
    <>
    <div style={{padding:"50px"}}>

      <Carousel interval={3000} data-bs-theme="dark">
        {/* Cambia 3000 a la cantidad de milisegundos que deseas para el intervalo */}
        <Carousel.Item >
          <img
            className="d-block w-100"
            src={`/assets/illustrations/banner1.jpg`}
            alt="First slide"
            
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`/assets/illustrations/banner4.jpg`}
            alt="Second slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`/assets/illustrations/banner21.jpg`}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`/assets/illustrations/CHIMBORAZO.png`}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      </div>

    </>
  );
}

export default Carrusel;