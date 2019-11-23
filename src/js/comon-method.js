/*
* 数组元素排列组合，
* 限：一维数组
* 注意：ab与ba是不同的，这两个分别算一组
*/
function stringPermutation(
  { arr, index, group } = { arr: [], index: 0, group: [] }
) {
    if(arr.length<=0){ return [];}
    let append_group = new Array();

    // 1、取出一个，并存入append_group
    let curr_code = arr[index];
    append_group.push(curr_code);
    // 3、组合（插入）并保存
    for (let i = 0; i < group.length; i++) {
        let temp_arr = group[i].replace(/\s/g, "").split("-"); //去除所有空格，拆分成数组
        for (let j = 0; j <= temp_arr.length; j++) {
        let temp2 = [];
        Object.assign(temp2, temp_arr);
        temp2.splice(j, 0, curr_code); //插入（将取出的那个插入）
        append_group.push(temp2.join("-")); //拼接成字符串并保存
        }
    }
    // 4、存入结果数组
    group.push.apply(group, append_group);
    // 5、去重
    group = _.uniq(group);

    if (index >= arr.length - 1) {
        // 符合条件的返回，并去掉链接符"-"，不符合条件的返回-1；
        return group
        .map(
            function(item) {
            let str = item;
            if (str.split("-").length == arr.length) {
                return item.replace(/-/g, "");
            } else {
                return -1;
            }
            }
            // 过滤，除掉-1
        )
        .filter(function(item) {
            return item != -1;
        });
    } else {
        index = index + 1;
        return stringPermutation({ arr, index, group });
    }
}

export { stringPermutation };
