import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const SearchComponent = ({ tasks, setTasks, setTaskChanged, taskChanged }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const initialTasks = [...tasks];
  const handleSearch = async (searchTerm) => {
    try {
      const searchResults = await axios.get(
        `${process.env.REACT_APP_API_URL}task/search`,
        {
          withCredentials: true,
          params: { searchTerm },
        }
      );

      setTasks(searchResults.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCancel = () => {
    setSearchTerm("");
    setTasks(initialTasks);
    setTaskChanged(!taskChanged);
  };
  return (
    <div className="search">
      <FontAwesomeIcon icon={faSearch} className="icon" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(searchTerm);
          }
        }}
      />
      <FontAwesomeIcon
        icon={faXmark}
        size="xs"
        style={{ color: "#c0c0c0", cursor: "pointer" }}
        className="icon"
        onClick={handleCancel}
      />
    </div>
  );
};

export default SearchComponent;
