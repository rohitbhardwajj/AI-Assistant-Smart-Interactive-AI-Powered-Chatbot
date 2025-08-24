import React, { createContext, useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC2_0dTUlrPb-D_RfzHyoxq3ECgAzBVdas"; 
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const DataContext = createContext();

const UserContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef(null);

  const speak = (text) => {
    let speak_text = new SpeechSynthesisUtterance(text);
    speak_text.volume = 1;
    speak_text.rate = 1;
    speak_text.pitch = 1;
    speak_text.lang = "en-GB";

    window.speechSynthesis.speak(speak_text);
  };

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech Recognition not supported in this browser");
    return <>{children}</>;
  }

  if (!recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = async (e) => {
      let transcript = e.results[0][0].transcript;
      console.log("User said:", transcript);

      setIsLoading(true);
      const aiResponse = await getAIResponse(transcript);
      console.log("AI Response:", aiResponse);
      setIsLoading(false);

      speak(aiResponse);
    };
  }
  const getAIResponse = async (prompt) => {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
      return result.response.text();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };
  const handleVoiceInteraction = () => {
    speak("Hello, how can I help you?");
    setTimeout(() => {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    }, 2000);
  };
  const stopAI = () => {
    console.log("Stopping AI...");
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsLoading(false);
  };

  return (
    <DataContext.Provider value={{ handleVoiceInteraction, stopAI, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;
export { DataContext };
