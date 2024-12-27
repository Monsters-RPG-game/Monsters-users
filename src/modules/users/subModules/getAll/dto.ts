import Validation from '../../../../tools/validation.js';
import type { IGetAllUsersDto } from './types.js';

export default class GetAllUsersDto implements IGetAllUsersDto {
  page: number;

  constructor(data: IGetAllUsersDto) {
    this.page = data.page;

    this.validate();
  }

  private validate(): void {
    new Validation(this.page, 'page').isDefined().isNumber().hasLength(1000, 1);
  }
}
