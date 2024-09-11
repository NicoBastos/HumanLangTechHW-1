import { useEffect } from "react";

interface CanvasContext extends CanvasRenderingContext2D {}

const useCanvas = (
    word1: string,
    word2: string,
    squareSize: number,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    selectedCell: { row: number; col: number } | null,
    setSelectedCell: (cell: { row: number; col: number }) => void,
    setExplanation: (text: string) => void
) => {
    const wagnerFischer = (s1: string, s2: string): number[][] => {
        let len_s1 = s1.length;
        let len_s2 = s2.length;

        const distances: number[][] = Array.from({ length: len_s2 + 1 }, () =>
            Array(len_s1 + 1).fill(0)
        );

        for (let i = 0; i <= len_s1; i++) distances[0][i] = i;
        for (let j = 0; j <= len_s2; j++) distances[j][0] = j;

        for (let i = 1; i <= len_s1; i++) {
            for (let j = 1; j <= len_s2; j++) {
                const add = distances[j - 1][i] + 1;
                const del = distances[j][i - 1] + 1;
                const change =
                    distances[j - 1][i - 1] + (s1[i - 1] !== s2[j - 1] ? 1 : 0);
                distances[j][i] = Math.min(add, del, change);
            }
        }
        return distances;
    };

    const drawSquare = (
        ctx: CanvasContext,
        x: number,
        y: number,
        size: number,
        letter: string | number,
        fillColor: string,
        borderColor: string = "black"
    ) => {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(letter), x + size / 2, y + size / 2);
    };

    useEffect(() => {
        if (!canvasRef.current) return; // Ensure the canvas is available and component has mounted
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const word1WithUnderscore = "_" + word1;
        const word2WithUnderscore = "_" + word2;

        const distances = wagnerFischer(word1, word2);

        // Draw the top row with word1 characters
        for (let i = 0; i < word1WithUnderscore.length; i++) {
            const x = (i + 1) * squareSize; // Offset by +1 for correct positioning
            const y = 0; // Top row
            const letter = i === 0 ? "" : word1[i - 1]; // First cell is empty
            drawSquare(ctx, x, y, squareSize, letter, "lightgray", "black");
        }

        // Draw the left column with word2 characters
        for (let j = 0; j < word2WithUnderscore.length; j++) {
            const x = 0; // Leftmost column
            const y = (j + 1) * squareSize; // Correct offset here
            const letter = j === 0 ? "" : word2[j - 1]; // First cell is empty
            drawSquare(ctx, x, y, squareSize, letter, "lightgray", "black");
        }

        // Draw the rest of the grid with distances, starting from (1, 1)
        for (let i = 0; i < word1.length + 1; i++) {
            for (let j = 0; j < word2.length + 1; j++) {
                const x = (i + 1) * squareSize; // Offset by 1 to account for the labels
                const y = (j + 1) * squareSize; // Offset by 1 to account for the labels

                const fillColor =
                    i === word1.length && j === word2.length
                        ? "#4CAF50"
                        : "white";
                const borderColor =
                    selectedCell &&
                    selectedCell.row === j &&
                    selectedCell.col === i
                        ? "#3B82F6"
                        : "black";

                drawSquare(
                    ctx,
                    x,
                    y,
                    squareSize,
                    distances[j][i],
                    fillColor,
                    borderColor
                );
            }
        }

        setSelectedCell({ row: 0, col: 0 });

        const handleClick = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const col = Math.floor(x / squareSize) - 1; // Adjust for offset
            const row = Math.floor(y / squareSize) - 1; // Adjust for offset

            if (
                row >= 0 &&
                row < word2.length + 1 &&
                col >= 0 &&
                col < word1.length + 1
            ) {
                setSelectedCell({ row, col });
                const current = distances[row][col];
                const add = row > 0 ? distances[row - 1][col] + 1 : "∞";
                const del = col > 0 ? distances[row][col - 1] + 1 : "∞";
                const change =
                    row > 0 && col > 0
                        ? distances[row - 1][col - 1] +
                          (word1[col - 1] !== word2[row - 1] ? 1 : 0)
                        : "∞";
                const explanation = `Cell (${row}, ${col}): \n- Add (top): ${add} \n- Delete (left): ${del} \n- Substitute (top-left): ${change} \n-> min(${add}, ${del}, ${change}) = ${current}`;
                setExplanation(explanation.trim());
            }
        };

        canvas.addEventListener("click", handleClick);
        return () => {
            canvas.removeEventListener("click", handleClick);
        };
    }, [word1, word2, squareSize, canvasRef, selectedCell]);
};

export default useCanvas;
