import React, { useState } from "react";
import CanvasGrid from "./CanvasGrid";

const WagnerFischer: React.FC = () => {
    const [word1, setWord1] = useState<string>("");
    const [word2, setWord2] = useState<string>("");

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Wagner–Fischer Algorithm
            </h2>
            <p className="text-lg text-gray-600 mb-8">
                Enter two words to compute their edit distance.
            </p>

            <div className="flex space-x-4 mb-6">
                <input
                    type="text"
                    value={word1}
                    onChange={(e) => setWord1(e.target.value)}
                    placeholder="Enter first word"
                    className="w-64 h-12 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <input
                    type="text"
                    value={word2}
                    onChange={(e) => setWord2(e.target.value)}
                    placeholder="Enter second word"
                    className="w-64 h-12 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            {/* Render the CanvasGrid component with the two input words */}
            <CanvasGrid word1={word1} word2={word2} />
        </div>
    );
};

export default WagnerFischer;
