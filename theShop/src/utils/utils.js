export function printLogs(logs) {
  if (__DEV__) {
    console.log(logs);
    console.tron.warn(logs);
  }
}
