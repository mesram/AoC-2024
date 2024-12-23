import { costMap, dirToDirCostMap, dirToDirMap, numberToDirMap } from "./shared";

let robot2CostMap = costMap(dirToDirMap, dirToDirCostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);
robot2CostMap = costMap(dirToDirMap, robot2CostMap);

let robot1CostMap = costMap(numberToDirMap, robot2CostMap);

let total = 0;
for await (const input of (console as any)) {
    let strs = [input];

    let prev = "A";
    let minLength = 0;
    for (const char of input) {
        minLength += robot1CostMap[prev + char];
        prev = char;
    }

    let num = parseInt(input, 10);
    console.log(input, num, minLength);
    total += num * minLength;
}
console.log(total);
