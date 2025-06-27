import { Converter } from 'opencc-js';

// 初始化轉換器
const converter = Converter({ from: 'cn', to: 'tw' });

/**
 * 將簡體中文轉換為繁體中文
 * @param text 要轉換的文字
 * @returns 轉換後的繁體中文
 */
export const convertToTraditional = (text: string): string => {
  if (!text) return '';
  try {
    return converter(text);
  } catch (error) {
    console.warn('OpenCC conversion failed:', error);
    return text; // 如果轉換失敗，返回原文
  }
};

/**
 * 批量轉換物件中的文字屬性
 * @param obj 要轉換的物件
 * @param keys 需要轉換的屬性名稱陣列
 * @returns 轉換後的物件
 */
export const convertObjectProperties = <T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[]
): T => {
  const converted = { ...obj };
  keys.forEach(key => {
    if (typeof converted[key] === 'string') {
      converted[key] = convertToTraditional(converted[key] as string) as T[keyof T];
    }
  });
  return converted;
};

/**
 * 轉換陣列中物件的指定屬性
 * @param array 要轉換的陣列
 * @param keys 需要轉換的屬性名稱陣列
 * @returns 轉換後的陣列
 */
export const convertArrayProperties = <T extends Record<string, any>>(
  array: T[],
  keys: (keyof T)[]
): T[] => {
  return array.map(item => convertObjectProperties(item, keys));
};