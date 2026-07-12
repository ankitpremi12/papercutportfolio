/**
 * ─────────────────────────────────────────────
 * Lightweight HTML5 Canvas Particle Engine
 * ─────────────────────────────────────────────
 */

export interface Particle {
  x: number;      // Current X coordinate
  y: number;      // Current Y coordinate
  vx: number;     // Random drift velocity X
  vy: number;     // Random drift velocity Y
  tx: number;     // Target X percentage (0 to 1)
  ty: number;     // Target Y percentage (0 to 1)
  color: string;  // RGBA color string
  size: number;   // Visual size in px
  alpha: number;  // Current opacity
  targetAlpha: number; // Target opacity
}

// Simple Gaussian random generator
function gaussianRandom(mean = 0, std = 1) {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * std;
}

/**
 * Generates normalized target points (0 to 1) for a specific algorithm layout
 */
export function getAlgorithmTargets(type: string, count: number, palette: { primary: string; secondary: string; accent: string }) {
  const targets: { tx: number; ty: number; color: string; size: number }[] = [];

  switch (type) {
    // ─── STATISTICAL TESTING ───
    case "hypothesis-testing": {
      // Single bell curve with highlighted critical region
      for (let i = 0; i < count; i++) {
        const tx = 0.1 + (i / count) * 0.8;
        const mean = 0.5;
        const std = 0.15;
        const exponent = -Math.pow(tx - mean, 2) / (2 * Math.pow(std, 2));
        const ty = 0.8 - (Math.exp(exponent) * 0.6);
        const isCritical = tx > 0.75; // Right tail
        targets.push({
          tx,
          ty: Math.max(0.1, Math.min(ty, 0.9)),
          color: isCritical ? palette.accent : palette.primary,
          size: isCritical ? 3.5 : 2,
        });
      }
      break;
    }
    case "ab-testing": {
      // Dual overlapping curves (A and B)
      const half = Math.floor(count / 2);
      for (let i = 0; i < count; i++) {
        const isA = i < half;
        const tx = isA ? 0.1 + (i / half) * 0.6 : 0.3 + ((i - half) / (count - half)) * 0.6;
        const mean = isA ? 0.4 : 0.6;
        const std = 0.12;
        const exponent = -Math.pow(tx - mean, 2) / (2 * Math.pow(std, 2));
        const ty = 0.8 - (Math.exp(exponent) * 0.5);
        targets.push({
          tx, ty: Math.max(0.1, Math.min(ty, 0.9)),
          color: isA ? palette.primary : palette.secondary,
          size: 2.5,
        });
      }
      break;
    }
    case "t-test": {
      // Two distinct grouped scatter plots separated horizontally
      const half = Math.floor(count / 2);
      for (let i = 0; i < count; i++) {
        const isLeft = i < half;
        targets.push({
          tx: (isLeft ? 0.25 : 0.75) + gaussianRandom(0, 0.08),
          ty: 0.5 + gaussianRandom(0, 0.15),
          color: isLeft ? palette.primary : palette.accent,
          size: Math.random() * 2 + 2,
        });
      }
      break;
    }
    case "anova": {
      // Three grouped scatter plots
      const third = Math.floor(count / 3);
      for (let i = 0; i < count; i++) {
        const group = Math.floor(i / third);
        const cx = group === 0 ? 0.2 : group === 1 ? 0.5 : 0.8;
        targets.push({
          tx: cx + gaussianRandom(0, 0.06),
          ty: 0.5 + gaussianRandom(0, 0.1),
          color: group === 0 ? palette.primary : group === 1 ? palette.secondary : palette.accent,
          size: 2.5,
        });
      }
      break;
    }
    case "chi-square": {
      // Grid matrix structure
      const cols = 4;
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        targets.push({
          tx: 0.25 + col * 0.18 + gaussianRandom(0, 0.01),
          ty: 0.2 + row * 0.08 + gaussianRandom(0, 0.01),
          color: col === 1 && row === 2 ? palette.accent : palette.primary,
          size: 3,
        });
      }
      break;
    }

    // ─── RELATIONSHIP & PREDICTION ───
    case "linear-regression": {
      // Diagonal line
      for (let i = 0; i < count; i++) {
        const tx = 0.15 + (i / count) * 0.7;
        const ty = 0.85 - tx * 0.7 + gaussianRandom(0, 0.05); // slight noise
        targets.push({
          tx,
          ty,
          color: i % 3 === 0 ? palette.accent : palette.primary,
          size: i % 3 === 0 ? 3.5 : 2,
        });
      }
      break;
    }
    case "correlation-analysis": {
      // Wider diagonal scatter
      for (let i = 0; i < count; i++) {
        const tx = 0.1 + (i / count) * 0.8;
        const ty = 0.9 - tx * 0.8 + gaussianRandom(0, 0.15); // wider spread
        targets.push({
          tx, ty,
          color: palette.secondary,
          size: 2.5,
        });
      }
      break;
    }
    case "logistic-regression": {
      // S-curve
      for (let i = 0; i < count; i++) {
        const tx = 0.1 + (i / count) * 0.8;
        const sigmoid = 1 / (1 + Math.exp(-12 * (tx - 0.5)));
        const ty = 0.8 - sigmoid * 0.6 + gaussianRandom(0, 0.02);
        targets.push({
          tx, ty,
          color: tx > 0.5 ? palette.accent : palette.secondary,
          size: 3,
        });
      }
      break;
    }
    case "multivariate-regression": {
      // Parallel lines
      for (let i = 0; i < count; i++) {
        const lineIdx = i % 3;
        const tx = 0.2 + ((i / count) * 0.6);
        const ty = 0.25 + lineIdx * 0.2 + tx * 0.2;
        targets.push({
          tx, ty,
          color: lineIdx === 0 ? palette.primary : lineIdx === 1 ? palette.secondary : palette.accent,
          size: 2.5,
        });
      }
      break;
    }

    // ─── CLASSIFICATION & TREES ───
    case "decision-trees": {
      // Tree hierarchical nodes: Root -> Left/Right splits -> Leaves
      const rootX = 0.5, rootY = 0.15;
      const nodes = [
        { x: rootX, y: rootY, col: palette.accent }, // Root
        { x: 0.3, y: 0.35, col: palette.primary },   // Left Split
        { x: 0.7, y: 0.35, col: palette.secondary }, // Right Split
        { x: 0.15, y: 0.65, col: palette.primary },  // Leaf L1
        { x: 0.45, y: 0.65, col: palette.primary },  // Leaf L2
        { x: 0.6, y: 0.65, col: palette.secondary }, // Leaf R1
        { x: 0.85, y: 0.65, col: palette.secondary }  // Leaf R2
      ];

      for (let i = 0; i < count; i++) {
        const node = nodes[i % nodes.length];
        targets.push({
          tx: node.x + gaussianRandom(0, 0.02),
          ty: node.y + gaussianRandom(0, 0.02),
          color: node.col,
          size: 3.5,
        });
      }
      break;
    }
    case "random-forest": {
      // Forest of 3 mini trees side by side
      const nodes = [
        // Tree 1
        { x: 0.2, y: 0.25, col: palette.primary },
        { x: 0.1, y: 0.6, col: palette.primary },
        { x: 0.3, y: 0.6, col: palette.primary },
        // Tree 2
        { x: 0.5, y: 0.2, col: palette.accent },
        { x: 0.4, y: 0.55, col: palette.accent },
        { x: 0.6, y: 0.55, col: palette.accent },
        // Tree 3
        { x: 0.8, y: 0.25, col: palette.secondary },
        { x: 0.7, y: 0.6, col: palette.secondary },
        { x: 0.9, y: 0.6, col: palette.secondary }
      ];
      for (let i = 0; i < count; i++) {
        const node = nodes[i % nodes.length];
        targets.push({
          tx: node.x + gaussianRandom(0, 0.03),
          ty: node.y + gaussianRandom(0, 0.03),
          color: node.col,
          size: 3,
        });
      }
      break;
    }
    case "isolation-forest": {
      // Tree layout where one path goes way down to an isolated leaf, highlighted in accent
      const nodes = [
        { x: 0.5, y: 0.15, col: palette.primary },
        { x: 0.3, y: 0.35, col: palette.primary },
        { x: 0.2, y: 0.55, col: palette.primary },
        { x: 0.4, y: 0.55, col: palette.primary },
        { x: 0.7, y: 0.4, col: palette.primary },
        { x: 0.85, y: 0.8, col: palette.accent } // Extremely isolated path anomaly
      ];
      for (let i = 0; i < count; i++) {
        const node = nodes[i % nodes.length];
        targets.push({
          tx: node.x + gaussianRandom(0, 0.02),
          ty: node.y + gaussianRandom(0, 0.02),
          color: node.col,
          size: node.col === palette.accent ? 5 : 3.5,
        });
      }
      break;
    }
    case "knn": {
      // Centroid surrounded by nearest neighbor circle boundary
      for (let i = 0; i < count; i++) {
        if (i === 0) {
          targets.push({ tx: 0.5, ty: 0.5, color: palette.accent, size: 5 });
        } else {
          const angle = (i / (count - 1)) * Math.PI * 2;
          const radius = i < count * 0.4 ? 0.15 : 0.35; // clustered inside or outside
          targets.push({
            tx: 0.5 + Math.cos(angle) * radius + gaussianRandom(0, 0.02),
            ty: 0.5 + Math.sin(angle) * radius + gaussianRandom(0, 0.02),
            color: radius < 0.2 ? palette.primary : "rgba(255,255,255,0.2)",
            size: 2.5,
          });
        }
      }
      break;
    }
    case "naive-bayes": {
      // Two distinct clouds separated by a boundary line
      for (let i = 0; i < count; i++) {
        const isLeft = i % 2 === 0;
        targets.push({
          tx: (isLeft ? 0.3 : 0.7) + gaussianRandom(0, 0.1),
          ty: (isLeft ? 0.4 : 0.6) + gaussianRandom(0, 0.1),
          color: isLeft ? palette.primary : palette.secondary,
          size: 3,
        });
      }
      break;
    }

    // ─── CLUSTERING & SEGMENTATION ───
    case "kmeans": {
      // 3 distinct cluster groups
      const centroids = [
        { cx: 0.25, cy: 0.35, col: palette.primary },
        { cx: 0.5, cy: 0.7, col: palette.secondary },
        { cx: 0.75, cy: 0.35, col: palette.accent }
      ];
      for (let i = 0; i < count; i++) {
        const c = centroids[i % 3];
        targets.push({
          tx: c.cx + gaussianRandom(0, 0.06),
          ty: c.cy + gaussianRandom(0, 0.06),
          color: c.col,
          size: Math.random() * 2 + 2,
        });
      }
      break;
    }
    case "hierarchical-clustering": {
      // Dendrogram structure
      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / 10);
        const col = i % 10;
        targets.push({
          tx: 0.1 + (col / 9) * 0.8,
          ty: 0.8 - (row * 0.15),
          color: row === 2 ? palette.accent : palette.primary,
          size: 2.5,
        });
      }
      break;
    }
    case "rfm": {
      // 3 horizontal bands
      for (let i = 0; i < count; i++) {
        const band = i % 3;
        targets.push({
          tx: 0.1 + Math.random() * 0.8,
          ty: 0.2 + band * 0.25 + gaussianRandom(0, 0.05),
          color: band === 0 ? palette.accent : band === 1 ? palette.secondary : palette.primary,
          size: 3,
        });
      }
      break;
    }

    // ─── TIME SERIES & FORECASTING ───
    case "moving-average": {
      // Smooth sine wave
      for (let i = 0; i < count; i++) {
        const tx = 0.1 + (i / count) * 0.8;
        const ty = 0.5 + Math.sin(tx * 12) * 0.2;
        targets.push({
          tx, ty,
          color: palette.primary,
          size: 3,
        });
      }
      break;
    }
    case "exponential-smoothing": {
      // Wave that dampens
      for (let i = 0; i < count; i++) {
        const tx = 0.1 + (i / count) * 0.8;
        const dampening = Math.max(0, 1 - tx * 1.5);
        const ty = 0.5 + Math.sin(tx * 15) * 0.3 * dampening;
        targets.push({
          tx, ty,
          color: palette.secondary,
          size: 2.5,
        });
      }
      break;
    }
    case "arima": {
      // Noisy historical wave extending to forecast projection cone
      for (let i = 0; i < count; i++) {
        const tx = 0.1 + (i / count) * 0.8;
        const isForecast = tx > 0.65;
        const baseWave = 0.5 + Math.sin(tx * 12) * 0.15 + Math.cos(tx * 4) * 0.1;
        let ty = baseWave;
        if (isForecast) {
          const uncertainty = (tx - 0.65) * 0.4;
          ty += gaussianRandom(0, uncertainty);
        }
        targets.push({
          tx, ty: Math.max(0.1, Math.min(ty, 0.9)),
          color: isForecast ? palette.accent : palette.primary,
          size: isForecast ? 3.5 : 2,
        });
      }
      break;
    }
    case "trend-decomposition": {
      // 3 parallel stacked waves
      for (let i = 0; i < count; i++) {
        const waveIdx = i % 3;
        const tx = 0.1 + (i / count) * 0.8;
        const baseWave = Math.sin(tx * 10) * 0.05;
        targets.push({
          tx,
          ty: 0.25 + waveIdx * 0.25 + baseWave,
          color: waveIdx === 0 ? palette.primary : waveIdx === 1 ? palette.secondary : palette.accent,
          size: 2,
        });
      }
      break;
    }

    // ─── OPTIMIZATION & ANOMALIES ───
    case "pca": {
      // Principal axes layout
      const half = Math.floor(count / 2);
      for (let i = 0; i < count; i++) {
        const isAxis1 = i < half;
        const progress = isAxis1 ? (i / half) : ((i - half) / (count - half));
        const offset = (progress - 0.5) * 0.6;
        const angle = isAxis1 ? (30 * Math.PI) / 180 : (120 * Math.PI) / 180;
        targets.push({
          tx: 0.5 + Math.cos(angle) * offset,
          ty: 0.45 + Math.sin(angle) * offset,
          color: isAxis1 ? palette.accent : palette.secondary,
          size: isAxis1 ? 3.5 : 2,
        });
      }
      break;
    }
    case "linear-programming": {
      // Feasible region polygon border points
      const corners = [
        { x: 0.25, y: 0.7 }, { x: 0.35, y: 0.3 }, { x: 0.65, y: 0.2 }, { x: 0.75, y: 0.7 }
      ];
      for (let i = 0; i < count; i++) {
        const sideIdx = i % corners.length;
        const nextIdx = (sideIdx + 1) % corners.length;
        const ratio = Math.random();
        targets.push({
          tx: corners[sideIdx].x + ratio * (corners[nextIdx].x - corners[sideIdx].x),
          ty: corners[sideIdx].y + ratio * (corners[nextIdx].y - corners[sideIdx].y),
          color: palette.accent,
          size: 3,
        });
      }
      break;
    }
    case "market-basket": {
      // Bipartite graph node clusters matching links
      const half = Math.floor(count / 2);
      for (let i = 0; i < count; i++) {
        const isLeft = i < half;
        const progress = isLeft ? (i / half) : ((i - half) / (count - half));
        targets.push({
          tx: isLeft ? 0.25 : 0.75,
          ty: 0.15 + progress * 0.6,
          color: isLeft ? palette.primary : palette.secondary,
          size: 4,
        });
      }
      break;
    }
    case "collaborative-filtering": {
      // User-item sparse grid matrix representing collaborative recommendation cells
      const cols = 6;
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // Sparsity: randomly drop some cells to represent missing ratings
        const isRated = (col + row) % 3 !== 0;
        const isRecommended = col === 3 && row === 1;
        targets.push({
          tx: 0.2 + col * 0.12 + gaussianRandom(0, 0.005),
          ty: 0.2 + row * 0.1 + gaussianRandom(0, 0.005),
          color: isRecommended ? palette.accent : isRated ? palette.secondary : "rgba(255,255,255,0.03)",
          size: isRecommended ? 4.5 : isRated ? 2.5 : 1,
        });
      }
      break;
    }
    case "z-score": {
      // Single curve with isolated outlier points highlighted
      for (let i = 0; i < count; i++) {
        const tx = 0.1 + (i / count) * 0.8;
        const isAnomaly = tx < 0.2 || tx > 0.8;
        const mean = 0.5, std = 0.12;
        const exponent = -Math.pow(tx - mean, 2) / (2 * Math.pow(std, 2));
        const baseHeight = 0.75 - (Math.exp(exponent) * 0.45);
        const ty = isAnomaly ? baseHeight - 0.12 : baseHeight;
        targets.push({
          tx, ty,
          color: isAnomaly ? palette.accent : palette.primary,
          size: isAnomaly ? 4 : 2,
        });
      }
      break;
    }

    default: {
      // Default: random scattered points
      for (let i = 0; i < count; i++) {
        targets.push({
          tx: 0.1 + Math.random() * 0.8,
          ty: 0.1 + Math.random() * 0.8,
          color: palette.primary,
          size: Math.random() * 2 + 1.5,
        });
      }
    }
  }

  return targets;
}
