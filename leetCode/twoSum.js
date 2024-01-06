var twoSum = function (nums, target) {
    let index1 = 0;
    let index2 = 1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[index1] + nums[index2] != target) {
            nums.forEach((iten, index) => {
                
            })
        } else {
            if (nums.indexOf(nums[index1]) == nums.indexOf(nums[index2])) {
                let indices = [];
                nums.filter(function (iten, index) {
                    if (iten == nums[index2]) {
                        indices.push(index);
                    }
                });
                return [nums.indexOf(nums[index1]), indices[1]];
            } else {
                return [nums.indexOf(nums[index1]), nums.indexOf(nums[index2])];
            }
        }
    }
};

console.log(twoSum([-1,-2,-3,-4,-5], -8));
