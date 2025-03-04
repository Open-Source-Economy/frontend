import Decimal from "decimal.js";

export class ValidationError extends Error {
  constructor(message: string, data: any) {
    super(`${message}. Received: ${JSON.stringify(data, null, 2)}`);
  }
}

class FieldValidationError extends ValidationError {
  constructor(path: string | string[], value: any, data: any, type: string) {
    const p = typeof path === "string" ? path : path.join(".");
    super(`Invalid type: field "${p}", of value ${value} is not a ${type}`, data);
  }
}

class StringValidationError extends FieldValidationError {
  constructor(path: string | string[], value: any, data: any) {
    super(path, value, data, "string");
  }
}

class NumberValidationError extends FieldValidationError {
  constructor(path: string | string[], value: any, data: any) {
    super(path, value, data, "number");
  }
}

class BooleanValidationError extends FieldValidationError {
  constructor(path: string | string[], value: any, data: any) {
    super(path, value, data, "boolean");
  }
}

class ArrayValidationError extends FieldValidationError {
  constructor(path: string | string[], value: any, data: any) {
    super(path, value, data, "array");
  }
}

class ObjectValidationError extends FieldValidationError {
  constructor(path: string | string[], value: any, data: any) {
    super(path, value, data, "object");
  }
}

class EnumValidationError extends ValidationError {
  constructor(path: string | string[], data: any, enumType: string[]) {
    const p = typeof path === "string" ? path : path.join(".");
    super(`${p}" is not contained in enum type ${enumType}`, data);
  }
}

class DateValidationError extends FieldValidationError {
  constructor(path: string | string[], value: any, data: any) {
    super(path, value, data, "Date");
  }
}

export class Validator {
  private data: any;
  private errors: FieldValidationError[] = [];

  constructor(data: any) {
    this.data = data;
  }

  private getValue(path: string | string[]): any {
    if (typeof path === "string") {
      return this.data[path];
    } else if (Array.isArray(path)) {
      return this.getValueFromPath(path);
    }
  }

  private getValueFromPath(path: string[]): any {
    let value = this.data;
    for (const key of path) {
      value = value[key];
      if (value === undefined) {
        return undefined;
      }
    }
    return value;
  }

  getFirstError(): FieldValidationError | null {
    return this.errors[0] || null;
  }

  optionalString(path: string | string[]): string | undefined {
    const value = this.getValue(path);
    if (value === undefined || value === null) {
    } else if (typeof value !== "string") {
      this.errors.push(new StringValidationError(path, value, this.data));
    } else {
      return value;
    }
  }

  // @ts-ignore
  requiredString(path: string | string[]): string {
    const value = this.getValue(path);
    if (typeof value !== "string") {
      this.errors.push(new StringValidationError(path, value, this.data));
    } else {
      return value;
    }
  }

  optionalNumber(path: string | string[]): number | undefined {
    let value = this.getValue(path);

    if (typeof value === "string") {
      value = parseFloat(value);
    }

    if (value === undefined || value === null) {
    } else if (typeof value !== "number") {
      this.errors.push(new NumberValidationError(path, this.data, value));
      return;
    } else {
      return value;
    }
  }

  // @ts-ignore
  requiredNumber(path: string | string[]): number {
    let value = this.getValue(path);

    if (typeof value === "string") {
      value = parseFloat(value);
    }

    if (typeof value !== "number" || isNaN(value)) {
      this.errors.push(new NumberValidationError(path, value, this.data));
    } else {
      return value;
    }
  }

  optionalDecimal(path: string | string[]): Decimal | undefined {
    let value = this.getValue(path);

    if (value === undefined || value === null) {
      return undefined;
    }

    try {
      if (typeof value === "string" || typeof value === "number") {
        const decimal = new Decimal(value);
        if (!isNaN(decimal.toNumber())) {
          return decimal;
        }
      }
      this.errors.push(new NumberValidationError(path, value, this.data));
      return undefined;
    } catch (error) {
      this.errors.push(new NumberValidationError(path, value, this.data));
      return undefined;
    }
  }

