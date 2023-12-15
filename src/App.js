import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const initialFormData = {
    username: "",
    password: "",
    photo: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSignUp = async () => {
    try {
      if (!formData.username || !formData.password) {
        setMessage("Username and password are required.");
        return;
      }

      const response = await axios.post(
        "https://api.jsonbin.io/b/YOUR_JSONBIN_ID",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "secret-key": "657bf2efdc74654018837969",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Sign up successful!");
        setFormData(initialFormData);
      } else {
        setMessage("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      setMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Sign Up Form</h1>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Photo:
        <input type="file" name="photo" onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
