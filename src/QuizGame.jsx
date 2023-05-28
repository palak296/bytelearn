import React, { useState, useEffect } from 'react';

const QuizGame = () => {
    const [options, setOptions] = useState([]);
    const [buckets, setBuckets] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showWrongAnswerMessage, setShowWrongAnswerMessage] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedItemSource, setDraggedItemSource] = useState(null);
    const [draggedItemSourceIndex, setDraggedItemSourceIndex] = useState(null);

    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const generateRandomNumbers = () => {
        const randomNumbers = Array.from({ length: 5 }, () =>
            Math.floor(Math.random() * 100)
        );
        setOptions(randomNumbers);
        setBuckets(Array(5).fill(null));
        setIsCorrect(false);
        setShowWrongAnswerMessage(false);
    };

    const handleDragStart = (event, value, source, sourceIndex) => {
        setDraggedItem(value);
        setDraggedItemSource(source);
        setDraggedItemSourceIndex(sourceIndex);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDropOption = (event, index) => {
        event.preventDefault();
        if (draggedItem !== null && draggedItemSource !== 'options') {
            if (draggedItemSource === 'buckets') {
                const updatedBuckets = [...buckets];
                updatedBuckets[draggedItemSourceIndex] = null;
                setBuckets(updatedBuckets);
            }

            if (options[index] === null || options[index] === 0) {
                const updatedOptions = [...options];
                updatedOptions[index] = draggedItem;
                setOptions(updatedOptions);
            } else {
                const updatedBuckets = [...buckets];
                updatedBuckets.push(options[index]);
                const updatedOptions = [...options];
                updatedOptions[index] = draggedItem;
                setBuckets(updatedBuckets);
                setOptions(updatedOptions);
            }

            setDraggedItem(null);
            setDraggedItemSource(null);
            setDraggedItemSourceIndex(null);
        }
    };

    const handleDropBucket = (event, index) => {
        event.preventDefault();
        if (draggedItem !== null && draggedItemSource !== 'buckets') {
            if (draggedItemSource === 'options') {
                const updatedOptions = [...options];
                updatedOptions[draggedItemSourceIndex] = null;
                setOptions(updatedOptions);
            }

            if (buckets[index] === null) {
                const updatedBuckets = [...buckets];
                updatedBuckets[index] = draggedItem;
                setBuckets(updatedBuckets);
            } else {
                const updatedOptions = [...options];
                updatedOptions.push(buckets[index]);
                const updatedBuckets = [...buckets];
                updatedBuckets[index] = draggedItem;
                setOptions(updatedOptions);
                setBuckets(updatedBuckets);
            }

            setDraggedItem(null);
            setDraggedItemSource(null);
            setDraggedItemSourceIndex(null);
        }
    };

    const handleCheckAnswers = () => {
        const sortedBuckets = [...buckets].sort((a, b) => a - b);
        const isCorrect =
            JSON.stringify(buckets) === JSON.stringify(sortedBuckets);
        setIsCorrect(isCorrect);
        setShowWrongAnswerMessage(true);
    };

    const handleResetGame = () => {
        generateRandomNumbers();
    };
    const handleTouchStart = (event, value, source, sourceIndex) => {
        event.preventDefault();
        const simulatedEvent = new MouseEvent('mousedown', {
            clientX: event.touches[0].clientX,
            clientY: event.touches[0].clientY,
        });
        handleDragStart(simulatedEvent, value, source, sourceIndex);
    };

    const handleTouchEnd = (event, index) => {
        event.preventDefault();
        handleDropOption(event, index);
        handleDropBucket(event, index);
    };



    const isButtonDisabled = buckets.includes(null);

    return (
        <div className="bg-[#12164f] text-white min-h-screen">
            <nav className="px-4 py-2">
                <div className="container mx-auto flex items-center justify-center">
                    <h1 className="text-[#20b9a2] font-bold text-6xl">
                        Quiz <span className="text-white">Game</span>
                    </h1>
                </div>
            </nav>

            <div className="container mx-auto py-4">
                <p className="md:text-xl text-lg font-bold md:mb-10 md:mt-10 text-center  text-[#f9c359]">
                    <span className="typewriter">Arrange the values in ascending order:</span>
                </p>

                <div className="flex flex-row gap-6 justify-center items-start">
                    <div className="flex flex-col   ">
                        <div className="md:text-lg text-base font-bold mb-2">Options:</div>
                        <div className="space-y-3">
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    className="bg-purple-200 p-5 rounded cursor-move transform transition-all duration-300 hover:bg-purple-400 hover:shadow-lg text-black font-bold"
                                    draggable="true"
                                    onTouchStart={(event) =>
                                        handleTouchStart(event, option, 'options', index)
                                    }
                                    onTouchEnd={(event) => handleTouchEnd(event, index)}
                                    onDragStart={(event) =>
                                        handleDragStart(event, option, 'options', index)
                                    }
                                    onDragOver={handleDragOver}
                                    onDrop={(event) => handleDropOption(event, index)}
                                >
                                    <span className="pr-2">&#8801;</span>
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:w-1/4">
                        <h2 className="md:text-lg text-base font-bold mb-2">Sort the Values:</h2>
                        <div className="space-y-3">
                            {buckets.map((bucket, index) => (
                                <div
                                    key={index}
                                    className={`bg-blue-200 md:p-4 p-5  rounded cursor-move ${bucket === null ? 'border-2 border-dashed' : ' border-2 shadow-lg'
                                        } transform transition-all duration-300 hover:scale-105 text-black md:text-lg text-base border-black`}
                                    draggable="true"
                                    onTouchStart={(event) =>
                                        handleTouchStart(event, bucket, 'buckets', index)
                                    }
                                    onTouchEnd={(event) => handleTouchEnd(event, index)}
                                    onDragStart={(event) =>
                                        handleDragStart(event, bucket, 'buckets', index)
                                    }
                                    onDragOver={handleDragOver}
                                    onDrop={(event) => handleDropBucket(event, index)}
                                >
                                    {bucket !== null ? bucket : 'Drop Here'}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-4 ">
                    <button
                        className="bg-green-400 hover:bg-green-600 px-4 py-2 text-black font-bold rounded mr-2 disabled:bg-green-200 disabled:cursor-not-allowed transition-all duration-300"
                        onClick={handleCheckAnswers}
                        disabled={isButtonDisabled}
                    >
                        Check
                    </button>

                    <button
                        className="bg-yellow-200 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded transition-all duration-300"
                        onClick={handleResetGame}
                    >
                        Reset
                    </button>
                </div>
{isCorrect && (
  <p className="mt-4 text-green-600 font-bold text-center">
    <span className="mr-2">&#10003;</span>Congratulations! Your answer is correct.
  </p>
)}
{buckets.includes(null) && showWrongAnswerMessage && (
  <p className="mt-4 text-red-600 font-bold text-center">
    <span className="mr-2">&#9888;</span>Please fill all the input buckets.
  </p>
)}
{!isCorrect && !buckets.includes(null) && showWrongAnswerMessage && (
  <p className="mt-4 text-red-600 font-bold text-center">
    <span className="mr-2">&#10007;</span>Sorry, your answer is incorrect.
  </p>
)}

            </div>
        </div>
    );
};

export default QuizGame;
