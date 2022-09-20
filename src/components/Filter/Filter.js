import React from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";

const Filter = ({ setSort, setOrder }) => {
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const handleOrder = (e) => {
    setOrder(e.target.value);
  };
  return (
    <FormControl>
      <FormLabel id="sort-group-div">Sort by</FormLabel>
      <RadioGroup
        aria-labelledby="sort-group-div"
        name="sort-group"
        defaultValue={"1"}
        onChange={handleSort}
      >
        <FormControlLabel value="1" control={<Radio />} label="Popularity" />
        <FormControlLabel value="2" control={<Radio />} label="Release Date" />
      </RadioGroup>
      <FormLabel id="order-group-div">Order</FormLabel>
      <RadioGroup
        aria-labelledby="order-group-div"
        name="order-group"
        defaultValue={"2"}
        // value={value}
        onChange={handleOrder}
      >
        <FormControlLabel value="1" control={<Radio />} label="Ascending" />
        <FormControlLabel value="2" control={<Radio />} label="Descending" />
      </RadioGroup>
    </FormControl>
  );
};

export default Filter;
