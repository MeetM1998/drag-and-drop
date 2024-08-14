import React, { useCallback, useState } from "react";
import Xarrow from "react-xarrows";
import Card from "../components/Card";
import Popup from "../components/Popup";
import Canvas from "../components/Canvas";

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState({ isOpen: false, text: "" });
  const [editLabelPopup, setEditLabelPopup] = useState({
    isOpen: false,
    connection: null,
  });
  const [connections, setConnections] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(1);
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleShowMore = (id) => {
    const card = cards.find((c) => c.id === id);
    setPopup({ isOpen: true, text: card.text });
  };

  const handleClosePopup = () => {
    setPopup({ isOpen: false, text: "" });
    setEditLabelPopup({ isOpen: false, connection: null });
  };

  const addCard = () => {
    const newCard = {
      id: `card${cardIndex}`,
      label: `Card ${cardIndex}`,
      text: `This is some dummy text for card ${cardIndex}.`,
      position: {
        x: 100 + cardIndex * 20,
        y: 100 + cardIndex * 20,
      },
    };
    setCards([...cards, newCard]);
    setCardIndex(cardIndex + 1);
  };

  const connectCards = () => {
    if (selectedCards.length === 2) {
      const newConnection = {
        start: selectedCards[0],
        end: selectedCards[1],
        label: `${selectedCards[0]} -> ${selectedCards[1]}`,
      };
      setConnections([...connections, newConnection]);
      setSelectedCards([]);
    }
  };

  const removeConnection = (start, end) => {
    setConnections(
      connections.filter((conn) => conn.start !== start || conn.end !== end)
    );
  };

  const handleSelectCard = (id) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      if (selectedCards.length < 2) {
        setSelectedCards([...selectedCards, id]);
      }
    }
  };

  const handleLabelClick = useCallback(
    (conn) => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }

      const timeout = setTimeout(() => {
        setEditLabelPopup({ isOpen: true, connection: conn });
      }, 250);

      setClickTimeout(timeout);
    },
    [clickTimeout]
  );

  const handleLabelDoubleClick = (conn) => {
    clearTimeout(clickTimeout);
    removeConnection(conn.start, conn.end);
  };

  const handleLabelChange = (newLabel) => {
    if (editLabelPopup.connection) {
      const updatedConnections = connections.map((conn) =>
        conn.start === editLabelPopup.connection.start &&
        conn.end === editLabelPopup.connection.end
          ? { ...conn, label: newLabel }
          : conn
      );
      setConnections(updatedConnections);
      handleClosePopup();
    }
  };

  return (
    <Canvas>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          label={card.label}
          text={card.text}
          position={card.position}
          onShowMore={handleShowMore}
          onSelect={() => handleSelectCard(card.id)}
          isSelected={selectedCards.includes(card.id)}
        />
      ))}

      {connections.map((conn, index) => (
        <React.Fragment key={index}>
          <Xarrow
            start={conn.start}
            end={conn.end}
            zIndex={0}
            curveness={0.8}
            color="blue"
            strokeWidth={2}
            headSize={4}
            startAnchor="auto"
            endAnchor="auto"
            labels={
              <div
                onClick={() => handleLabelClick(conn)}
                onDoubleClick={() => handleLabelDoubleClick(conn)}
                className="cursor-pointer bg-white text-xs px-1 rounded shadow"
              >
                {conn.label}
              </div>
            }
          />
        </React.Fragment>
      ))}

      <Popup
        isOpen={popup.isOpen}
        onClose={handleClosePopup}
        text={popup.text}
      />
      {editLabelPopup.isOpen && (
        <Popup
          isOpen={editLabelPopup.isOpen}
          onClose={handleClosePopup}
          text="Change the connection label:"
          initialLabel={editLabelPopup.connection.label}
          onRename={handleLabelChange}
        />
      )}

      <button
        onClick={addCard}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
      >
        Add Card
      </button>

      <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-lg fixed top-4 right-4">
      <p className=" text-xl font-sans font-semibold ">Notes:</p>
        <p className=" text-sm font-sans font-medium">
          1) Rename Connection Label:- Single Click on Connection Label
        </p>
        <p className=" text-sm font-sans font-medium">
          2) Remove Connection:- Double Click on Connection Label
        </p>
      </div>
      <button
        onClick={connectCards}
        className="fixed bottom-4 left-4 bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition"
      >
        Connect Cards
      </button>
    </Canvas>
  );
};

export default HomePage;
