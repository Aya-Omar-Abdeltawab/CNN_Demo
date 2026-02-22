import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@300;500;700&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body { background: #0a0a0f; color: #e2e8f0; font-family: 'Space Grotesk', sans-serif; }

  .app {
    min-height: 100vh;
    background: #0a0a0f;
    padding: 24px;
  }

  .hero {
    text-align: center;
    margin-bottom: 40px;
  }

  .hero h1 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 2.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #60efff, #0061ff, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
  }

  .hero p {
    color: #64748b;
    margin-top: 8px;
    font-size: 0.95rem;
  }

  .tabs {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  .tab {
    padding: 8px 20px;
    border-radius: 8px;
    border: 1px solid #1e293b;
    background: #0f172a;
    color: #64748b;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    transition: all 0.2s;
  }

  .tab.active {
    background: #1e3a5f;
    border-color: #0061ff;
    color: #60efff;
  }

  .card {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 20px;
  }

  .card h2 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.1rem;
    color: #60efff;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .formula {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: #a855f7;
    margin: 12px 0;
    line-height: 1.8;
  }

  .highlight { color: #60efff; }
  .green { color: #4ade80; }
  .yellow { color: #fbbf24; }
  .red { color: #f87171; }
  .purple { color: #c084fc; }

  .grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 700px) { .grid2 { grid-template-columns: 1fr; } }

  .layer-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #1e293b;
    margin-bottom: 12px;
    background: #020617;
    transition: border-color 0.2s;
  }

  .layer-row:hover { border-color: #334155; }

  .layer-badge {
    padding: 4px 12px;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .badge-conv { background: #1e3a5f; color: #60efff; border: 1px solid #0061ff; }
  .badge-pool { background: #1a2f1a; color: #4ade80; border: 1px solid #16a34a; }
  .badge-fc   { background: #2d1f47; color: #c084fc; border: 1px solid #7c3aed; }
  .badge-flat { background: #2d2008; color: #fbbf24; border: 1px solid #b45309; }

  .layer-info { flex: 1; font-size: 0.85rem; }
  .layer-info .title { font-weight: 600; color: #e2e8f0; margin-bottom: 4px; }
  .layer-info .detail { color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; line-height: 1.6; }
  .layer-info .params { color: #fbbf24; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; margin-top: 4px; }

  .total-box {
    background: linear-gradient(135deg, #1e3a5f, #2d1f47);
    border: 1px solid #0061ff;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }

  .total-box .num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #60efff;
  }

  .total-box .label { color: #64748b; font-size: 0.85rem; margin-top: 4px; }

  /* Interactive calc */
  .calc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }

  .input-group label {
    display: block;
    font-size: 0.78rem;
    color: #64748b;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 6px;
  }

  .input-group input, .input-group select {
    width: 100%;
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 8px;
    color: #e2e8f0;
    padding: 8px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .input-group input:focus, .input-group select:focus { border-color: #0061ff; }

  .result-box {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 20px;
  }

  .result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #0f172a;
    font-size: 0.85rem;
  }

  .result-row:last-child { border-bottom: none; }
  .result-row .rkey { color: #64748b; font-family: 'JetBrains Mono', monospace; }
  .result-row .rval { font-family: 'JetBrains Mono', monospace; font-weight: 700; }

  /* Architecture viz */
  .arch-viz {
    display: flex;
    align-items: center;
    gap: 0;
    overflow-x: auto;
    padding: 20px 0;
  }

  .arch-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .arch-box {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    text-align: center;
    padding: 4px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .arch-box:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(96,239,255,0.3);
  }

  .arch-label {
    font-size: 0.65rem;
    color: #64748b;
    font-family: 'JetBrains Mono', monospace;
    text-align: center;
    max-width: 80px;
  }

  .arch-arrow {
    color: #334155;
    font-size: 1.2rem;
    margin: 0 4px;
    flex-shrink: 0;
    margin-top: -20px;
  }

  .info-panel {
    background: #020617;
    border: 1px solid #0061ff;
    border-radius: 12px;
    padding: 16px;
    margin-top: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    line-height: 1.8;
  }

  .mnist-grid {
    display: grid;
    grid-template-columns: repeat(28, 1fr);
    gap: 1px;
    width: 200px;
    height: 200px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .mnist-pixel {
    width: 100%;
    height: 100%;
  }

  .note-box {
    background: #1a1a08;
    border: 1px solid #b45309;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 0.83rem;
    color: #fbbf24;
    margin-top: 12px;
    font-family: 'JetBrains Mono', monospace;
  }

  .section-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #475569;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 12px;
  }
`;

// Simple pseudo-random MNIST-like digit
function generateDigit(digit) {
  const grid = Array(28).fill(null).map(() => Array(28).fill(0));
  // Simple patterns
  const center = [14, 14];
  for (let r = 0; r < 28; r++) {
    for (let c = 0; c < 28; c++) {
      const dist = Math.sqrt((r - center[0]) ** 2 + (c - center[1]) ** 2);
      if (dist > 6 && dist < 10) grid[r][c] = 200 + Math.floor(Math.random() * 55);
    }
  }
  return grid;
}

// Layer definitions for LeNet-like architecture on MNIST
const NETWORK = [
  {
    type: "conv",
    name: "Conv1",
    detail: "Input: 1×28×28 | Filters: 6 | K: 5×5 | Stride: 1 | Pad: 0",
    outputSize: "6×24×24",
    paramsCalc: "(5×5×1 + 1) × 6 = 156",
    params: 156,
    color: "#60efff",
    bg: "#1e3a5f",
  },
  {
    type: "pool",
    name: "Pool1",
    detail: "Input: 6×24×24 | K: 2×2 | Stride: 2 | MaxPool",
    outputSize: "6×12×12",
    paramsCalc: "0 (no learnable params)",
    params: 0,
    color: "#4ade80",
    bg: "#1a2f1a",
  },
  {
    type: "conv",
    name: "Conv2",
    detail: "Input: 6×12×12 | Filters: 16 | K: 5×5 | Stride: 1 | Pad: 0",
    outputSize: "16×8×8",
    paramsCalc: "(5×5×6 + 1) × 16 = 2416",
    params: 2416,
    color: "#60efff",
    bg: "#1e3a5f",
  },
  {
    type: "pool",
    name: "Pool2",
    detail: "Input: 16×8×8 | K: 2×2 | Stride: 2 | MaxPool",
    outputSize: "16×4×4",
    paramsCalc: "0 (no learnable params)",
    params: 0,
    color: "#4ade80",
    bg: "#1a2f1a",
  },
  {
    type: "flat",
    name: "Flatten",
    detail: "Input: 16×4×4 = 256 values",
    outputSize: "256",
    paramsCalc: "0",
    params: 0,
    color: "#fbbf24",
    bg: "#2d2008",
  },
  {
    type: "fc",
    name: "FC1",
    detail: "Input: 256 | Output: 120",
    outputSize: "120",
    paramsCalc: "(256 + 1) × 120 = 30840",
    params: 30840,
    color: "#c084fc",
    bg: "#2d1f47",
  },
  {
    type: "fc",
    name: "FC2",
    detail: "Input: 120 | Output: 84",
    outputSize: "84",
    paramsCalc: "(120 + 1) × 84 = 10164",
    params: 10164,
    color: "#c084fc",
    bg: "#2d1f47",
  },
  {
    type: "fc",
    name: "Output",
    detail: "Input: 84 | Output: 10 (digits 0–9)",
    outputSize: "10",
    paramsCalc: "(84 + 1) × 10 = 850",
    params: 850,
    color: "#f87171",
    bg: "#2d1010",
  },
];

const TOTAL_PARAMS = NETWORK.reduce((s, l) => s + l.params, 0);

function calcConvOutput(W, K, P, S) {
  return Math.floor((W - K + 2 * P) / S) + 1;
}

function calcParams(K, C_in, C_out, bias) {
  return (K * K * C_in + (bias ? 1 : 0)) * C_out;
}

export default function App() {
  const [tab, setTab] = useState("arch");
  const [selected, setSelected] = useState(null);
  const [calc, setCalc] = useState({
    type: "conv",
    W: 28, K: 5, P: 0, S: 1, C_in: 1, C_out: 6, bias: true,
    pool_W: 24, pool_K: 2, pool_S: 2,
    fc_in: 256, fc_out: 120, fc_bias: true,
  });

  const convOut = calcConvOutput(Number(calc.W), Number(calc.K), Number(calc.P), Number(calc.S));
  const convParams = calcParams(Number(calc.K), Number(calc.C_in), Number(calc.C_out), calc.bias);
  const poolOut = calcConvOutput(Number(calc.pool_W), Number(calc.pool_K), 0, Number(calc.pool_S));
  const fcParams = (Number(calc.fc_in) + (calc.fc_bias ? 1 : 0)) * Number(calc.fc_out);

  const digit = generateDigit(3);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="hero">
          <h1>⚡ CNN on MNIST</h1>
          <p>Parameters · Output Sizes · Bias · Architecture · Interactive Calculator</p>
        </div>

        <div className="tabs">
          {["arch","layers","formulas","calculator"].map(t => (
            <button key={t} className={`tab ${tab===t?"active":""}`} onClick={() => setTab(t)}>
              {t === "arch" ? "🏗 Architecture" : t === "layers" ? "📋 Layer Details" : t === "formulas" ? "📐 Formulas" : "🧮 Calculator"}
            </button>
          ))}
        </div>

        {tab === "arch" && (
          <>
            <div className="card">
              <h2>🏗 LeNet-like CNN — Architecture Overview</h2>
              <div style={{overflowX:"auto"}}>
                <div className="arch-viz">
                  {/* Input */}
                  <div className="arch-block" onClick={() => setSelected("input")}>
                    <div className="arch-box" style={{width:50,height:70,background:"#1a1a2e",border:"1px solid #334155",color:"#64748b"}}>
                      28×28
                    </div>
                    <div className="arch-label">Input<br/>MNIST</div>
                  </div>
                  {NETWORK.map((layer, i) => (
                    <div key={i} style={{display:"flex",alignItems:"center"}}>
                      <div className="arch-arrow">→</div>
                      <div className="arch-block" onClick={() => setSelected(i)}>
                        <div className="arch-box" style={{
                          width: layer.type==="flat" ? 20 : layer.type==="fc" ? 30 : 60,
                          height: layer.type==="flat" ? 70 : layer.type==="pool" ? 50 : layer.type==="fc" ? 70 : 65,
                          background: layer.bg,
                          border: `1px solid ${layer.color}`,
                          color: layer.color,
                        }}>
                          {layer.name}
                        </div>
                        <div className="arch-label">{layer.outputSize}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {selected !== null && selected !== "input" && (
                <div className="info-panel">
                  <span className="highlight">[{NETWORK[selected].name}]</span><br/>
                  <span className="yellow">Detail: </span>{NETWORK[selected].detail}<br/>
                  <span className="yellow">Output: </span><span className="green">{NETWORK[selected].outputSize}</span><br/>
                  <span className="yellow">Params: </span><span className="purple">{NETWORK[selected].paramsCalc}</span><br/>
                  <span className="yellow">Count:  </span><span className="red">{NETWORK[selected].params.toLocaleString()}</span>
                </div>
              )}
              {selected === "input" && (
                <div className="info-panel">
                  <span className="highlight">[Input]</span> MNIST grayscale image — 28×28 pixels, 1 channel<br/>
                  Each pixel value ∈ [0, 255], normalized to [0, 1]
                </div>
              )}
            </div>
            <div className="grid2">
              <div className="card" style={{textAlign:"center"}}>
                <div className="total-box">
                  <div className="num">{TOTAL_PARAMS.toLocaleString()}</div>
                  <div className="label">Total Trainable Parameters</div>
                </div>
              </div>
              <div className="card">
                <h2>📊 Param Breakdown</h2>
                {NETWORK.filter(l=>l.params>0).map((l,i) => (
                  <div key={i} className="result-row">
                    <span className="rkey">{l.name}</span>
                    <span className="rval" style={{color:l.color}}>{l.params.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "layers" && (
          <div className="card">
            <h2>📋 Every Layer Explained</h2>
            {NETWORK.map((layer, i) => (
              <div className="layer-row" key={i}>
                <span className={`layer-badge badge-${layer.type}`}>{layer.type.toUpperCase()}</span>
                <div className="layer-info">
                  <div className="title">{layer.name}</div>
                  <div className="detail">{layer.detail}</div>
                  <div className="detail">Output size: <span className="green">{layer.outputSize}</span></div>
                  <div className="params">Params = {layer.paramsCalc} = <span style={{color:"#f87171"}}>{layer.params.toLocaleString()}</span></div>
                </div>
              </div>
            ))}
            <div className="note-box">
              ⚠ Pooling layers have ZERO parameters — they just compute max or average, no weights to learn.
            </div>
          </div>
        )}

        {tab === "formulas" && (
          <div>
            <div className="card">
              <h2>📐 Conv Output Size</h2>
              <div className="formula">
                Output = ⌊ (W − K + 2P) / S ⌋ + 1<br/><br/>
                <span className="highlight">W</span> = input size (height or width)<br/>
                <span className="highlight">K</span> = kernel/filter size<br/>
                <span className="highlight">P</span> = padding<br/>
                <span className="highlight">S</span> = stride<br/>
                <span className="yellow">⌊ ⌋</span> = FLOOR (if fraction → round DOWN)
              </div>
              <div className="note-box">
                🔑 If the result has a decimal → always take the FLOOR (round down). Never round up. Example: (28 - 5 + 0) / 1 + 1 = 24 ✓
              </div>
              <div className="formula" style={{marginTop:16}}>
                Example: Conv1 on MNIST<br/>
                W=28, K=5, P=0, S=1<br/>
                Output = ⌊(28 − 5 + 0) / 1⌋ + 1 = <span className="green">24</span>
              </div>
            </div>

            <div className="card">
              <h2>📐 Pooling Output Size</h2>
              <div className="formula">
                Output = ⌊ (W − K) / S ⌋ + 1<br/><br/>
                (Same formula as conv, padding=0 for standard pooling)<br/><br/>
                Example: Pool1 after Conv1<br/>
                W=24, K=2, S=2<br/>
                Output = ⌊(24 − 2) / 2⌋ + 1 = <span className="green">12</span>
              </div>
            </div>

            <div className="grid2">
              <div className="card">
                <h2>📐 Conv Parameters</h2>
                <div className="formula">
                  Params = (K × K × C_in + bias) × C_out<br/><br/>
                  <span className="highlight">K×K</span>   = kernel spatial size<br/>
                  <span className="highlight">C_in</span>  = input channels<br/>
                  <span className="highlight">C_out</span> = number of filters<br/>
                  <span className="yellow">bias</span>  = 1 per filter (if used)<br/><br/>
                  <span className="green">With bias:</span>  (K²×C_in + 1) × C_out<br/>
                  <span className="red">Without bias:</span> (K²×C_in)     × C_out
                </div>
              </div>
              <div className="card">
                <h2>📐 FC Parameters</h2>
                <div className="formula">
                  Params = (N_in + bias) × N_out<br/><br/>
                  <span className="highlight">N_in</span>  = input neurons<br/>
                  <span className="highlight">N_out</span> = output neurons<br/>
                  <span className="yellow">bias</span>  = 1 per output neuron<br/><br/>
                  <span className="green">With bias:</span>  (N_in + 1) × N_out<br/>
                  <span className="red">Without bias:</span>  N_in × N_out<br/><br/>
                  FC1: (256+1)×120 = <span className="green">30,840</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>🔑 Key Rules</h2>
              <div className="formula">
                1. <span className="yellow">Bias IS usually included</span> in parameter count unless stated otherwise<br/>
                   Each filter/neuron gets +1 bias → adds C_out or N_out params total<br/><br/>
                2. <span className="yellow">Output fraction → FLOOR always</span><br/>
                   (W - K + 2P) / S = 2.5 → output = 2, not 3<br/><br/>
                3. <span className="yellow">Pooling has ZERO parameters</span> (max/avg — no weights)<br/><br/>
                4. <span className="yellow">Flatten has ZERO parameters</span> (just reshapes)<br/><br/>
                5. <span className="yellow">Same formula for H and W</span> when square inputs<br/><br/>
                6. <span className="yellow">Total params</span> = sum of all layer params (usually bias=True)
              </div>
            </div>
          </div>
        )}

        {tab === "calculator" && (
          <div>
            <div className="card">
              <h2>🧮 Conv Layer Calculator</h2>
              <div className="calc-grid">
                {[
                  ["W", "Input Size (W)", calc.W],
                  ["K", "Kernel Size (K)", calc.K],
                  ["P", "Padding (P)", calc.P],
                  ["S", "Stride (S)", calc.S],
                  ["C_in", "Input Channels", calc.C_in],
                  ["C_out", "Num Filters", calc.C_out],
                ].map(([key, label, val]) => (
                  <div className="input-group" key={key}>
                    <label>{label}</label>
                    <input type="number" min="1" value={val}
                      onChange={e => setCalc(c => ({...c, [key]: e.target.value}))} />
                  </div>
                ))}
                <div className="input-group">
                  <label>Include Bias?</label>
                  <select value={calc.bias ? "yes" : "no"} onChange={e => setCalc(c => ({...c, bias: e.target.value==="yes"}))}>
                    <option value="yes">Yes (+1 per filter)</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className="result-box">
                <div className="result-row">
                  <span className="rkey">Output spatial size</span>
                  <span className="rval green">⌊({calc.W} - {calc.K} + 2×{calc.P}) / {calc.S}⌋ + 1 = {convOut}</span>
                </div>
                <div className="result-row">
                  <span className="rkey">Output volume</span>
                  <span className="rval highlight">{calc.C_out} × {convOut} × {convOut}</span>
                </div>
                <div className="result-row">
                  <span className="rkey">Parameters</span>
                  <span className="rval yellow">({calc.K}×{calc.K}×{calc.C_in} {calc.bias?`+ 1`:``}) × {calc.C_out} = {convParams.toLocaleString()}</span>
                </div>
                {((Number(calc.W) - Number(calc.K) + 2*Number(calc.P)) % Number(calc.S) !== 0) && (
                  <div className="result-row">
                    <span className="rkey" style={{color:"#f87171"}}>⚠ Fractional result</span>
                    <span className="rval red">→ FLOOR applied</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h2>🧮 Pooling Layer Calculator</h2>
              <div className="calc-grid">
                {[
                  ["pool_W", "Input Size", calc.pool_W],
                  ["pool_K", "Pool Size (K)", calc.pool_K],
                  ["pool_S", "Stride (S)", calc.pool_S],
                ].map(([key, label, val]) => (
                  <div className="input-group" key={key}>
                    <label>{label}</label>
                    <input type="number" min="1" value={val}
                      onChange={e => setCalc(c => ({...c, [key]: e.target.value}))} />
                  </div>
                ))}
              </div>
              <div className="result-box">
                <div className="result-row">
                  <span className="rkey">Output size</span>
                  <span className="rval green">⌊({calc.pool_W} - {calc.pool_K}) / {calc.pool_S}⌋ + 1 = {poolOut}</span>
                </div>
                <div className="result-row">
                  <span className="rkey">Parameters</span>
                  <span className="rval purple">0 (no learnable params)</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>🧮 Fully Connected Calculator</h2>
              <div className="calc-grid">
                {[
                  ["fc_in", "Input neurons", calc.fc_in],
                  ["fc_out", "Output neurons", calc.fc_out],
                ].map(([key, label, val]) => (
                  <div className="input-group" key={key}>
                    <label>{label}</label>
                    <input type="number" min="1" value={val}
                      onChange={e => setCalc(c => ({...c, [key]: e.target.value}))} />
                  </div>
                ))}
                <div className="input-group">
                  <label>Include Bias?</label>
                  <select value={calc.fc_bias ? "yes" : "no"} onChange={e => setCalc(c => ({...c, fc_bias: e.target.value==="yes"}))}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className="result-box">
                <div className="result-row">
                  <span className="rkey">Parameters</span>
                  <span className="rval yellow">({calc.fc_in} {calc.fc_bias?`+ 1`:``}) × {calc.fc_out} = {fcParams.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
