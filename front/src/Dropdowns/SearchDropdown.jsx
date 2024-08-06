import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';

const SearchDropdown = ({ data, setValue, hideChips, fieldName }) => {
  const [options, setOptions] = useState(data || []);

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
        displayValue={fieldName}
        onSelect={handleSelect}
        onRemove={handleRemove}
        customOption={displayOption}
        showCheckbox={true}
        placeholder='Type to search'
        className='w-full bg-gray-input focus:outline-none focus:border-none border-none ring-0 outline-none rounded-lg'
        id='myRandomSearch'
        style={hideChips? style : {}}
      />
    </div>
  );
};

export default SearchDropdown;