  // @ts-ignore
  requiredDecimal(path: string | string[]): Decimal {
    let value = this.getValue(path);

    if (typeof value === "string") {
      // Use Decimal.js to parse the string
      value = new Decimal(value);
    } else if (typeof value === "number") {
      // Convert number to Decimal.js
      value = new Decimal(value);
    }

    // Check if the value is a valid Decimal.js instance
    if (!(value instanceof Decimal) || isNaN(value.toNumber())) {
      this.errors.push(new NumberValidationError(path, value, this.data));
    } else {
      return value;
    }
  }

  // @ts-ignore
  requiredBoolean(path: string | string[]): boolean {
    const value = this.getValue(path);
    if (typeof value !== "boolean") {
      this.errors.push(new BooleanValidationError(path, value, this.data));
    } else {
      return value;
    }
  }

  optionalObject(path: string | string[]): void {
    const value = this.getValue(path);
    if (value === undefined || value === null) {
    } else if (typeof value !== "object") {
      this.errors.push(new ObjectValidationError(path, value, this.data));
    }
  }

  // @ts-ignore
  requiredObject(path: string | string[]): any {
    const value = this.getValue(path);
    if (typeof value !== "object") {
      this.errors.push(new ObjectValidationError(path, value, this.data));
    } else {
      return value;
    }
  }

  optionalArray<T = any>(path: string | string[], elementType?: string): T[] {
    const value = this.getValue(path);

    if (value === undefined || value === null) {
      // Return an empty array for optional values
      return [];
    }

    if (!Array.isArray(value)) {
      // Value exists but is not an array
      this.errors.push(new ArrayValidationError(path, value, this.data));
      return [];
    }

    if (elementType) {
      // Validate array elements if a specific type is provided
      for (const element of value) {
        if (typeof element !== elementType) {
          this.errors.push(new ArrayValidationError(path, value, this.data));
          return [];
        }
      }
    }

    return value;
  }

  requiredArray<T = any>(path: string | string[], elementType?: string): T[] {
    const value = this.getValue(path);

    if (value === undefined || value === null) {
      this.errors.push(new ArrayValidationError(path, value, this.data));
      return [];
    }

    if (!Array.isArray(value)) {
      this.errors.push(new ArrayValidationError(path, value, this.data));
      return [];
    }

    if (elementType) {
      for (const element of value) {
        if (typeof element !== elementType) {
          this.errors.push(new ArrayValidationError(path, value, this.data));
          return [];
        }
      }
    }

    return value;
  }

  optionalEnum<EnumType extends string>(path: string | string[], enumType: EnumType[]): EnumType | undefined {
    const value = this.getValue(path) as EnumType | undefined;

    if (value === undefined || value === null) {
      return undefined; // Return undefined for optional values
    }

    const enumValues = Object.values(enumType) as EnumType[];
    if (!enumValues.includes(value)) {
      this.errors.push(new EnumValidationError(path, value, enumType));
      return undefined;
    }

    return value;
  }

  requiredEnum<EnumType extends string>(
    path: string | string[],
    enumType: EnumType[],
    // @ts-ignore
  ): EnumType {
    const value = this.getValue(path) as EnumType;
    const enumValues = Object.values(enumType) as EnumType[];
    if (!enumValues.includes(value)) {
      this.errors.push(new EnumValidationError(path, value, enumType));
    } else {
      return value;
    }
  }

  optionalDate(path: string | string[]): Date | undefined {
    const value = this.getValue(path);

    if (typeof value === "object") {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
  }

  // @ts-ignore
  requiredDate(path: string | string[]): Date {
    const value = this.getValue(path);

    if (typeof value === "object") {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    this.errors.push(new DateValidationError(path, value, this.data));
  }
}
