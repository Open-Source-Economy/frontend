export class ValidationError extends Error {
  constructor(message: string, data: any) {
    super(`${message}. Received: ${JSON.stringify(data, null, 2)}`);
  }
}

class FieldValidationError extends ValidationError {
  constructor(field: string, data: any, type: string) {
    super(`Invalid type: ${field} is not a ${type}`, data);
  }
}

class StringValidationError extends FieldValidationError {
  constructor(field: string, data: any) {
    super(field, data, "string");
  }
}

class NumberValidationError extends FieldValidationError {
  constructor(field: string, data: any) {
    super(field, data, "number");
  }
}

class BooleanValidationError extends FieldValidationError {
  constructor(field: string, data: any) {
    super(field, data, "boolean");
  }
}

class ArrayValidationError extends FieldValidationError {
  constructor(field: string, data: any) {
    super(field, data, "array");
  }
}

class ObjectValidationError extends FieldValidationError {
  constructor(field: string, data: any) {
    super(field, data, "object");
  }
}

class EnumValidationError extends ValidationError {
  constructor(field: string, data: any, enumType: string) {
    super(`${field}" is not contained in the ${enumType} enum.`, data);
  }
}

export class Validator {
  private data: any;
  private errors: FieldValidationError[] = [];

  constructor(data: any) {
    this.data = data;
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

  optionalString(field: string): void {
    const value = this.data[field];
    if (value === undefined || value === null) {
    } else if (typeof value !== "string") {
      this.errors.push(new StringValidationError(field, this.data));
    }
  }

  requiredString(field: string): void {
    const value = this.data[field];
    if (typeof value !== "string") {
      this.errors.push(new StringValidationError(field, this.data));
    }
  }

  optionalNumber(field: string): void {
    let value = this.data[field];

    if (typeof value === "string") {
      value = parseFloat(value);
    }

    if (value === undefined || value === null) {
    } else if (typeof value !== "number") {
      this.errors.push(new NumberValidationError(this.data, field));
      return;
    }
  }

  requiredNumber(field: string): void {
    let value = this.data[field];

    if (typeof value === "string") {
      value = parseFloat(value);
    }

    if (typeof value !== "number" || isNaN(value)) {
      this.errors.push(new NumberValidationError(field, this.data));
    }
  }

  requiredBoolean(field: string): void {
    const value = this.data[field];
    if (typeof value !== "boolean") {
      this.errors.push(new BooleanValidationError(field, this.data));
    }
  }

  optionalObject(field: string): void {
    const value = this.data[field];
    if (value === undefined || value === null) {
    } else if (typeof value !== "object") {
      this.errors.push(new ObjectValidationError(field, this.data));
    }
  }

  requiredObject(field: string): void {
    const value = this.data[field];
    if (typeof value !== "object") {
      this.errors.push(new ObjectValidationError(field, this.data));
    }
  }

  optionalArray(field: string): void {
    const value = this.data[field];
    if (value === undefined || value === null) {
    } else if (!Array.isArray(value)) {
      this.errors.push(new ArrayValidationError(field, this.data));
    }
  }

  requiredArray(path: string | string[]): void {
    let value: any;

    if (typeof path === "string") {
      value = this.data[path];
    } else if (Array.isArray(path)) {
      value = this.getValueFromPath(path);
    }

    if (!Array.isArray(value)) {
      const p = typeof path === "string" ? path : path.join(".");
      this.errors.push(new ArrayValidationError(p, this.data));
    }
  }

  requiredEnum(field: string, enumType: any): void {
    const value = this.data[field];
    const enumValues = Object.values(enumType);
    if (!enumValues.includes(value)) {
      this.errors.push(new EnumValidationError(field, value, enumType.name));
    }
  }
}
