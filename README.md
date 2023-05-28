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
The Quiz Game is a React component that utilizes various React features such as state management, useEffect, and event handling to create an interactive quiz experience. Let's go through the different aspects of the component:

## State Management
The Quiz Game component uses the useState hook to manage different aspects of the game. Here are the states used:

options: This state holds an array of numbers representing the options for the user to arrange. It is initially empty and is populated with random numbers in the generateRandomNumbers function.
buckets: This state holds an array representing the user's arrangement of numbers. It is initially an array of null values and is updated when the user performs drag and drop actions.
isCorrect: This state is a boolean value that indicates whether the user's arrangement is correct or not. It is updated when the user clicks the "Check" button.
showWrongAnswerMessage: This state is a boolean value that determines whether to show an error message when the user's arrangement is incorrect. It is updated when the user clicks the "Check" button.
draggedItem, draggedItemSource, draggedItemSourceIndex: These states hold information about the item being dragged and the source from which it was dragged. They are updated during drag and drop actions.
Generating Random Numbers
The generateRandomNumbers function is called in the useEffect hook with an empty dependency array, ensuring it runs only once when the component mounts. It generates an array of random numbers using Math.random() and sets the options state with these numbers. It also resets other states like buckets, isCorrect, and showWrongAnswerMessage.

## Drag and Drop Functionality
The handleDragStart function is called when an item is dragged from either the "Options" or the "Sort the Values" section. It updates the draggedItem, draggedItemSource, and draggedItemSourceIndex states with the relevant information.

The handleDragOver function is used to prevent the default behavior of the dragover event.

The handleDropOption function is called when an item is dropped into an option slot. It checks if the dragged item is from the "Sort the Values" section and updates the buckets state accordingly. If the dropped option slot is empty or contains the value 0, the dragged item is placed in that slot. Otherwise, the dragged item is added to the buckets state, and the previous option in that slot is moved to the options state.

The handleDropBucket function is similar to handleDropOption but handles dropping items into the "Sort the Values" section. It checks if the dragged item is from the "Options" section and updates the options state accordingly. If the dropped bucket slot is empty, the dragged item is placed in that slot. Otherwise, the dragged item is added to the options state, and the previous bucket item in that slot is moved to the buckets state.

## Checking the Answers
The handleCheckAnswers function is called when the user clicks the "Check" button. It sorts a copy of the buckets state and checks if it matches the original buckets state. If the arrangement is correct, the isCorrect state is set to true. If the arrangement is incorrect, the showWrongAnswerMessage state is set to true.

## Resetting the Game
The handleResetGame function is called when the user clicks the "Reset" button. It calls the generateRandomNumbers function to reset the game by generating new random numbers and resetting the states.

## Rendering the UI
The JSX code within the return statement defines the UI of the Quiz Game. It utilizes various CSS classes and properties to style the elements and create the desired layout. It uses the mapped arrays of options and buckets to render the draggable and droppable elements.

The success and error messages are conditionally rendered based on the isCorrect, showWrongAnswerMessage, and buckets states.

That's a brief overview of how the components and the Quiz Game work behind the scenes. Feel free to explore the code and make further customizations as per your requirements.
