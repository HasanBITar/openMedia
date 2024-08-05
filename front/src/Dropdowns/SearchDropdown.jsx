import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';

const SearchDropdown = ({ setValue, hideChips }) => {
  const [options, setOptions] = useState([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' }
  ]);

  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelect = (selectedList) => {
    console.log(selectedList)
    setValue(selectedList);
    setSelectedValues(selectedList);
  };

  const handleRemove = (selectedList) => {
    console.log(selectedList)
    setValue(selectedList);
    setSelectedValues(selectedList);
  };

  const displayOption = (option) => {
    return (
      <div className="bg-gray-menu">
      </div>
    );
  };

  const style = {
    chips: { background: "bg-gray-menu" },
    searchBox: { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" }
  }

  return (
    <div>
      <Multiselect
        options={options}
        displayValue="name"
        onSelect={handleSelect}
        onRemove={handleRemove}
        customOption={displayOption}
        showCheckbox={true}
        placeholder='Type user name'
        className='w-full bg-gray-input focus:outline-none focus:border-none border-none ring-0 outline-none rounded-lg'
        id='myRandomSearch'
        // style={style}
      />
    </div>
  );
};

export default SearchDropdown;
