export class Tools {
    public static getRandomNum(min: number, max: number, excludeNum?: number[]) {
        var rand = Math.random();
        var range = max - min + 1;
        rand = min + Math.floor(rand * range);
        if (excludeNum) {
            if (excludeNum.length >= max - min + 1) {
                console.error("exclude numbers exceed the range");
            }
            else {
                let maxTestCount = 10000;
                for (var i = 0; i < maxTestCount; i++) {
                    if (excludeNum.indexOf(rand) < 0) {
                        break;
                    }
                    rand = Tools.getRandomNum(min, max);
                }
                if (i == maxTestCount) {
                    console.error("maximum test times reached");
                }
            }
        }
        return rand;
    }

    // 传入数组，返回乱序后的数组
    public static disorder(arr: any[]) {
        var n = arr.length;
        var a = Tools.getRandomArray(n, 0, n - 1);
        var newArr = [];
        for (var i = 0; i < n; i++) {
            newArr[i] = arr[a[i]];
        }
        return newArr;
    }

    public static getRandomArray(len: number, Min: number, Max: number, allowConflict?: boolean) {
        var num = new Array(len);
        var val;
        var isEqu = false;
        var testCount = 0;
        for (var i = 0; i < len; i++) {
            isEqu = false;
            val = this.getRandomNum(Min, Max);
            for (var j = 0; j < i; j++) {
                if (num[j] == val) {
                    isEqu = true;
                    break;
                }
            }
            if (!allowConflict && isEqu)
                i--;
            else
                num[i] = val;
            if (testCount++ > 10000) {
                console.log("Dead loop!");
                break;
            }
        }
        return num;
    }

    public static padLeadingZeros(number: number, length: number): string {
        let result = number.toString();
        while (result.length < length) {
            result = '0' + result;
        }
        return result;
    }
}