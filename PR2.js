// доп функції 
function generateMatrix(m, n, min, max) {
    const matrix = [];
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        matrix.push(row);
    }
    return matrix;
}

function printMatrix(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        console.log("Матриця порожня\n");
        return;
    }
    const m = matrix.length;
    const n = matrix[0].length;
    
    let header = "\t\t";
    for (let j = 0; j < n; j++) {
        header += `стовпець ${j + 1}\t`;
    }
    console.log(header);
    
    for (let i = 0; i < m; i++) {
        let rowStr = `рядок ${i + 1}\t`;
        for (let j = 0; j < n; j++) {
            let val = matrix[i][j];
            let formattedVal = Number.isInteger(val) ? val : val.toFixed(2);
            rowStr += `${formattedVal}\t\t`;
        }
        console.log(rowStr);
    }
    console.log("");
}


//1
function subtractRowMean(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j];
        }
        let mean = sum / matrix[i].length;
        
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] -= mean;
        }
    }
}

function shiftMatrix(matrix, k) {
    const m = matrix.length;
    if (m === 0) return;
    const n = matrix[0].length;
    const kRight = k % n;
    const kUp = k % m;
    
    if (kRight > 0) {
        for (let i = 0; i < m; i++) {
            const tail = matrix[i].splice(n - kRight, kRight);
            matrix[i].unshift(...tail);
        }
    }
    
    if (kUp > 0) {
        const head = matrix.splice(0, kUp);
        matrix.push(...head);
    }
}


//3

function removeMaxElements(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return;
    
    let maxVal = -Infinity;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > maxVal) maxVal = matrix[i][j];
        }
    }
    
    const rowsToDelete = new Set();
    const colsToDelete = new Set();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === maxVal) {
                rowsToDelete.add(i);
                colsToDelete.add(j);
            }
        }
    }
    
    const tempMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        if (!rowsToDelete.has(i)) {
            const newRow = [];
            for (let j = 0; j < matrix[i].length; j++) {
                if (!colsToDelete.has(j)) {
                    newRow.push(matrix[i][j]);
                }
            }
            tempMatrix.push(newRow);
        }
    }
    
    matrix.length = 0; 
    for (let row of tempMatrix) {
        if (row.length > 0) matrix.push(row);
    }
}

// 4
function rotateMatrix90(matrix) {
    const n = matrix.length;
    if (n === 0 || n !== matrix[0].length) {
        console.log("Помилка: In-place поворот реалізується для квадратних матриць (N x N).");
        return;
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

const cloneMatrix = (mat) => mat.map(row => [...row]);

console.log("СТВОРЕННЯ МАТРИЦІ");
const myMatrix = generateMatrix(4, 4, 1, 10);
printMatrix(myMatrix);

console.log("ЗАВДАННЯ 1: Віднімання середнього арифметичного");
const matrix1 = cloneMatrix(myMatrix);
subtractRowMean(matrix1);
printMatrix(matrix1);

console.log("ЗАВДАННЯ 2: Зсув вправо та догори на k=1");
const matrix2 = cloneMatrix(myMatrix);
shiftMatrix(matrix2, 1);
printMatrix(matrix2);

console.log("ЗАВДАННЯ 3: Видалення рядків/стовпців з макс. елементом");
const matrix3 = cloneMatrix(myMatrix);
removeMaxElements(matrix3);
printMatrix(matrix3);

console.log("ЗАВДАННЯ 4: In-place обертання на 90 градусів (транспонування)");
const matrix4 = cloneMatrix(myMatrix);
rotateMatrix90(matrix4);
printMatrix(matrix4);