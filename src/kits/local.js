export const KEY = 'goodsInfo';
export let obj = { index: 0, num: 0, id: 0 };

export function setItem(value) {
    var jsonData = localStorage.getItem(KEY); //先得到本地存储数据
    var arr = JSON.parse(jsonData) || [];
    arr.push(value);
    localStorage.setItem(KEY, JSON.stringify(arr)); //存储格式为数组
};

export function getItem() {
    var jsonData = localStorage.getItem(KEY);
    var arr = JSON.parse(jsonData) || [];
    //console.log(arr);
    return arr;
};

export function getObj() {
    //获得数据
    var arr = getItem();
    var obj = {};
    //遍历值
    for (var o of arr) {
        var key = o.id + o.index;
        if (!obj[key]) {
            obj[key] = o.num;
        } else {
            obj[key] = o.num + obj[key];
        }
    }

    return obj;
};

export function update(obj) {
    //console.log(obj);
    const count = 1;
    var arr = getItem();
    //console.log(arr);
    var id = obj.goodsId.substr(0, obj.goodsId.length - 1);
    var index = obj.goodsId.substr(obj.goodsId.length - 1);
    console.log(id, index);

    if (obj.type == 'add') {
        arr.push({ index: index, num: count, id: id });
        //console.log(arr);
    } else {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == id && arr[i].index == index) {
                if (arr[i].num > 1) {
                    arr[i].num -= count;
                    break;
                } else {
                    arr.splice(i, count);
                    break;
                }
            }
        }
    }
    localStorage.setItem(KEY, JSON.stringify(arr));
}


export function removeItem(res) {
    //console.log(res);
    var arr = getItem();
    var id = res.substr(0, res.length - 1);
    var index = res.substr(res.length - 1);
    console.log(id, index);

    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].index == index && arr[i].id == id) {
            arr.splice(i, 1);
        }
    }
    localStorage.setItem(KEY, JSON.stringify(arr));
}