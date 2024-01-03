var twoSum = function(nums, target) {
    let index1 = 0
    let index2 = 1
    for (let i = 0; i < nums.length; i++) {
        if (nums[index1] + nums[index2] != target) {
            index1++;
            index2++;
        } else {
            return [nums.indexOf(nums[index1]), nums.indexOf(nums[index2])]
            // if (nums[index1] == nums[index2]) {
                
            // } else {
            //     return [nums.indexOf(nums[index1]), nums.indexOf(nums[index2])]
            // }
        }
    } 
};

console.log(twoSum([3, 2, 3], 6));