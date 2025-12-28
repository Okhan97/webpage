export const detectDeviceType = (userAgent: string): string => {
  const userAgentLower = userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgentLower
    );
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgentLower);

  if (isTablet) {
    return "Tablet";
  } else if (isMobile) {
    return "Mobile";
  } else {
    return "Desktop";
  }
};

export const detectOS = (userAgent: string): string => {
  let os = "Unknown OS";
  let version = "";

  if (/windows/i.test(userAgent)) {
    os = "Windows";
    if (/windows nt 10.0/i.test(userAgent)) version = "10/11";
    else if (/windows nt 6.3/i.test(userAgent)) version = "8.1";
    else if (/windows nt 6.2/i.test(userAgent)) version = "8";
    else if (/windows nt 6.1/i.test(userAgent)) version = "7";
  } else if (/mac os x/i.test(userAgent)) {
    os = "macOS";
    const match = userAgent.match(/mac os x (\d+)[._](\d+)[._]?(\d+)?/i);
    if (match) {
      const majorVersion = parseInt(match[1]);
      const minorVersion = parseInt(match[2]);

      // Browsers freeze user agent at 10.15.7 for privacy
      if (majorVersion === 10 && minorVersion === 15) {
        version = `${match[1]}.${match[2]}${match[3] ? "." + match[3] : ""}`;
      } else {
        version = `${match[1]}.${match[2]}${match[3] ? "." + match[3] : ""}`;
      }
    }
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    os = "iOS";
    const match = userAgent.match(/os (\d+)[._](\d+)[._]?(\d+)?/i);
    if (match) {
      version = `${match[1]}.${match[2]}${match[3] ? "." + match[3] : ""}`;
    }
  } else if (/android/i.test(userAgent)) {
    os = "Android";
    const match = userAgent.match(/android (\d+\.?\d*\.?\d*)/i);
    if (match) {
      version = match[1];
    }
  } else if (/linux/i.test(userAgent)) {
    os = "Linux";
  }

  return version ? `${os} ${version}` : os;
};

export const detectBrowser = (userAgent: string): string => {
  let browser = "Unknown Browser";
  let browserVersion = "";

  if (/edg/i.test(userAgent)) {
    browser = "Edge";
    const match = userAgent.match(/edg\/(\d+\.\d+\.\d+\.\d+)/i);
    if (match) browserVersion = match[1];
  } else if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) {
    browser = "Chrome";
    const match = userAgent.match(/chrome\/(\d+\.\d+\.\d+\.\d+)/i);
    if (match) browserVersion = match[1];
    browser = "Chrome";
  } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
    browser = "Safari";
    const match = userAgent.match(/version\/(\d+\.\d+\.?\d*)/i);
    if (match) browserVersion = match[1];
  } else if (/firefox/i.test(userAgent)) {
    browser = "Firefox";
    const match = userAgent.match(/firefox\/(\d+\.\d+)/i);
    if (match) browserVersion = match[1];
  } else if (/opera|opr/i.test(userAgent)) {
    browser = "Opera";
    const match = userAgent.match(/(?:opera|opr)\/(\d+\.\d+)/i);
    if (match) browserVersion = match[1];
  }

  return browserVersion ? `${browser} ${browserVersion}` : browser;
};

export const detectLanguage = (): string => {
  const languageCode = navigator.language || "en";

  // Map language codes to language names with flags
  const languageMap: { [key: string]: string } = {
    en: "English 🇬🇧",
    "en-US": "English 🇺🇸",
    "en-GB": "English 🇬🇧",
    es: "Spanish 🇪🇸",
    "es-ES": "Spanish 🇪🇸",
    "es-MX": "Spanish 🇲🇽",
    fr: "French 🇫🇷",
    "fr-FR": "French 🇫🇷",
    de: "German 🇩🇪",
    "de-DE": "German 🇩🇪",
    it: "Italian 🇮🇹",
    "it-IT": "Italian 🇮🇹",
    pt: "Portuguese 🇵🇹",
    "pt-BR": "Portuguese 🇧🇷",
    "pt-PT": "Portuguese 🇵🇹",
    ru: "Russian 🇷🇺",
    "ru-RU": "Russian 🇷🇺",
    ja: "Japanese 🇯🇵",
    "ja-JP": "Japanese 🇯🇵",
    zh: "Chinese 🇨🇳",
    "zh-CN": "Chinese 🇨🇳",
    "zh-TW": "Chinese 🇹🇼",
    ko: "Korean 🇰🇷",
    "ko-KR": "Korean 🇰🇷",
    ar: "Arabic 🇸🇦",
    "ar-SA": "Arabic 🇸🇦",
    hi: "Hindi 🇮🇳",
    "hi-IN": "Hindi 🇮🇳",
    nl: "Dutch 🇳🇱",
    "nl-NL": "Dutch 🇳🇱",
    sv: "Swedish 🇸🇪",
    "sv-SE": "Swedish 🇸🇪",
    pl: "Polish 🇵🇱",
    "pl-PL": "Polish 🇵🇱",
    tr: "Turkish 🇹🇷",
    "tr-TR": "Turkish 🇹🇷",
  };

  const languageName =
    languageMap[languageCode] ||
    languageMap[languageCode.split("-")[0]] ||
    languageCode;

  return languageName;
};

export const detectScreenDimensions = (): string => {
  const width = window.screen.width;
  const height = window.screen.height;

  return `${width} x ${height} px`;
};
