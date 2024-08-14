import React from 'react';
import { Rnd } from 'react-rnd';

const Card = ({
  id,
  label,
  text,
  position,
  onShowMore,
  onSelect,
  isSelected,
}) => {
  return (
    <Rnd
      id={id}
      default={{
        x: position.x,
        y: position.y,
        width: 200,
        height: 150,
      }}
      className={`p-4 rounded shadow-md cursor-pointer bg-white border-2 z-10 ${
        isSelected ? 'border-green-500' : 'border-gray-300'
      }`}
      onClick={onSelect}
      bounds="parent"
    >
      <div className="text-xl font-semibold mb-2 text-gray-600">{label}</div>
      <p>{text.slice(0, 50)}...</p>
      <button
        onClick={() => onShowMore(id)}
        className="text-blue-500 underline mt-2"
      >
        Show More
      </button>
    </Rnd>
  );
};

export default Card;
