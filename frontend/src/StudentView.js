import { useState, useEffect } from 'react';

function StudentView() {
  //For message
  const [message, setMessage] = useState('');

  //For final announcement
  const [finalMessage, setFinalMessage] = useState('');

  //Button text
  const [buttonText, setButtonText] = useState('LOAD QUIZ');

  //For loading status
  const [isPending, setIsPending] = useState(false);

  //Quiz loaded
  const [quizLoaded, setQuizLoaded] = useState(false);

  //Quiz started
  const [quizStarted, setQuizStarted] = useState(false);

  //Quiz size
  const [quizSize, setQuizSize] = useState(0);

  //Quiz status (complete or not)
  const [quizComplete, setQuizComplete] = useState(false);

  //Current word list available
  const [quizWords, setQuizWords] = useState(null);

  //Current quiz word index
  const [currentIndex, setCurrentIndex] = useState(0);

  //Current word in the quiz
  const [currentWord, setCurrentWord] = useState(
    quizWords ? quizWords[currentIndex].english : 'undefined'
  );

  //The corresponding Finnish word (right answer)
  const [correctWord, setCorrectWord] = useState(
    quizWords ? quizWords[currentIndex].finnish : 'undefined'
  );

  //quizLoaded ? quizWords[currentIndex].english : 'Failed to load'

  //List of given answers
  const [answers, setAnswers] = useState([]);
  //The current answer (from input field)
  const [answer, setAnswer] = useState('');

  //Correct answers
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    setCorrectAnswers(correctAnswers);
    console.log(`You got ${correctAnswers} correct!`);
    setFinalMessage(
      `You got ${correctAnswers} out of ${quizSize} words correct!`
    );
    //console.log(finalMessage);
  }, [correctAnswers, quizSize]);

  //Retrieve word list for a quiz
  async function fetchAll() {
    console.log('Retrieving...');
    try {
      setIsPending(true);
      fetch('/studentop/all')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setQuizWords(data);
        })
        .then(() => {
          //console.log(`Quiz size: ${quizWords.length}`);
          //setQuizSize(quizWords.length);
          setQuizLoaded(true);
        })
        .then(() => {
          setButtonText('START');
          setMessage('Quiz ready!');
          setIsPending(false);
        });
    } catch (error) {
      setMessage('Error with fetching data!');
      setIsPending(false);
    }

    //let hr = await fetch('/student/all');
    //let data = await hr.json();
    //Test if query works
    //console.log(data);
  }

  //For starting the quiz
  function handleStart() {
    setQuizSize(quizWords.length);
    setQuizStarted(true);
    setCurrentIndex(0);
    console.log(`Current word: ${quizWords[currentIndex].finnish}`);
    console.log(`Quiz size: ${quizWords.length}`);

    setCurrentWord(quizWords[currentIndex].english);
    setCorrectWord(quizWords[currentIndex].finnish);

    //setQuizLoaded(true);
  }

  //For handling the given answer and following actions
  function handleAnswer(e) {
    e.preventDefault();

    //Create an answer
    const savedAnswer = {
      id: currentIndex,
      finnish: answer,
    };

    //Add the answer to the answer list
    let answered = answers;
    answered.push(savedAnswer);
    console.log(answers);
    setAnswers(answered);

    //Clean the input field
    setAnswer('');

    console.log(answers.length);
    console.log(`Current index: ${currentIndex}`);
    console.log(`Current words: ${currentWord} and ${correctWord}`);

    //Check if the given answer is correct
    if (
      answer.toLowerCase() === quizWords[currentIndex].finnish.toLowerCase()
    ) {
      setMessage('Correct!');
      let correct = correctAnswers + 1;
      setCorrectAnswers(correct);
      console.log(`Correct answers: ${correctAnswers}`);
    } else {
      setMessage('Wrong answer!');
    }

    //Check if the quiz is complete, else continue
    if (answers.length === quizSize) {
      console.log('All questions answered!');
      setQuizComplete(true);
      //annouceResults();
    } else {
      //Move the index forward
      setCurrentIndex(currentIndex + 1);
      //Set next words from loaded word list
      setCurrentWord(quizWords[currentIndex].english);
      setCorrectWord(quizWords[currentIndex].finnish);
    }
  }

  //For reloading the quiz
  function reload() {
    //Keep the quiz from the database, reset everything else

    //Reset answers
    setAnswers([]);
    setCorrectAnswers(0);

    //Reset words
    setCurrentIndex(0);
    setCurrentWord(quizWords[currentIndex].english);
    setCorrectWord(quizWords[currentIndex].finnish);

    //Reset quiz status
    setQuizComplete(false);
    setMessage('');
  }

  /*
  function annouceResults() {
    const finalMessage = `You got ${correctAnswers} out of ${quizSize} words correct!`;
    console.log(finalMessage);
    setMessage('');
  }*/

  function loadInfo() {
    console.log(quizWords);
    console.log(quizSize);
    console.log(`Current words: ${currentWord} and ${correctWord}`);
  }

  return (
    <div className="student_view">
      <h1>Student</h1>
      {/*Message field*/}
      <div className="message_field">
        {message && <div className="message">{message}</div>}
        {isPending && <div>Loading...</div>}
      </div>
      {/*Load words for quiz*/}
      {!quizWords && (
        <div className="load-quiz">
          <button onClick={fetchAll}>{buttonText}</button>
        </div>
      )}

      {quizWords && !quizComplete && (
        <div className="start-quiz">
          <button onClick={handleStart}>{buttonText}</button>
        </div>
      )}

      {/*Quiz UI*/}
      {!quizComplete && quizLoaded && quizStarted && (
        <div className="quiz_field">
          <h3>Answer with Finnish equivalent:</h3>
          <form onSubmit={handleAnswer}>
            <div className="give_answer">
              <span>
                {' '}
                {quizLoaded &&
                  !quizComplete &&
                  quizWords[currentIndex].english}{' '}
              </span>
              <input
                type="text"
                onChange={(e) => setAnswer(e.target.value)}
                required
                value={answer}
              />
              <button type="submit">Answer</button>
            </div>
          </form>
        </div>
      )}
      {quizComplete && (
        <div className="retry">
          <button onClick={reload}>RETRY</button>
          <div className="announcement">
            <h2>{finalMessage}</h2>
          </div>
        </div>
      )}

      <div className="load-info">
        <button onClick={loadInfo}>LOAD INFO</button>
      </div>
    </div>
  );
}

export default StudentView;
