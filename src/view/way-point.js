import dayjs from 'dayjs';
import {createElement} from '../utils';

export class Waypoint {
  constructor ({date, type, destination, time, price, offers = []}) {
    this.element = null;

    this.state = {
      date: date,
      type: type,
      destination: destination,
      time: time,
      price: price,
      offers: offers
    };
  }

  // date: string
  // event: string
  // time: {start: string, end: string}
  // price: string
  // offers: {title: string, price: string}[]
  getTemplate () {
    const {date, type, destination, time, price, offers} = this.state;
    return `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${dayjs(date).format('YYYY-MM-DD')}">${dayjs(date).format( ' MMM D')}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${destination.city}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${dayjs(time.start).format('YYYY-MM-DDThh:mm')}">
                ${dayjs(time.start).format('hh:mm')}
              </time>
              &mdash;
              <time class="event__end-time" datetime="${dayjs(time.end).format('YYYY-MM-DDThh:mm')}">
                ${dayjs(time.end).format('hh:mm')}
              </time>
            </p>
            <p class="event__duration">${dayjs(time.end).diff(time.start, 'minutes')}M</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offers.map((offer) => `
              <li class="event__offer">
                <span class="event__offer-title">${offer.name}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </li>`).join('')}
          </ul>
          <button class="event__favorite-btn event__favorite-btn--active" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
  `;}

  get getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}