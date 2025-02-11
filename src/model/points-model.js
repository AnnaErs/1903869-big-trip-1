import AbstractObservable from '../abstract-observable.js';

export default class PointsModel extends AbstractObservable {
  points = [];

  set points(points) {
    this.points = [...points];
  }

  get points() {
    return this.points;
  }

  updatePoint = (updateType, update) => {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.points = [
      ...this.points.slice(0, index),
      update,
      ...this.points.slice(index + 1),
    ];

    this.notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.points = [update, ...this.points];

    this.notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.points = [
      ...this.points.slice(0, index),
      ...this.points.slice(index + 1),
    ];

    this.notify(updateType);
  };
}
