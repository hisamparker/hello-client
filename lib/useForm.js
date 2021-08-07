import { useState, useEffect } from 'react';
// custom hook for forms
export default function useForm(initialState = {}) {
  // the useState hook is reactive, useState gives us a state variable (we specify the name and initial value) and a method to update the value (we specify the name)
  const [inputs, setInputs] = useState(initialState);
  const initialValues = Object.values(initialState).join('');
  useEffect(() => {
    setInputs(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  function handleChange(e) {
    // let because we need to convert type number to a number
    let { name, value, type } = e.target;
    if (type === 'number') {
      // we need to convert to a number because html inputs always return value type string
      value = +value;
    }
    if (type === 'file') {
      // files is going to be an array, so we grab the value a little differently
      // we're saying the first element in the array is called value and has value of the element's value
      [value] = e.target.files;
    }
    setInputs({
      // spread in the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initialState);
  }

  // this code is not mine! How to loop over all entries in an object and empty it!
  function clearForm() {
    // Object.fromEntries turns the array back into an object
    const blankState = Object.fromEntries(
      // Object.entries The Object.entries() method returns an array of a given object's [key, value] pairs.
      // here, we map over those values, and for each input, make the value empty string
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blankState);
  }
  // return the stuff we want to use
  return { inputs, handleChange, resetForm, clearForm };
}
