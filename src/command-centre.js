module.exports = class CommandCentre {
  constructor() {
    this.data = {
      coordinates: {
        x: 0,
        y: 0,
      },
      martianRoverPosition: {
        x: 0,
        y: 0,
        orientation: "n",
      },
      martianRoverDirection: false,
      lostContactCoordinates: [],
    };
  }

  set coordinates(string) {
    const pattern = /^\d{1,2}?\s\d{1,2}?$/g;
    const isACoordinateString = pattern.test(string);
    if (isACoordinateString) {
      return this.setCoordinatesObject(string);
    }
    return (this.data.coordinates = false);
  }

  setCoordinatesObject(string) {
    this.data.coordinates.x = parseInt(string.split(" ")[0]);
    this.data.coordinates.y = parseInt(string.split(" ")[1]);
  }

  get coordinates() {
    return this.data.coordinates;
  }

  set martianRoverPosition(string) {
    const pattern = /^\d{1,2}?\s\d{1,2}\s[NnEeSsWw]$/g;
    const isAMartianRoverPositionString = pattern.test(string);
    if (isAMartianRoverPositionString) {
      return this.setMartianRoverPositionObject(string);
    }
    return (this.data.martianRoverPosition = false);
  }

  get martianRoverPosition() {
    return this.data.martianRoverPosition;
  }

  setMartianRoverPositionObject(string) {
    this.data.martianRoverPosition.x = parseInt(string.split(" ")[0]);
    this.data.martianRoverPosition.y = parseInt(string.split(" ")[1]);
    this.data.martianRoverPosition.orientation = string
      .split(" ")[2]
      .toLowerCase();
    return this.checkMartianRoverPositionOnTheGrid();
  }

  checkMartianRoverPositionOnTheGrid() {
    if (this.data.martianRoverPosition.x > this.data.coordinates.x) {
      return (this.data.martianRoverPosition = null);
    }

    if (this.data.martianRoverPosition.y > this.data.coordinates.y) {
      return (this.data.martianRoverPosition = null);
    }
    return this.checkMartianRoverPositionCoordinates();
  }

  checkMartianRoverPositionCoordinates() {
    if (this.data.martianRoverPosition.x > 50) {
      this.data.martianRoverPosition.x = 50;
    }

    if (this.data.martianRoverPosition.y > 50) {
      this.data.martianRoverPosition.y = 50;
    }
  }
  set martianRoverDirection(string) {
    if (string.length > 100) {
      return (this.data.martianRoverDirection = null);
    }
    const pattern = /^[RrLlFf]+$/g;
    const isAMartianRoverDirectionString = pattern.test(string);
    if (isAMartianRoverDirectionString) {
      return (this.data.martianRoverDirection = string.toLowerCase().split(""));
    }
    return (this.data.martianRoverDirection = false);
  }

  get martianRoverDirection() {
    return this.data.martianRoverDirection;
  }

  set lostContactCoordinates(coordinates) {
    this.data.lostContactCoordinates.push(coordinates);
  }

  get lostContactCoordinates() {
    return this.data.lostContactCoordinates;
  }
};
