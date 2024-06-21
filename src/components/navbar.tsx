// navbar.tsx
'use client'


import React, { useState } from "react";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import axios from "axios";
import { useAtom } from "jotai";
import Searchbox from "./searchbox";
// import SuggestionBox from "./suggestionBox"; // Assuming you have a SuggestionBox component

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

interface NavbarProps {
  place: string;
  setPlace: (newPlace: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ place, setPlace }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setError("Failed to fetch suggestions");
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(item: string) {
    setCity(item);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found");
    } else {
      setError("");
      setPlace(city);
      setShowSuggestions(false);
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdWbSunny className="text-yellow-400 text-4xl" />
        </p>

        <section className="flex gap-2 items-center">
          <FaLocationCrosshairs className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm">India</p>

          <div className="relative">
            <Searchbox
              value={city}
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSubmitSearch}
            />
            {/* <SuggestionBox
              showSuggestions={showSuggestions}
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
              error={error} */}
            {/* /> */}
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
