export interface ZodiacSign {
  name: string;
  symbol: string;
  dateRange: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: "Aries", symbol: "♈", dateRange: "Mar 21 – Apr 19" },
  { name: "Taurus", symbol: "♉", dateRange: "Apr 20 – May 20" },
  { name: "Gemini", symbol: "♊", dateRange: "May 21 – Jun 20" },
  { name: "Cancer", symbol: "♋", dateRange: "Jun 21 – Jul 22" },
  { name: "Leo", symbol: "♌", dateRange: "Jul 23 – Aug 22" },
  { name: "Virgo", symbol: "♍", dateRange: "Aug 23 – Sep 22" },
  { name: "Libra", symbol: "♎", dateRange: "Sep 23 – Oct 22" },
  { name: "Scorpio", symbol: "♏", dateRange: "Oct 23 – Nov 21" },
  { name: "Sagittarius", symbol: "♐", dateRange: "Nov 22 – Dec 21" },
  { name: "Capricorn", symbol: "♑", dateRange: "Dec 22 – Jan 19" },
  { name: "Aquarius", symbol: "♒", dateRange: "Jan 20 – Feb 18" },
  { name: "Pisces", symbol: "♓", dateRange: "Feb 19 – Mar 20" },
];
