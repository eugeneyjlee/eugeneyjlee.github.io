function getRandomNum(max) {
    return Math.random() * max;
}

function averageThreeNumbers(a, b, c) {
    let sum = a + b + c;
    let average = sum / 3;
    return average;
}

function createSentence(num, noun) {
    let res = "On average, a Berkeley Student has " + num + " " + noun + "s";
    return res;
}
let x = getRandomNum(20);
let y = getRandomNum(10);
let z = getRandomNum(13);
let avg = averageThreeNumbers(x, y, z);
let sentence = createSentence(avg, "squirrel");
console.log(sentence);