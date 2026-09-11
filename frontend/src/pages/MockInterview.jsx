import { useState } from "react";
import InterviewConfigurator from "../components/mockInterview/InterviewConfigurator";
import InterviewRoom from "../components/mockInterview/InterviewRoom";
import ErrorBoundary from "../components/ErrorBoundary";

export default function MockInterview() {
  const [sessionConfig, setSessionConfig] = useState(null);

  const handleStartInterview = (config) => {
    setSessionConfig(config);
  };

  const handleExitInterview = () => {
    setSessionConfig(null);
  };

  return (
    <ErrorBoundary>
      <InterviewConfigurator onStartInterview={handleStartInterview} />
      
      {sessionConfig && (
        <InterviewRoom 
          config={sessionConfig} 
          onExit={handleExitInterview} 
        />
      )}
    </ErrorBoundary>
  );
}
