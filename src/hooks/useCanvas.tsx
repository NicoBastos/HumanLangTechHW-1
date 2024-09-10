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
        // Fill the square first
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, size, size);

        // Draw the border for the square
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2; // Standard border width
        ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1); // Stroke within bounds to avoid clipping

        // Draw the text in the center of the square
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(letter), x + size / 2, y + size / 2);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d") as CanvasContext;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const word1WithUnderscore = "_" + word1;
        const word2WithUnderscore = "_" + word2;

        const gridWidth = word1WithUnderscore.length * squareSize;
        const gridHeight = word2WithUnderscore.length * squareSize;

        // Calculate the starting point to center the grid
        const startX = (canvas.width - gridWidth) / 2;
        const startY = (canvas.height - gridHeight) / 2;

        const distances = wagnerFischer(word1, word2);

        // Draw grid and fill squares
        for (let i = 0; i < word1WithUnderscore.length; i++) {
            for (let j = 0; j < word2WithUnderscore.length; j++) {
                const x = startX + i * squareSize;
                const y = startY + j * squareSize;
                const fillColor =
                    i === word1WithUnderscore.length - 1 &&
                    j === word2WithUnderscore.length - 1
                        ? "#4CAF50"
                        : "white";

                // Draw the selected cell with a blue border
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

        // Draw word1 and word2 characters on the top and left
        for (let i = 0; i < word1WithUnderscore.length; i++) {
            const x = startX + i * squareSize;
            drawSquare(
                ctx,
                x,
                startY - squareSize,
                squareSize,
                word1WithUnderscore.charAt(i),
                "#808080"
            );
        }

        for (let j = 0; j < word2WithUnderscore.length; j++) {
            const y = startY + j * squareSize;
            drawSquare(
                ctx,
                startX - squareSize,
                y,
                squareSize,
                word2WithUnderscore.charAt(j),
                "#808080"
            );
        }

        // Add event listener for click
        const handleClick = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const col = Math.floor((x - startX) / squareSize);
            const row = Math.floor((y - startY) / squareSize);

            if (
                row >= 0 &&
                row < word2WithUnderscore.length &&
                col >= 0 &&
                col < word1WithUnderscore.length
            ) {
                setSelectedCell({ row, col });

                // Calculate explanation for the selected cell
                const current = distances[row][col];
                const add = row > 0 ? distances[row - 1][col] + 1 : "∞";
                const del = col > 0 ? distances[row][col - 1] + 1 : "∞";
                const change =
                    row > 0 && col > 0
                        ? distances[row - 1][col - 1] +
                          (word1[col - 1] !== word2[row - 1] ? 1 : 0)
                        : "∞";

                // Determine which operation was chosen by min()
                const explanation = `
                    Cell (${row}, ${col}): 
                    - Add (top): ${add}
                    - Delete (left): ${del}
                    - Change (top-left): ${change}
                             -> min(${add}, ${del}, ${change}) = ${current}
                `;
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
