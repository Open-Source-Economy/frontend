export class ValidationError extends Error {
  data: any;

  constructor(message: string, data?: any) {
    super(message);
    this.name = "ValidationError";
    this.data = data;
  }
}

export class Validator {
  private data: any;
  private errors: ValidationError[] = [];

  constructor(data: any) {
    this.data = data;
  }

  requiredString(key: string): string {
    const value = this.data[key];
    if (typeof value !== "string" || value.trim() === "") {
      this.errors.push(new ValidationError(`Required field '${key}' is missing or empty`, this.data));
      return "";
    }
    return value.trim();
  }

  optionalString(key: string): string | undefined {
    const value = this.data[key];
    if (value === undefined || value === null) {
      return undefined;
    }
    if (typeof value !== "string") {
      this.errors.push(new ValidationError(`Field '${key}' must be a string`, this.data));
      return undefined;
    }
    return value.trim() || undefined;
  }

  requiredNumber(key: string): number {
    const value = this.data[key];
    if (typeof value !== "number" || isNaN(value)) {
      this.errors.push(new ValidationError(`Required field '${key}' must be a valid number`, this.data));
      return 0;
    }
    return value;
  }

  optionalNumber(key: string): number | undefined {
    const value = this.data[key];
    if (value === undefined || value === null) {
      return undefined;
    }
    if (typeof value !== "number" || isNaN(value)) {
      this.errors.push(new ValidationError(`Field '${key}' must be a valid number`, this.data));
      return undefined;
    }
    return value;
  }

  requiredEnum<T>(key: string, validValues: T[]): T {
    const value = this.data[key];
    if (!validValues.includes(value)) {
      this.errors.push(new ValidationError(`Field '${key}' must be one of: ${validValues.join(", ")}`, this.data));
      return validValues[0]; // Return first valid value as fallback
    }
    return value;
  }

  getFirstError(): ValidationError | null {
    return this.errors.length > 0 ? this.errors[0] : null;
  }

  getAllErrors(): ValidationError[] {
    return [...this.errors];
  }
}
