import { Radio } from "flowbite-react";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import TagSection from "./TagSection";
const LibSidebar = ({}) => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div>
      <h2 className="flex p-2 md:pt-3 lg:pt-4 font-bold text-2xl md:text-3xl text-white border-gray-600 border-b-2">
        Filters
      </h2>
      <br />
      <ul>
        <li className="w-full border-gray-600 border-b-2 pb-4 ">
          <h3 className="text-3xl font-bold">Filter By Date</h3>
          <div className="flex justify-center gap-4">
            <label className="flex items-center justify-center gap-3 align-text-top text-lg">
              Ascending
              <Radio name="DateAscOrDec" />
            </label>
            <label className="flex items-center justify-center gap-3 align-text-top text-lg">
              Descending
              <Radio name="DateAscOrDec" />
            </label>
          </div>

          <div
            id="date-range-picker"
            class="flex items-center flex-col w-full mt-4 space-y-2"
          >
            <p className="text-xl">Select the Starting and Ending Dates</p>
            <Datepicker value={value} onChange={handleValueChange} />
          </div>
        </li>
        <li className="w-full border-gray-600 border-b-2 pb-4 mt-4">
          <h3 className="text-3xl font-bold">Filter By Size</h3>
          <div className="flex justify-center gap-4">
            <label className="flex items-center justify-center gap-3 align-text-top text-lg">
              Ascending
              <Radio name="SizeAscOrDec" />
            </label>
            <label className="flex items-center justify-center gap-3 align-text-top text-lg">
              Descending
              <Radio name="SizeAscOrDec" />
            </label>
          </div>
        </li>
        <li>
          <ul>
            <TagSection />
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default LibSidebar;
