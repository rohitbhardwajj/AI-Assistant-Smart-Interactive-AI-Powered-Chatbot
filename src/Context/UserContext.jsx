import React, { createContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDWqj6QHM2u0EyaE_nVueWbOfPPQKYRUN8"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const DataContext = createContext(); // Context name is fine

const UserContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state

  let speak = (text) => {
    let speak_text = new SpeechSynthesisUtterance(text);
    speak_text.volume = 1;
    speak_text.rate = 1;
    speak_text.pitch = 1;
    speak_text.lang = "hi-GB";

    window.speechSynthesis.speak(speak_text);
  };

  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!speechRecognition) {
    console.error("Speech Recognition not supported in this browser");
    return <>{children}</>;
  }

  let recognition = new speechRecognition();
  recognition.onresult = async (e) => {
    let currIndex = e.resultIndex;
    let transcript = e.results[currIndex][0].transcript;
    console.log(transcript);

    setIsLoading(true); // Start loading animation
    const aiResponse = await getAIResponse(transcript);
    console.log(aiResponse);
    setIsLoading(false); // Stop loading animation
    speak(aiResponse); // Speak the AI response
  };

  const getAIResponse = async (prompt) => {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  return (
    <DataContext.Provider value={{ recognition, speak, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;
export { DataContext };