import type { EFakeData } from '../enums/index.js';
import type { IFakeModel, IFakeState } from '../types/data.js';
import type mongoose from 'mongoose';

export default abstract class TemplateFactory<T extends EFakeData> {
  private readonly _targetModel: IFakeModel[T];
  private _state: IFakeState[T] = {};

  private _states: IFakeState[T][] = [];
  protected constructor(targetModel: IFakeModel[T]) {
    this._targetModel = targetModel;
    this.fillState();
  }

  protected get data(): IFakeState[T] {
    return this._state;
  }

  protected set data(value: IFakeState[T]) {
    this._state = value;
  }

  protected get states(): IFakeState[T][] {
    return this._states;
  }

  protected set states(value: IFakeState[T][]) {
    this._states = value;
  }

  protected get targetModel(): IFakeModel[T] {
    return this._targetModel;
  }

  async create(): Promise<mongoose.Types.ObjectId> {
    const newElm = new this._targetModel(this.data);
    const { _id } = await newElm.save();
    this.states.push({ ...this.data, _id });
    this.clean();
    return _id;
  }

  async cleanUp(): Promise<void> {
    await Promise.all(
      Object.values(this.states).map(async (k) => {
        return (this._targetModel as mongoose.Model<unknown>).findOneAndDelete({ _id: k._id! });
      }),
    );
    this.states = [];
  }

  protected abstract fillState(): void

  private clean(): void {
    Object.entries(this.data).forEach((e) => {
      if (typeof e[1] === 'number') (e[1] as number) = 0;
      if (typeof e[1] === 'string') e[1] = undefined!;
      if (typeof e[1] === 'boolean') (e[1] as boolean) = false;
      if (typeof e[1] === 'undefined') e[1] = undefined!;
    });
  }
}
