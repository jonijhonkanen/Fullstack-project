import { useState, useEffect } from 'react';

function AdminView() {
  //For message
  const [message, setMessage] = useState('');

  //For loading status
  const [isPending, setIsPending] = useState(false);

  //For word pairs
  const [englishWord, setEnglishWord] = useState('');
  const [finnishWord, setFinnishWord] = useState('');

  //For testing (view all word pairs in console)
  async function fetchAll() {
    try {
      setIsPending(true);
      let hr = await fetch('/all');
      let data = await hr.json();
      //Test if query works
      console.log(data);
    } catch (error) {
      setMessage('Error with fetching data!');
    } finally {
      setMessage('');
      setIsPending(false);
    }
    //let hr = await fetch('/all');
    //let data = await hr.json();
    //Test if query works
    //console.log(data);
  }

  //Send the words
  async function sendWords(newWords) {
    console.log(newWords);

    setIsPending(true);
    fetch(`/addwords/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWords),
    })
      .then(() => {
        setIsPending(false);
      })
      .catch((error) => {
        setIsPending(false);
        setMessage(error);
      });

    /*
    let hr = await fetch(`/addwords/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWords),
    });
    */
  }

  function handleSubmit(e) {
    e.preventDefault();

    //New word pair:
    const newWords = {
      english: englishWord,
      finnish: finnishWord,
    };

    //console.log(newWords);
    //Call for send function
    sendWords(newWords);
  }

  return (
    <div className="admin_view">
      <h1>Admin</h1>
      <div className="message_field">
        {message && <div className="message">{message}</div>}
        {isPending && <div>Loading...</div>}
      </div>
      <div className="add_wordpair">
        <h3>Add a word pair:</h3>
        <form onSubmit={handleSubmit}>
          <div className="write-description">
            <span> English: </span>
            <input
              type="text"
              onChange={(e) => setEnglishWord(e.target.value)}
              required
              value={englishWord}
            />
            <span> Finnish: </span>
            <input
              type="text"
              onChange={(e) => setFinnishWord(e.target.value)}
              required
              value={finnishWord}
            />
            <button type="submit">Add words</button>
          </div>
        </form>
      </div>
      <div className="load-all">
        <button onClick={fetchAll}> LOAD ALL </button>
      </div>
    </div>
  );
}

export default AdminView;
