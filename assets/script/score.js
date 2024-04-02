// score.js
class Score {
  constructor(date, hits, percentage) {
      this._date = date;
      this._hits = hits;
      this._percentage = percentage;
  }

  get date() {
      return this._date;
  }

  get hits() {
      return this._hits;
  }

  get percentage() {
      return this._percentage;
  }
}

export default Score;
