import { Currency } from "../api/model";
import { currencyCookie } from "./currency.cookie";

describe("CurrencyCookie", () => {
  let documentCookies: { [key: string]: string } = {};

  beforeEach(() => {
    // Reset cookies before each test
    documentCookies = {};
    jest.useFakeTimers();
    // Set a fixed date for consistent testing
    jest.setSystemTime(new Date("2024-01-14T11:18:33Z"));

    // Mock document.cookie getter and setter
    Object.defineProperty(document, "cookie", {
      get: jest.fn(() => {
        return Object.entries(documentCookies)
          .map(([key, value]) => `${key}=${value}`)
          .join("; ");
      }),
      set: jest.fn((cookieString: string) => {
        const [cookieValue] = cookieString.split(";");
        const [key, value] = cookieValue.split("=");
        if (value === "") {
          delete documentCookies[key];
        } else {
          documentCookies[key] = value.toLowerCase(); // Store as lowercase
        }
      }),
      configurable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe("get", () => {
    it("should return EUR as default when no cookie is set", () => {
      expect(currencyCookie.get()).toBe(Currency.EUR);
    });

    it("should return the currency from cookie when valid", () => {
      documentCookies[currencyCookie.cookieName] = Currency.USD.toLowerCase();
      expect(currencyCookie.get()).toBe(Currency.USD);
    });

    // TODO: Fix this test
    // it('should return default currency when cookie value is invalid', () => {
    //   documentCookies[currencyCookie.cookieName] = 'INVALID_CURRENCY';
    //   expect(currencyCookie.get()).toBe(Currency.EUR);
    // });

    // TODO: Fix this test
    // it('should handle empty cookie string', () => {
    //   document.cookie = '';
    //   expect(currencyCookie.get()).toBe(Currency.EUR);
    // });

    it("should handle empty cookie", () => {
      documentCookies = {};
      expect(currencyCookie.get()).toBe(Currency.EUR);
    });

    it("should find currency cookie among multiple cookies", () => {
      documentCookies["other"] = "value";
      documentCookies[currencyCookie.cookieName] = Currency.GBP.toLowerCase();
      documentCookies["another"] = "test";
      expect(currencyCookie.get()).toBe(Currency.GBP);
    });
  });

  describe("set", () => {
    it("should set valid currency with correct attributes", () => {
      const spy = jest.spyOn(document, "cookie", "set");
      currencyCookie.set(Currency.USD);

      const expectedCookieString = `${currencyCookie.cookieName}=usd; path=/; expires=Tue, 14 Jan 2025 11:18:33 GMT; SameSite=Lax; domain=undefined`;
      expect(spy).toHaveBeenCalledWith(expectedCookieString);
    });

    it("should add Secure flag when on HTTPS", () => {
      const originalLocation = window.location;
      // @ts-ignore
      delete window.location;
      Object.defineProperty(window, "location", {
        value: { protocol: "https:" },
        writable: true,
        configurable: true,
      });

      const spy = jest.spyOn(document, "cookie", "set");
      currencyCookie.set(Currency.USD);

      const expectedCookieString = `${currencyCookie.cookieName}=usd; path=/; expires=Tue, 14 Jan 2025 11:18:33 GMT; SameSite=Lax; domain=undefined; Secure`;
      expect(spy).toHaveBeenCalledWith(expectedCookieString);

      window.location = originalLocation;
    });

    it("should throw error for invalid currency", () => {
      expect(() => {
        currencyCookie.set("INVALID" as Currency);
      }).toThrow("Invalid currency value:");
    });

    it("should be able to overwrite existing currency", () => {
      currencyCookie.set(Currency.USD);
      currencyCookie.set(Currency.EUR);
      expect(currencyCookie.get()).toBe(Currency.EUR);
    });
  });

  describe("remove", () => {
    it("should remove the currency cookie", () => {
      currencyCookie.set(Currency.USD);
      currencyCookie.remove();

      expect(currencyCookie.get()).toBe(Currency.EUR);
      expect(document.cookie).not.toContain("currency=");
    });

    it("should set correct expiration attributes when removing", () => {
      const spy = jest.spyOn(document, "cookie", "set");
      currencyCookie.remove();

      const expectedCookieString = `${currencyCookie.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      expect(spy).toHaveBeenCalledWith(expectedCookieString);
    });

    it("should handle removal of non-existent cookie without error", () => {
      expect(() => currencyCookie.remove()).not.toThrow();
    });
  });
});
