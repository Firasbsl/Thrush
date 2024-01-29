//import GuitarPic from './images/GuitarPic.jpg';
//import './ProductCard.css'

export default function ProductCard(props) {
  return (
    <div className="card">
      {props.productAvailable === 0 && <div className="badge">SOLD OUT</div>}

      <p className="title">Accoustic Guitar </p>
      {props.price && <p className="price"> price: {props.price} </p>}
    </div>
  );
}
