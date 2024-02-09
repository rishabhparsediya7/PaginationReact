import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [totalList, setTotalList] = useState([]); // Getting one time data
  const [photosList, setPhotosList] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8); // No of Documents per Pages.
  const [totalLength, setTotalLength] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(5);

  // No of pages
  // which depends on the length of the data or the documents.
  const [rangeArray, setRangeArray] = useState(
    generateRangeArray(startPage, endPage)
  );

  // Changing pagination array
  function generateRangeArray(s, e) {
    return Array.from({ length: 5 }, (_, index) => s + index);
  }
  const getPhotos = async (s, e) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?albumId=1`
    );
    if (response.status === 200) {
      setTotalList(response.data);
      setPhotosList(response.data.slice(start, end));
      setTotalLength(response.data.length);
    }
  };
  const handlePrev = () => {
    if (start <= 0) {
      return;
    }
    if (startPage > 0) {
      setStartPage((prevCount) => prevCount - 1);
    }
    setStart((prev) => prev - 8);
    setEnd((prev) => prev - 8);
  };
  const handleNext = () => {
    if (startPage + 5 > Math.ceil(totalLength / 8)) {
      return;
    }
    setStartPage((prevCount) => prevCount + 1);
    setEndPage((prevCount) => prevCount + 1);

    setStart((prev) => prev + 8);
    setEnd((prev) => prev + 8);
  };
  // handle each page request
  const handlePage = (page) => {
    const start = (page - 1) * 8;
    const end = start + 8;
    setStart(start);
    setEnd(end);
  };
  useEffect(() => {
    getPhotos(start, end);
    const newList = totalList.slice(start, end);
    setPhotosList(newList);
    const newEnd = startPage + 5;
    setRangeArray(generateRangeArray(startPage, newEnd));
  }, [start, end, setStartPage, totalList]);
  return (
    <div style={{ width: "100%" }}>
      <h1>Pagination</h1>
      {photosList.map((e, index) => (
        <div
          style={{
            width: "20rem",
            backgroundColor: "gray",
            borderRadius: "10px",
            padding: "0px 2px",
            marginBottom: "2px",
          }}
          key={index}
        >
          <h5>
            {e.id} {e.title}
          </h5>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "0px 5px",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#646cff",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handlePrev}
        >
          Prev
        </div>
        {rangeArray.map((e, index) => (
          <div
            onClick={() => handlePage(e)}
            key={index}
            style={{
              display: "flex",
              backgroundColor: "#646cff",
              padding: "10px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {e}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            backgroundColor: "#646cff",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleNext}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default App;
