import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  async function getNotes() {
    const res = await axios.get(API_URL);
    setNotes(res.data.notes);
  }

  async function createNote(title, description) {
    await axios.post(API_URL, {
      title,
      description
    });

    await getNotes();
  }

  async function deleteNote(id) {
    await axios.delete(`${API_URL}/${id}`);
    await getNotes();
  }

  async function updateNote(id, newValue) {
    await axios.put(`${API_URL}/${id}`, {
      description: newValue
    });

    await getNotes();
  }

  async function submitHandler(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;
    const nextTitle = title.value.trim();
    const nextDescription = description.value.trim();

    if (!nextTitle || !nextDescription) {
      return;
    }

    await createNote(nextTitle, nextDescription);
    e.target.reset();
  }

  async function handleEditSubmit(e, id) {
    e.preventDefault();

    const nextDescription = editingText.trim();

    if (!nextDescription) {
      return;
    }

    await updateNote(id, nextDescription);
    setEditingId(null);
    setEditingText('');
  }

  function startEditing(note) {
    setEditingId(note._id);
    setEditingText(note.description);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingText('');
  }

  useEffect(() => {
    getNotes();
  }, []);

  const noteCountLabel = `${notes.length} ${notes.length === 1 ? 'note' : 'notes'}`;

  return (
    <div className="app">
      <div className="app-shell">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Notes workspace</span>
            <h1>Keep your ideas tidy without losing the simple layout you already built.</h1>
            <p>
              The create form, note cards, and action buttons are still here, just arranged in a
              cleaner layout that adapts better from phone screens to larger desktops.
            </p>
          </div>

          <form className="form-create-note" onSubmit={submitHandler}>
            <div className="field-grid">
              <div className="field">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" placeholder="Enter title" name="title" />
              </div>

              <div className="field">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  type="text"
                  placeholder="Enter description"
                  name="description"
                />
              </div>
            </div>

            <button type="submit" className="primary-action">
              Create Note
            </button>
          </form>
        </section>

        <section className="notes-panel">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Your collection</span>
              <h2>All notes</h2>
            </div>

            <span className="notes-count">{noteCountLabel}</span>
          </div>

          <div className="notes">
            {notes.length === 0 ? (
              <div className="empty-state">
                <h3>No notes yet</h3>
                <p>Create your first note using the form above.</p>
              </div>
            ) : (
              notes.map((note) => (
                <article className="note" key={note._id}>
                  <div className="note-content">
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                  </div>

                  {editingId === note._id ? (
                    <form className="edit-note" onSubmit={(e) => handleEditSubmit(e, note._id)}>
                      <input
                        type="text"
                        placeholder="Enter new description"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        autoFocus
                      />

                      <div className="edit-actions">
                        <button type="submit" className="primary-action">
                          Update
                        </button>
                        <button
                          type="button"
                          className="secondary-action"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="buttons">
                      <button
                        type="button"
                        className="danger-action"
                        onClick={() => deleteNote(note._id)}
                        aria-label={`Delete ${note.title}`}
                      >
                        <i className="ri-delete-bin-7-fill"></i>
                      </button>

                      <button
                        type="button"
                        className="secondary-action"
                        onClick={() => startEditing(note)}
                        aria-label={`Edit ${note.title}`}
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
