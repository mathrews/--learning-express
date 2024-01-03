let findMatrix = function (nums) {
    let array2D = [];

    while (nums.length > 0) {
        let distinct = nums.filter(
            (value, index, array) => array.indexOf(value) === index
        );

        array2D.push(distinct);

        let duplicates = nums.filter(
            (value, index, array) => array.indexOf(value) !== index
        );

        nums = duplicates; 

        if (duplicates.length === 0) {
            break; 
        }
    }

    return array2D;
};

console.log(findMatrix([9,8,8,4,9,8,8,3,9]));
