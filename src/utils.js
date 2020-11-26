export const env = {
 // api: window.location.protocol + "//" + window.location.host + "/"
    api: "https://www.nmgjdcxzc.cn"
};
// export const env = {
//   api: '/api'
// };


export function isNotNull(obj) {
  if (Array.isArray(obj) && obj.length !== 0) {
    return true;
  }
  if (obj instanceof Object) {
    if (Object.keys(obj).length !== 0) {
      return true;
    }
    return false;
  }
  return (
      typeof obj !== 'undefined' &&
      obj !== null &&
      (Array.isArray(obj) ? obj.length !== 0 : obj !== '') && obj !== 'undefined' && obj !== 'null'
  );
}
