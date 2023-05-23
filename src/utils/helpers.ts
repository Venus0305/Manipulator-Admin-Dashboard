import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import _get from 'lodash/get';

// A unique ID to identify both uploads and reloaders
// The currently waiting uploads, is uploading if not empty
// All the reloaders to call when the uploading status changed

const Helper = {
  getWebCookie: () => {
    const cookies = JSON.parse((getCookie('manipulator-dashboard-cookie') || null) as string);
    return cookies;
  },
  removeWebCookie: () => deleteCookie(`manipulator-dashboard-cookie`, { path: '/' }),
  setToken: (data: Record<string, string>, remember?: boolean): void =>
    setCookie('manipulator-dashboard-cookie', data, {
      path: '/',
      ...(remember
        ? {
            maxAge: import.meta.env.SESSION_TIME ? Number(import.meta.env.SESSION_TIME) : 2592000, // 30 * 24 * 60 * 60 * 1
          }
        : {}),
    }),
  arrayToString: (array = []): string => array.map((item) => item).join(', '),
  getDownLoadFileCSV: (
    csvContent: number | boolean | BlobPart,
    csvFileName = 'dataList.csv',
  ): void => {
    const exportedFilename = csvFileName;
    const BOM = '\uFEFF';
    const formatCsvContent = BOM + csvContent;
    const blob = new Blob([formatCsvContent], {
      type: `text/csv;charset=utf-8,%EF%BB%BF${encodeURIComponent(formatCsvContent)}`,
    });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  formatCurrencyJPYName: (value: number | bigint): string => {
    const currencyJPYName = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'name',
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    });
    return currencyJPYName.format(value);
  },

  getInternalUrl: (urlString: string, data: unknown): string | null => {
    const URL_PARAMETER = /:([^/]+)/;
    let url: string | null = null;
    if (urlString) {
      let allFound = true;
      url = urlString.replace(URL_PARAMETER, (_: string, path: string): string => {
        const seg = _get(data, path, '');
        if (seg) {
          return seg;
        }
        allFound = false;
        return '';
      });
      if (!allFound) {
        url = null;
      }
    }
    return url;
  },
  convertObjectToOptions: (obj: Record<string | number, string | number>) => {
    return Object.keys(obj).map((key) => ({ _id: key, name: obj[key] || '' }));
  },
  addCommaToString: (value: string | number) => {
    if (!value) {
      return '';
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  formatUrl: (url: string) => {
    if (typeof url !== 'string') {
      return undefined;
    }
    return url.startsWith('https://') || url.startsWith('http://') ? url : `http://${url}`;
  },
  convertArrayToEntities: <T>(array: (T & { _id?: string; id?: string })[]) => {
    const ids: string[] = [];
    const entities = (array || []).reduce((acc, cur) => {
      if (cur._id) {
        ids.push(cur._id);
        return { ...acc, [cur._id]: cur };
      }
      if (cur.id) {
        ids.push(cur.id);
        return { ...acc, [cur.id]: cur };
      }
      return acc;
    }, {});
    return {
      ids,
      entities,
    };
  },
  getThreeDayBeforeCurrentDay: (
    date: { getFullYear: () => number; getMonth: () => number; getDate: () => number },
    index: number,
  ): Record<string, number> => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1); // get first day of the month
    const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    const firstDayOfMonth = firstDay.getDate();
    const datePast = date.getDate() - (3 - index); // get 3 days before current day
    const dateDisplayed =
      datePast < firstDayOfMonth ? lastDayOfPrevMonth.getDate() + datePast : datePast;
    return { datePast, dateDisplayed };
  },
  getThreeDayAfterCurrentDay: (
    date: { getFullYear: () => number; getMonth: () => number; getDate: () => number },
    index: number,
  ): Record<string, number> => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); // get last day of the search month
    const lastDayOfMonth = lastDay.getDate();
    const dateFuture = date.getDate() + (1 + index); // get 3 days after current day
    const dateDisplayed = dateFuture > lastDayOfMonth ? dateFuture - lastDayOfMonth : dateFuture;
    return { dateFuture, dateDisplayed };
  },
};

export default Helper;
