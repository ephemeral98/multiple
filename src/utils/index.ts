/**
 * 获取具名插槽
 */
export const getSlot = (props: { children: React.ReactNode }) => {
  const children = Array.isArray(props.children) ? props.children : [props.children];
  const slots = children.reduce((slots, item) => {
    slots[item?.props?.slot] = item;
    return slots;
  }, {});
  return slots;
};

/**
 * 判断是否客户端; true是
 */
export const isClient = () => {
  return typeof window !== 'undefined';
};

/**
 * 睡眠函数
 */
export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * 获取随机数
 * @param min 最小值
 * @param max 最大值
 */
export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * 将数组的某一项移动到最后
 * @param queue
 * @param inx
 * @returns
 */
export const turnToLastQueue = <T>(queue: T[], inx: number): T[] => {
  const arr = [...queue];
  const item = arr.splice(inx, 1)[0];
  arr.push(item);
  return arr;
};

// 将数组的两个索引互换位置
export const swapQueue = <T>(queue: T[], inx1: number, inx2: number): T[] => {
  const arr = [...queue];
  const item1 = arr[inx1];
  const item2 = arr[inx2];
  arr[inx1] = item2;
  arr[inx2] = item1;
  return arr;
};

/**
 * 地址略写
 * @param str 全地址
 * @param frontLen 前面多少颗星星
 * @param endLen 结尾多少个星星
 */
export function plusStar(str: string, frontLen: number, endLen: number) {
  if (str?.length === undefined) return '';
  var len = str.length - frontLen - endLen;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing = '****';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}
