export const calculateRemainingTime = (nowDate: string, deadlineDate: string): { years: number, months: number, days: number, hours: number, minutes: number, seconds: number } =>
  {
    const now = new Date(nowDate);
    const deadline = new Date(deadlineDate);  
  
    const timeDifference = deadline.getTime() - now.getTime();
  
    const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
    const months = Math.floor((timeDifference % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
    const days = Math.floor((timeDifference % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
  
    return {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  }

export const convertToDateTime = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${
                            (date.getMonth() + 1).toString().padStart(2, '0')}-${
                             date.getDate().toString().padStart(2, '0')}T${
                             date.getHours().toString().padStart(2, '0')}:${
                             date.getMinutes().toString().padStart(2, '0')}:${
                             date.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
}