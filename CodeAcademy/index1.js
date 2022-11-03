// A = [1, 2, 3, 10]
A = [-10, -9, -3, 0, 1, 2, 10]

function solution(A) {

    A.reduce(
        (previousValue, currentValue, currentIndex) => {
            let result = 0;
            console.log('previousValue ' + previousValue + " currentValue " + currentValue);
            if ((previousValue < 0) && (currentValue > 0)) {
                result = 1;
            } else
            if (currentValue - previousValue > 1) {
                result = previousValue + 1;
                console.log('current index ' + currentIndex + ' length ' + A.length);
            } else if (currentIndex == A.length - 1) {
                result = currentValue + 1;
            } else {
                result = currentValue;
                console.log('current index ' + currentIndex + ' length ' + A.length);
            }
            console.log('result ' + result);
            return result;
        }
    )
}

solution(A);