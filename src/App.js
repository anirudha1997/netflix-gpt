import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from "./components/Browse";
import MovieLandingPage from "./components/MovieLandingPage";
import { Provider } from "react-redux";
import appStore from "./utils/store";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/movie/:movieId" element={<MovieLandingPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
