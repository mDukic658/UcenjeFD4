
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');
    const matrixContainer = document.getElementById('matrixContainer');

    function createCyclicalMatrix(rows, cols) {
        const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
        
        let num = 1;
        let maxNum = rows * cols;
        
        let top = 0;
        let bottom = rows - 1;
        let left = 0;
        let right = cols - 1;

        while (num <= maxNum) {
            for (let j = right; j >= left && num <= maxNum; j--) {
                matrix[bottom][j] = num++;
            }
            bottom--;

            for (let i = bottom; i >= top && num <= maxNum; i--) {
                matrix[i][left] = num++;
            }
            left++;

            for (let j = left; j <= right && num <= maxNum; j++) {
                matrix[top][j] = num++;
            }
            top++;

            for (let i = top; i <= bottom && num <= maxNum; i++) {
                matrix[i][right] = num++;
            }
            right--;
        }
        
        return matrix;
    }

    function renderMatrix(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        
        matrixContainer.innerHTML = '';
        
        matrixContainer.style.gridTemplateColumns = `repeat(${cols}, auto)`;
        matrixContainer.style.gridTemplateRows = `repeat(${rows}, auto)`;
        
        const totalCells = rows * cols;
        const cellsData = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cellValue = matrix[i][j];
                const cellEl = document.createElement('div');
                cellEl.classList.add('matrix-cell');
                cellEl.textContent = cellValue;
                
                matrixContainer.appendChild(cellEl);
                
                cellsData.push({
                    element: cellEl,
                    value: cellValue
                });
            }
        }
        
        cellsData.sort((a, b) => a.value - b.value);
        
        const delayPerCell = Math.max(60, Math.min(100, 1000 / totalCells));
        
        cellsData.forEach((cellData, index) => {
            setTimeout(() => {
                cellData.element.classList.add('animate-in');
            }, index * delayPerCell);
        });
    }

    function handleGenerate() {
        const rows = parseInt(rowsInput.value) || 5;
        const cols = parseInt(colsInput.value) || 5;
        
        const safeRows = Math.min(Math.max(rows, 1), 10);
        const safeCols = Math.min(Math.max(cols, 1), 10);
        
        if (rows !== safeRows) rowsInput.value = safeRows;
        if (cols !== safeCols) colsInput.value = safeCols;

        generateBtn.disabled = true;
        generateBtn.style.opacity = '0.7';
        
        const matrix = createCyclicalMatrix(safeRows, safeCols);
        renderMatrix(matrix);
        
        const animationTime = (safeRows * safeCols * Math.max(20, Math.min(100, 1000 / (safeRows * safeCols)))) + 500;
        setTimeout(() => {
            generateBtn.disabled = false;
            generateBtn.style.opacity = '1';
        }, animationTime);
    }

    // handleGenerate();

    generateBtn.addEventListener('click', handleGenerate);
});
