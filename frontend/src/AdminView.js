import { useState, useEffect } from 'react';

function AdminView() {
  //For message
  const [message, setMessage] = useState('');

  //For loading status
  const [isPending, setIsPending] = useState(false);

  async function fetchAll() {
    let hr = await fetch('/all');
    let data = await hr.json();
    //Test if query works
    console.log(data);
  }

  return (
    <div className="admin_view">
      <h1>Admin</h1>
      <div className="message_field">
        <div className="load-all">
          <button onClick={fetchAll}> LATAA KAIKKI </button>
        </div>
      </div>
    </div>
  );
}

export default AdminView;
