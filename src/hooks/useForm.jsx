import {useState} from "react"

export default function useSignUpForm (state){
  const [inputs, setInputs] = useState(state);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }  
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs
  };
}