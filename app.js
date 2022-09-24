const CommandCentre = require("./src/command-centre.js");
const MartianRover = require("./src/martian-rover.js");
const prompt = require("prompt");

prompt.start();

const command = new CommandCentre();

const dimensionsSchema = {
  properties: {
    coordinates: {
      description: "Please, enter grid dimensions",
      pattern: /^\d{1,2}?\s\d{1,2}?$/g,
      message: "Dimensions must be a pair of integers separated by a space",
      required: true,
    },
  },
};

const martianRoverPositionSchema = {
  properties: {
    martianRoverPosition: {
      description: "Please, enter Martian Rover coordinates",
      pattern: /^\d{1,2}?\s\d{1,2}\s[NnEeSsWw]$/g,
      message:
        "Coordinates must be two integers and an orientation (N, S, E, W) separated by a space",
      required: true,
    },
  },
};

const martianRoverDirectionSchema = {
  properties: {
    martianRoverDirection: {
      description: "Please, enter Martian Rover instructions",
      pattern: /^[RrLlFf]+$/g,
      message: "Instructions is a string of the letters “L”, “R”, and “F”",
      required: true,
    },
  },
};

const getAnotherMartianRoverSchema = {
  properties: {
    anotherMartianRover: {
      description: "Do you want to deploy another Martian Rover (Y)es or (N)",
      pattern: /^(?:[Yy]|[Nn])$/,
      message: "Answer is Y or N",
      required: true,
    },
  },
};

function getWorldDimensions() {
  prompt.get(dimensionsSchema, (error, result) => {
    if (result) {
      command.coordinates = result.coordinates;
    }
    getMartianRoverPosition();
  });
}

function getMartianRoverPosition() {
  prompt.get(martianRoverPositionSchema, (error, result) => {
    if (result) {
      command.martianRoverPosition = result.martianRoverPosition;
    }
    getMartianRoverInstructions();
  });
}

function getMartianRoverInstructions() {
  prompt.get(martianRoverDirectionSchema, (error, result) => {
    if (result) {
      command.martianRoverDirection = result.martianRoverDirection;
    }
    setMartianRoverInstructions();
  });
}

function setMartianRoverInstructions() {
  const martianRover = new MartianRover();
  martianRover.finalPosition = command.martianRoverPosition;
  martianRover.instructions = command.martianRoverDirection;
  martianRover.worldDimensions = command.coordinates;
  martianRover.lostContactCoordinates = command.lostContactCoordinates;

  const message = "New Position: " + martianRover.move;
  console.log(message);

  if (martianRover.data.isLost) {
    command.lostContactCoordinates = martianRover.lostCoordinates;
  }

  getAnotherMartianRover();
}

function getAnotherMartianRover() {
  prompt.get(getAnotherMartianRoverSchema, (error, result) => {
    if (result) {
      if (result.anotherMartianRover.toLowerCase() === "y") {
        getMartianRoverPosition();
      } else {
        console.log("Over and Out");
      }
    }
  });
}

function start() {
  getWorldDimensions();
}

start();
