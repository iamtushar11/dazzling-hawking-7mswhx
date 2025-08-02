import { useRef, useState } from "react";

const DragAndDrop = ({ initialState }) => {
  const [data, setData] = useState(initialState);

  const dragItem = useRef();
  const dragContainer = useRef();

  const handleDrag = (e, item, container) => {
    e.target.style.opacity = "0.5";

    dragItem.current = item;
    dragContainer.current = container;
  };
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, targetContainer) => {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;

    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i) => i !== item
      );
      newData[targetContainer] = [...newData[targetContainer], item];

      return newData;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {Object.keys(data).map((container, index) => {
        return (
          <div
            key={index}
            style={{
              background: "#f0f0f0",
              padding: "1rem",
              width: 250,
              minHeight: 300,
            }}
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={(e) => handleDragOver(e)}
          >
            <h2>{container}</h2>
            {data[container].map((item, idx) => {
              return (
                <div
                  draggable
                  onDragStart={(e) => handleDrag(e, item, container)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  key={idx}
                  style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    backgroundColor: "white",
                    cursor: "move",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DragAndDrop;
