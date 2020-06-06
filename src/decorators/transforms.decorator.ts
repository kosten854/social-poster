/* tslint:disable:naming-convention */

import { Transform } from 'class-transformer';
// import * as _ from 'lodash';

// /**
//  * @description trim spaces from start and end, replace multiple spaces with one.
//  * @example
//  * @ApiModelProperty()
//  * @IsString()
//  * @Trim()
//  * name: string;
//  * @returns {(target: any, key: string) => void}
//  * @constructor
//  */
// export function Trim() {
//     return Transform((value: string | string[]) => {
//         if (_.isArray(value)) {
//             return value.map(v => _.trim(v).replace(/\s\s+/g, ' '));
//         }
//         return _.trim(value).replace(/\s\s+/g, ' ');
//     });
// }

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function ToInt(options?: { each: boolean }) {
  if (!options || !options.each) {
    return Transform(value => parseInt(value, 10), { toClassOnly: true });
  } else {
    return Transform(
      value => {
        if (!value) return undefined;
        if (!(value instanceof Array)) {
          value = [value];
        }
        return value?.map(it => parseInt(it, 10));
      },
      {
        toClassOnly: true,
      },
    );
  }
}

export function ToBoolean(): (target: any, key: string) => void {
  return Transform((value: any) => {
    if (typeof value === 'undefined') return undefined;
    return value === 'true' || value === true || value === 1 || value === '1';
  });
}
// /**
//  * @description transforms to array, specially for query params
//  * @example
//  * @IsNumber()
//  * @ToArray()
//  * name: number;
//  * @constructor
//  */
// export function ToArray(): (target: any, key: string) => void {
//     return Transform(
//         value => {
//             if (_.isNil(value)) {
//                 return [];
//             }
//             return _.castArray(value);
//         },
//         { toClassOnly: true },
//     );
// }
