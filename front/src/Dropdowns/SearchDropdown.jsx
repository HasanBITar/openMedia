import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';

const SearchDropdown = ({ data, setValue, hideChips }) => {
  const [options, setOptions] = useState([]);

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
    chips: { display: "none" },
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
        style={hideChips? style : {}}
      />
    </div>
  );
};

export default SearchDropdown;
