const chai = require("chai");
const expect = require("chai").expect;
const CommandCentre = require("../src/command-centre.js");
const MartianRover = require("../src/martian-rover.js");
const assertArrays = require("chai-arrays");
chai.use(assertArrays);

describe("Martian Rover", () => {
  const commandCentre = new CommandCentre();
  const martianRover = new MartianRover();

  describe("Intantiation", () => {
    it("should return an instance", () => {
      expect(martianRover).to.be.an.instanceof(MartianRover);
    });
  });

  describe("Constructor", () => {
    it("should have an previous position", () => {
      expect(martianRover.data.previousPosition).to.include({
        x: 0,
        y: 0,
        orientation: "n",
      });
    });

    it("should have an final position", () => {
      expect(martianRover.data.finalPosition).to.include({
        x: 0,
        y: 0,
        orientation: "n",
      });
    });

    it("should have an array of instructions", () => {
      expect(martianRover.data.instructions).to.be.array();
    });
  });

  describe("Previous position", () => {
    it("should SET a previous position", () => {
      commandCentre.coordinates = "5 3";
      commandCentre.martianRoverPosition = "2 2 E";
      martianRover.previousPosition = commandCentre.martianRoverPosition;
      expect(martianRover.data.previousPosition).to.include({
        x: 2,
        y: 2,
        orientation: "e",
      });
    });

    it("should GET a previous position", () => {
      commandCentre.coordinates = "5 3";
      commandCentre.martianRoverPosition = "2 2 E";
      martianRover.previousPosition = commandCentre.martianRoverPosition;
      expect(martianRover.previousPosition).to.include({
        x: 2,
        y: 2,
        orientation: "e",
      });
    });
  });

  describe("Final position", () => {
    it("should SET a final position", () => {
      commandCentre.coordinates = "5 3";
      commandCentre.martianRoverPosition = "2 2 E";
      martianRover.finalPosition = commandCentre.martianRoverPosition;
      expect(martianRover.data.finalPosition).to.include({
        x: 2,
        y: 2,
        orientation: "e",
      });
    });

    it("should GET a final position", () => {
      commandCentre.coordinates = "5 3";
      commandCentre.martianRoverPosition = "2 2 E";
      martianRover.finalPosition = commandCentre.martianRoverPosition;
      expect(martianRover.finalPosition).to.include({
        x: 2,
        y: 2,
        orientation: "e",
      });
    });
  });

  describe("instructions", () => {
    it("should SET instructions", () => {
      commandCentre.martianRoverDirection = "RFRFRFRF";
      martianRover.instructions = commandCentre.martianRoverDirection;
      expect(martianRover.data.instructions).to.be.equalTo([
        "r",
        "f",
        "r",
        "f",
        "r",
        "f",
        "r",
        "f",
      ]);
    });

    it("should GET instructions", () => {
      commandCentre.martianRoverDirection = "RFRFRFRF";
      martianRover.instructions = commandCentre.martianRoverDirection;
      expect(martianRover.instructions).to.be.equalTo([
        "r",
        "f",
        "r",
        "f",
        "r",
        "f",
        "r",
        "f",
      ]);
    });
  });

  describe("World enviroment", () => {
    it("should SET enviroment data", () => {
      const commandOne = new CommandCentre();
      const martianRoverOne = new MartianRover();
      commandOne.coordinates = "5 3";
      commandOne.martianRoverDirection = "RFRFRFRF";
      commandOne.martianRoverPosition = "1 1 E";
      martianRoverOne.finalPosition = commandOne.martianRoverPosition;
      martianRoverOne.instructions = commandOne.martianRoverDirection;
      martianRoverOne.worldDimensions = commandOne.coordinates;
      expect(martianRoverOne.data.dimensions).to.include({ x: 5, y: 3 });
    });
  });

  describe("Movement", () => {
    it("should move from 1 1 E to coordinate 1 1 E when instructions RFRFRFRF are set", () => {
      const commandTwo = new CommandCentre();
      const martianRoverTwo = new MartianRover();
      commandTwo.coordinates = "5 3";
      commandTwo.martianRoverDirection = "RFRFRFRF";
      commandTwo.martianRoverPosition = "1 1 E";
      martianRoverTwo.worldDimensions = commandTwo.coordinates;
      martianRoverTwo.finalPosition = commandTwo.martianRoverPosition;
      martianRoverTwo.instructions = commandTwo.martianRoverDirection;
      expect(martianRoverTwo.move).to.be.equal("1 1 E");
    });

    it("should move from 3 2 N to coordinate 3 3 N LOST when instructions FRRFLLFFRRFLL are set", () => {
      const commandThree = new CommandCentre();
      const martianRoverThree = new MartianRover();
      commandThree.coordinates = "5 3";
      commandThree.martianRoverDirection = "FRRFLLFFRRFLL";
      commandThree.martianRoverPosition = "3 2 N";
      martianRoverThree.worldDimensions = commandThree.coordinates;
      martianRoverThree.finalPosition = commandThree.martianRoverPosition;
      martianRoverThree.instructions = commandThree.martianRoverDirection;
      expect(martianRoverThree.move).to.be.equal("3 3 N LOST");
    });

    describe('Lost Martian Rover "Scent"', () => {
      describe("Given Martian Rover lost scent when next Martian Rover move then", () => {
        it("should prevent get off from the grid", () => {
          const commandThree = new CommandCentre();
          commandThree.coordinates = "5 3";
          commandThree.martianRoverDirection = "FRRFLLFFRRFLL";
          commandThree.martianRoverPosition = "3 2 N";
          martianRover.finalPosition = commandThree.martianRoverPosition;
          martianRover.instructions = commandThree.martianRoverDirection;
          martianRover.worldDimensions = commandThree.coordinates;
          martianRover.lostContactCoordinates =
            commandThree.lostContactCoordinates;
          martianRover.move;
          if (martianRover.data.isLost) {
            commandThree.lostContactCoordinates = martianRover.lostCoordinates;
          }
          const smartMartianRover = new MartianRover();
          commandThree.martianRoverDirection = "LLFFFLFLFL";
          commandThree.martianRoverPosition = "0 3 W";
          smartMartianRover.finalPosition = commandThree.martianRoverPosition;
          smartMartianRover.instructions = commandThree.martianRoverDirection;
          smartMartianRover.worldDimensions = commandThree.coordinates;
          smartMartianRover.lostContactCoordinates =
            commandThree.lostContactCoordinates;
          expect(smartMartianRover.move).to.be.equal("2 3 S");
        });
      });
    });
  });
});
