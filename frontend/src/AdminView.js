import { useState } from 'react';

function AdminView() {
  //For message
  const [message, setMessage] = useState('');

  //For loading status
  const [isPending, setIsPending] = useState(false);

  //For adding word pairs
  const [englishWord, setEnglishWord] = useState('');
  const [finnishWord, setFinnishWord] = useState('');

  //For delete word
  const [deleteWord, setDeleteWord] = useState('');

  //List of languages
  //const langList = ['english', 'finnish'];
  const langList = [
    { id: 1, name: `english` },
    { id: 2, name: `finnish` },
  ];

  //For updating words
  const [originalWord, setOriginalWord] = useState('');
  const [updateWord, setUpdateWord] = useState('');
  const [updateLang, setUpdateLang] = useState(langList[0].name);

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
      .then((res) => {
        if (res.ok) {
          setMessage('Words added successfully!');
        }
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

  //For adding words
  function handleSubmit(e) {
    e.preventDefault();

    //New word pair:
    const newWords = {
      english: englishWord,
      finnish: finnishWord,
    };
    //Call for send function
    sendWords(newWords);
  }

  //For delete
  function handleDelete(e) {
    e.preventDefault();

    //Delete word pair where:
    const deleteWordPair = {
      english: deleteWord,
    };

    setIsPending(true);
    fetch(`/deletewords/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteWordPair),
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Words deleted successfully!');
        }
        console.log(res.status);
        setIsPending(false);
      })
      .catch((error) => {
        setIsPending(false);
        setMessage(error);
      });
  }

  function handleWordUpdate(e) {
    e.preventDefault();

    //Update specifics:
    const updateDetails = {
      language: updateLang,
      original: originalWord,
      update: updateWord,
    };

    setIsPending(true);
    fetch(`/updatewords/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateDetails),
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Words updated successfully!');
        }
        console.log(res.status);
        setIsPending(false);
      })
      .catch((error) => {
        setIsPending(false);
        setMessage(error);
      });
  }

  //For updating the word (language selection)
  function handleLang(value) {
    //console.log(`Old language: ${updateLang}`);
    setUpdateLang(value);
    //console.log(`Current language: ${updateLang}`);
  }

  return (
    <div className="admin_view">
      <h1>Admin</h1>
      {/*Message field*/}
      <div className="message_field">
        {message && <div className="message">{message}</div>}
        {isPending && <div>Loading...</div>}
      </div>
      {/*Word add UI*/}
      <div className="add_wordpair">
        <h3>Add a word pair:</h3>
        <form onSubmit={handleSubmit}>
          <div className="write-words">
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
      {/*Word delete UI*/}
      <div className="delete_wordpair">
        <h3>Delete a word pair:</h3>
        <form onSubmit={handleDelete}>
          <div className="give_delete">
            <span> Give English word: </span>
            <input
              type="text"
              onChange={(e) => setDeleteWord(e.target.value)}
              required
              value={deleteWord}
            />
            <button type="submit">Delete</button>
          </div>
        </form>
      </div>
      {/*Word pair update*/}
      <div className="update_wordpair">
        <h3>Update a word:</h3>
        <form onSubmit={handleWordUpdate}>
          <div className="give_lang">
            <span> Choose language: </span>
            <select
              value={updateLang}
              onChange={(e) => handleLang(e.target.value)}
            >
              {langList.map((lang) => {
                return <option key={lang.id}>{lang.name}</option>;
              })}
            </select>
          </div>
          <div className="give_update">
            <span> Give a word: </span>
            <input
              type="text"
              onChange={(e) => setOriginalWord(e.target.value)}
              required
              value={originalWord}
            />
            <span> Update into: </span>
            <input
              type="text"
              onChange={(e) => setUpdateWord(e.target.value)}
              required
              value={updateWord}
            />
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
      {/*Show all words in console*/}
      <div className="load-all">
        <button onClick={fetchAll}> LOAD ALL </button>
      </div>
    </div>
  );
}

export default AdminView;
