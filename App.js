import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "js-cookie";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Categories from "./Components/Categories/Categories";
import Round1 from "./Components/Round1/Round1";
import Details from "./Components/Details/Details";
import ForgetPassword from "./Components/Forget_password/Forget_password";
import ResetPassword from "./Components/Reset_password/Reset_password";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tafseer from "./Components/Tafseer/Tafseer";
import Suars from "./Components/Suars/Suars";

function App() {
  const [currentuser, setCurrentuser] = useState("");
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setCurrentuser(user);
    }
    const fetchSurahs = async () => {
      try {
        const totalSurahs = 114; // Total number of surahs in the Quran

        const surahsArray = [];

        for (let i = 1; i <= totalSurahs; i++) {
          const response = await axios.get(`http://api.alquran.cloud/v1/surah/${i}`);
          const surahData = response.data.data;
          surahsArray.push(surahData);
        }

        setSurahs(surahsArray);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      }
    };

    fetchSurahs();
  }, []);
  // console.log(surahs);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="round1" element={<Round1 surahs={surahs} setSurahs={setSurahs} />} />
          <Route path="round1/:id" element={<Tafseer surahs={surahs} />} />
          <Route path="/details" element={<Details />} />
          <Route path="/suars" element={<Suars surahs={surahs} />} />
          <Route path="/suars/:surahID" element={<Tafseer  surahs={surahs}/>} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route
            path="/reset_password/:id/:token"
            element={<ResetPassword />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
