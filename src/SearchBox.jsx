import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "./SearchBox.css";
import { useState } from "react";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const API_URL = `http://api.openweathermap.org/data/2.5/weather`;
  const API_KEY = "91508ca96fefaf58f39ed1b7e029abe0";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };
  let handleChange = (event) => {
    setCity(event.target.value);
  };
  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          varient="outlined"
          required
          value={city}
          onChange={handleChange}
        ></TextField>
        <br />
        <br />
        <Button
          variant="contained"
          type="submit"
          style={{ marginBottom: "10px" }}
        >
          Search
        </Button>
        {error && (
          <Alert
            severity="error"
            onClose={() => {
              setError(false);
            }}
          >
            No such place exists!
          </Alert>
        )}
      </form>
    </div>
  );
}
