// frontend/src/components/VoiceRecorder.jsx
import React, { useState, useRef, useEffect } from "react";

export default function VoiceRecorder({
  onStreamStart = () => {},
  onStreamStop = () => {},
  onTranscribed,
}) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  // 1) init MediaRecorder
  useEffect(() => {
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;

        // instantiate recorder
        const mr = new MediaRecorder(stream);
        mediaRecorderRef.current = mr;
        mr.ondataavailable = (e) => audioChunksRef.current.push(e.data);
        mr.onstop = handleStop;
      } catch (err) {
        console.error("🔴 Mic init failed", err);
        alert("Unable to access microphone");
      }
    }
    init();

    // cleanup
    return () => {
      mediaRecorderRef.current?.stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // 2) when recorder stops, send for transcription
  const handleStop = () => {
    onStreamStop();
    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        const res = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioBase64: base64 }),
        });
        const { transcript } = await res.json();
        onTranscribed(transcript);
      } catch (err) {
        console.error("🔴 Transcription error", err);
      }
    };
    reader.readAsDataURL(blob);
    audioChunksRef.current = [];
  };

  // start/stop handlers
  const startRecording = () => {
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setRecording(true);
    onStreamStart(streamRef.current);
  };
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    // onStreamStop() will be invoked in handleStop
  };

  return (
    <div className="recorder-panel">
      <h5 className="futuristic-text text-center mb-3">Voice Recorder</h5>
      <button
        className={`recorder-btn ${recording ? "recording" : ""}`}
        onClick={recording ? stopRecording : startRecording}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mic-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="20"
          height="20"
        >
          <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" />
          <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.92V21h-3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-3.08A7 7 0 0 0 19 11z" />
        </svg>
        <span className="btn-label">{recording ? "Stop" : "Record"}</span>
      </button>
    </div>
  );
}
