# Quiz Game

The Quiz Game is a React component that presents a quiz where the user needs to arrange a set of numbers in ascending order. The component provides a draggable and droppable interface for the user to interact with.

## Features

- Randomly generated set of numbers as options.
- Drag and drop functionality to arrange the numbers.
- Check button to verify the user's answer.
- Reset button to restart the game.
- Success and error messages based on the user's answer.

## Installation

1. Clone the repository or download the source code.

2. Navigate to the project directory.

3. Install the dependencies by running the following command:

   ```bash
   npm install
   npm run dev
   
## Usage
import React from 'react';
import QuizGame from './QuizGame';

const App = () => {
  return (
    <div>
      <QuizGame />
    </div>
  );
};

export default App;

