const chai = require("chai");
const expect = require("chai").expect;
const assertArrays = require("chai-arrays");
const CommandCentre = require("../src/command-centre.js");
chai.use(assertArrays);
chai.should();
chai.use(require("chai-things"));

describe("CommandCentre", () => {
  let commandCentre;
  before(() => {
    commandCentre = new CommandCentre();
  });

  describe("coordinates", () => {
    before(() => {
      commandCentre.coordinates = "5 3";
    });
    it("should set coordinates", () => {
      expect(commandCentre.data.coordinates).to.include({ x: 5, y: 3 });
    });

    it("should get coordinates", () => {
      expect(commandCentre.coordinates).to.include({ x: 5, y: 3 });
    });
    it("should return false when user input does not match coordinates pattern", () => {
      const command = new CommandCentre();
      command.coordinates = "aa bb";
      expect(command.coordinates).to.be.false;
    });
  });

  describe("Martian Rover position", () => {
    it("should set Martian Rover position", () => {
      commandCentre.martianRoverPosition = "1 1 E";
      expect(commandCentre.data.martianRoverPosition).to.include({
        x: 1,
        y: 1,
        orientation: "e",
      });
    });

    it("should get Martian Rover position", () => {
      commandCentre.martianRoverPosition = "2 2 N";
      expect(commandCentre.martianRoverPosition).to.include({
        x: 2,
        y: 2,
        orientation: "n",
      });
    });

    describe("Martian Rover direction", () => {
      it("should set a Martian Rover direction", () => {
        commandCentre.martianRoverDirection = "FRRFLLFFRRFLL";
        expect(commandCentre.data.martianRoverDirection).to.to.be.equalTo([
          "f",
          "r",
          "r",
          "f",
          "l",
          "l",
          "f",
          "f",
          "r",
          "r",
          "f",
          "l",
          "l",
        ]);
        expect(commandCentre.data.martianRoverDirection[0]).to.be.equal("r");
        expect(
          commandCentre.data.martianRoverDirection[
            commandCentre.data.martianRoverDirection.length - 1
          ]
        ).to.be.equal("f");
      });

      it("should get a Martian Rover direction", () => {
        commandCentre.martianRoverDirection = "RFRFRFRF";
        expect(commandCentre.martianRoverDirection).to.be.equalTo([
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
  });
});
