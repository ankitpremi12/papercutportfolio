/* ─────────────────────────────────────────────
 * HandInkedTable — hand-drawn styled table
 * Marker font headers, wobbly rule lines
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";

interface HandInkedTableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

export default function HandInkedTable({
  headers,
  rows,
  className = "",
}: HandInkedTableProps) {
  return (
    <motion.div
      className={`bg-cream rounded-sm p-6 text-dark ${className}`}
      style={{
        rotate: -0.5,
        boxShadow: "var(--shadow-paper)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="font-[family-name:var(--font-caveat)] text-lg text-left pb-3 px-3 border-b-2 border-dark/20"
                  style={{
                    borderBottomStyle: "solid",
                    borderBottomColor: "rgba(11, 11, 14, 0.25)",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={rowIdx === 0 ? "bg-lime/20 font-semibold" : ""}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-3 py-2.5 text-sm border-b border-dark/10"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
