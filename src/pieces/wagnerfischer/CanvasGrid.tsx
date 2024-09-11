import React, { useEffect, useRef, useState } from "react";
import useCanvas from "../../hooks/useCanvas";

interface CanvasGridProps {
    word1: string;
    word2: string;
}

const CanvasGrid: React.FC<CanvasGridProps> = ({ word1, word2 }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const squareSize = 60; // Customize the size as needed based on grid cells
    const [selectedCell, setSelectedCell] = useState<{
        row: number;
        col: number;
    }>({ row: 0, col: 0 });
    const [explanation, setExplanation] = useState<string>("");

    // Calculate the width and height based on the words and square size
    const canvasWidth = (word1.length + 2) * squareSize; // +1 for the row that contains the word
    const canvasHeight = (word2.length + 2) * squareSize; // +1 for the column that contains the word

    // Hook to handle drawing and interactions with the canvas
    useCanvas(
        word1,
        word2,
        squareSize,
        canvasRef,
        selectedCell,
        setSelectedCell,
        setExplanation
    );

    useEffect(() => {
        // Resize the canvas to fit the words dynamically
        if (canvasRef.current) {
            canvasRef.current.width = canvasWidth;
            canvasRef.current.height = canvasHeight;
        }
    }, [canvasWidth, canvasHeight, word1, word2]);

    return (
        <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-8">
            {/* Canvas */}
            <div className="flex justify-center items-center max-w-full overflow-auto">
                <canvas
                    ref={canvasRef}
                    className="border border-gray-400 rounded-lg shadow-lg"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
            </div>

            {/* Explanation to the right of the canvas */}
            <div className="w-80 bg-gray-100 p-4 rounded-lg shadow-md overflow-auto">
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
