import React, { useState } from "react";
import Header from "./components/Header";
import WelcomeScreen from "./components/WelcomeScreen";
import ResponseCard from "./components/ResponseCard";
import JudgePanel from "./components/JudgePanel";
import InputBar from "./components/InputBar";
import LoadingState from "./components/LoadingState";
import { MOCK } from "./lib/constants";
import { sendProblem } from "./service/api.service";

export default function Arena() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'done'
  const [result, setResult] = useState(null);
  const [problem, setProblem] = useState("");

  const handleSubmit = async (text) => {
    setProblem(text);
    setStatus("loading");
    setResult(null);

    try {
      
      // const response = await axios.post("http://localhost:5000/api/battle",{
      //   message: problem
      // })
      // ── Replace with your actual backend endpoint ────────────────────────
      // const response = await fetch('http://localhost:5000/api/battle', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ problem: text }),
      // });
      // const data = await response.json();
      // setResult(data.result);
      // ───────────────────────────────────────────────────────────────────────

      // Simulating API delay
      // await new Promise((r) => setTimeout(r, 2000));

      // Build mock result or use returned result
      setResult({
        ...MOCK.result,
        problem: text,
      });
      setStatus("done");
    } catch (err) {
      console.error("Battle execution error:", err);
      setStatus("idle");
    }
  };

  const handleNewMatch = () => {
    setStatus("idle");
    setResult(null);
    setProblem("");
  };

  const handleSelectExample = (promptText) => {
    handleSubmit(promptText);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "var(--color-bg)",
        color: "var(--text-hi)",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Top Header */}
      <Header status={status} onNewMatch={handleNewMatch} />

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {status === "idle" && (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <WelcomeScreen onSelectExample={handleSelectExample} />
          </div>
        )}

        {status === "loading" && (
          <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
            <LoadingState />
          </div>
        )}

        {status === "done" && result && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "24px 32px",
              gap: 24,
              overflowY: "auto",
              minHeight: 0,
            }}
          >
            {/* Challenge Banner */}
            <div
              className="card"
              style={{
                padding: "16px 24px",
                background: "rgba(255,176,32,0.03)",
                border: "1px solid rgba(255,176,32,0.15)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexShrink: 0,
              }}
            >
              <span className="pill pill-amber" style={{ flexShrink: 0 }}>
                ⚡ ACTIVE BATTLE
              </span>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  color: "var(--text-hi)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {result.problem}
              </div>
            </div>

            {/* Side-by-Side Solutions Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                minHeight: "420px",
                flexShrink: 0,
              }}
            >
              <ResponseCard
                label="Solution 1 — Bedrock Protocol Architecture"
                accent="#00f0ff"
                score={result.judgement.solution1_score}
                content={result.solution1}
                isWinner={
                  result.judgement.solution1_score >
                  result.judgement.solution2_score
                }
              />

              <ResponseCard
                label="Solution 2 — Minecraft Coder Pack (Forge)"
                accent="#b026ff"
                score={result.judgement.solution2_score}
                content={result.solution2}
                isWinner={
                  result.judgement.solution2_score >
                  result.judgement.solution1_score
                }
              />
            </div>

            {/* AI Judge Panel */}
            <div style={{ flexShrink: 0, marginBottom: 16 }}>
              <JudgePanel judgement={result.judgement} />
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Input Bar */}
      <InputBar onSubmit={handleSubmit} isLoading={status === "loading"} />
    </div>
  );
}
