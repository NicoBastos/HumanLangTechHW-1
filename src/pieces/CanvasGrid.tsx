import React, { useState } from "react";
import useCanvas from "../hooks/useCanvas";

interface CanvasGridProps {
    word1: string;
    word2: string;
}

const CanvasGrid: React.FC<CanvasGridProps> = ({ word1, word2 }) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const squareSize = 60; // Customize the size as needed
    const [selectedCell, setSelectedCell] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [explanation, setExplanation] = useState<string>("");

    // Use the custom hook to handle drawing logic and clicking on cells
    useCanvas(
        word1,
        word2,
        squareSize,
        canvasRef,
        selectedCell,
        setSelectedCell,
        setExplanation
    );

    return (
        <div className="flex flex-row justify-center items-start mt-8 space-x-8">
            {/* Canvas */}
            <div className="flex justify-center items-center">
                <canvas
                    ref={canvasRef}
                    width="700"
                    height="700"
                    className="border border-gray-400 rounded-lg shadow-lg"
                />
            </div>

            {/* Explanation to the right of the canvas */}
            <div className="w-80 bg-gray-100 p-4 rounded-lg shadow-md">
                {explanation ? (
                    <pre className="text-lg text-gray-700 whitespace-pre-wrap">
                        {explanation}
                    </pre>
                ) : (
                    <p className="text-lg text-gray-500">
                        Click a cell to see the explanation.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CanvasGrid;
