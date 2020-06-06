import * as bcrypt from 'bcrypt';

export class UtilsService {
  /**
   * convert entity to dto class instance
   * @param {{new(entity: E, options: any): T}} model
   * @param {E[] | E} entity
   * @param options
   * @returns {T[] | T}
   */
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E,
    options?: any,
  ): T;
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E[],
    options?: any,
  ): T[];
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E | E[],
    options?: any,
  ): T | T[] {
    if (!entity) return;
    if (Array.isArray(entity)) {
      return entity.map(u => new model(u, options));
    }

    return new model(entity, options);
  }

  /**
   * generate hash from password or string
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static randomInt(min: number, max: number): number {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min);
    return ~~rand;
  }

  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  static generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * generate random string
   * @param {number} length
   * @param {string} alphabet
   */
  static generateRandomString(
    length = 8,
    alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  ): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += alphabet.charAt(this.randomInt(0, alphabet.length - 1));
    }
    return result;
  }

  /**
   * generate strong password
   * @param length (min=8)
   */
  static generateStrongPassword(length: number): string {
    if (length < 8) {
      length = 8;
    }
    const upperSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerSymbols = upperSymbols.toLowerCase();
    const numbers = '0123456789';
    const alphabet = upperSymbols + lowerSymbols + numbers;
    let password = this.generateRandomString(length - 3, alphabet);

    let position = this.randomInt(0, password.length - 1);
    password =
      password.slice(0, position) +
      this.generateRandomString(1, upperSymbols) +
      password.slice(position);
    position = this.randomInt(0, password.length - 1);
    password =
      password.slice(0, position) +
      this.generateRandomString(1, lowerSymbols) +
      password.slice(position);

    position = this.randomInt(0, password.length - 1);
    password =
      password.slice(0, position) +
      this.generateRandomString(1, numbers) +
      password.slice(position);
    return password;
  }
  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  static validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }
}
