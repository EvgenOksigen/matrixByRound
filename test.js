const RESULT = []
const testFoo = (n) => {
    if (n <= 1) return console.log(`Insert number more then 1`);

    const size = 2 * n - 1;
    console.log(`Will be create matrix ${size}x${size} `);
    //====#TEST#---1---====
    // [3, 3, 3, 3, 3, 3, 3],
    // [3, 2, 2, 2, 2, 2, 3],
    // [3, 2, 1, 1, 1, 2, 3],
    // [3, 2, 1, 0, 1, 2, 3],
    // [3, 2, 1, 1, 1, 2, 3],
    // [3, 2, 2, 2, 2, 2, 3],
    // [3, 3, 3, 3, 3, 3, 3],

    //====#TEST#---2---====
    // [3, 3, 3, 3, 3, 3, 3],
    // [3, 3, 4, 5, 6, 7, 3],
    // [3, 2, 2, 3, 4, 8, 3],
    // [3, 1, 1, 0, 5, 9, 3],
    // [3, 16, 8, 7, 6, 10, 3],
    // [3, 15, 14, 13, 12, 11, 3],
    // [3, 3, 3, 3, 3, 3, 3],
    const matrix = []

    makeMatrixRandom(size, matrix)

    const centerRow = matrix[Math.floor((matrix.length / 2))] // or we can count second index as it => [Math.floor(matrix[Math.floor((matrix.length / 2))].length / 2)]
    const centerItem = centerRow[Math.floor((centerRow.length / 2))]

    matrix.forEach(el => {
        console.log(el)
    });
    console.log(`center element => ${centerItem}`);

    itterations(size, matrix)
    console.log(RESULT)
}
const itterations = (size, matrix, width = 3, c = 1, stepCount = 8, itterationCount = 0) => {
    stepCount = (8 * c)
    // console.log({ itterationCount, size, width, c });
    if (((stepCount / 4) - itterationCount) !== 2) {
        // console.log({ size, width, c, stepCount })
        // console.log('has exstra');
        itterationSteps(1, matrix, stepCount, itterationCount)
        if (size === width) {
            return
        }

    }

    if (((stepCount / 4) - itterationCount) === 2) {
        // console.log({ size, width, c, stepCount });
        // console.log('has not exstra');
        itterationSteps(0, matrix, stepCount, itterationCount)
        if (size === width) {
            return
        }
    }
    c++
    itterationCount++
    itterations(size, matrix, width + 2, c, stepCount, itterationCount)
}
const itterationSteps = (extra, matrix, stepCount, itterationCount) => {

    firstStepsWeight = stepCount / 4 - itterationCount;

    start_Y = Math.floor(matrix.length / 2)
    start_X = Math.floor(matrix[start_Y].length / 2) - itterationCount - 1
    // console.log({ start_Y, start_X });

    moveAround(firstStepsWeight, matrix, start_Y, start_X, itterationCount)
}
const moveAround = (firstStepsWeight, matrix, start_Y, start_X, itterationCount) => {
    // if we have extra - move up one more
    if (firstStepsWeight === 2) {
        let second_y
        let second_x
        let third_y
        let extra_x
        // move up

        for (let i = 0; i < firstStepsWeight; i++) {
            second_y = start_Y - i
            RESULT.push(matrix[start_Y - i][start_X]);
        }
        // move right

        for (let i = 0; i < firstStepsWeight; i++) {
            RESULT.push(matrix[second_y][start_X + i + 1])
            second_x = start_X + i + 1
        }
        // move down

        for (let i = 0; i < firstStepsWeight; i++) {
            third_y = second_y + i + 1
            RESULT.push(matrix[second_y + i + 1][second_x])
        }
        // move left

        for (let i = 0; i < firstStepsWeight; i++) {
            extra_x = second_x - 1 - i
            RESULT.push(matrix[third_y][second_x - 1 - i])
        }
    }

    if (itterationCount) {
        let second_y
        let second_x
        let third_y
        let extra_x
        for (let i = 0; i < firstStepsWeight; i++) {
            second_y = start_Y - i
            RESULT.push(matrix[start_Y - i][start_X]);
        }
        for (let i = 0; i < firstStepsWeight + itterationCount; i++) {
            RESULT.push(matrix[second_y][start_X + i + 1])
            second_x = start_X + i + 1
        }
        for (let i = 0; i < firstStepsWeight + itterationCount; i++) {
            third_y = second_y + i + 1
            RESULT.push(matrix[second_y + i + 1][second_x])
        }
        for (let i = 0; i < firstStepsWeight + itterationCount; i++) {
            extra_x = second_x - 1 - i
            RESULT.push(matrix[third_y][second_x - 1 - i])
        }
        //extra move up

        for (let i = 0; i < itterationCount; i++) {
            second_y = start_Y - i
            RESULT.push(matrix[third_y - i - 1][extra_x]);
        }
    }
    return RESULT
}
const makeMatrixRandom = (size, matrix = [], count = 0) => {
    if (size <= count) {
        return matrix
    }
    else {
        let str = [size]

        for (let i = 1; i < size; i++) {
            let random = Math.floor(Math.random() * (9 - 1) + 1)

            str.push(random)
        }
        matrix.push(str)
        makeMatrixRandom(size, matrix, count + 1);
    }
    return matrix
}

testFoo(2)
//============7 x 7========
// [7, 2, 1, 6, 3, 5, 6]
// [7, 2, 4, 3, 5, 3, 3]
// [7, 6, 4, 2, 3, 6, 1]
// [7, 6, 2, 7, 4, 7, 8]
// [7, 6, 7, 1, 1, 4, 6]
// [7, 3, 3, 7, 5, 6, 5]
// [7, 6, 8, 7, 1, 7, 3]