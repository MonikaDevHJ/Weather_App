

export function GetDayOrNight(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
  
    if (hours >= 6 && hours < 18) {
      return 'day';
    } else {
      return 'night';
    }
  }
  