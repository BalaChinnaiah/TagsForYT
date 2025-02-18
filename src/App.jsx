import React, { useState } from 'react';

const App = () => {

  // Define The State Variables

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Tags from API
  const fetchTags = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(`https://rappid.in/apis/youtube_tags.php?title=${title}`)}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      const data = JSON.parse(json.contents);

      // Check if the data is an array or object and handle accordingly
      const tagsArray = Array.isArray(data) ? data : data.tags || [];

      setTags(tagsArray);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
    setLoading(false);
  };

  // Remove a specific tag
  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  // Copy all tags to clipboard
  const copyAllTags = () => {
    const tagsString = tags.join(', ');
    navigator.clipboard.writeText(tagsString)
      .then(() => alert('Tags copied to clipboard!'))
      .catch((err) => console.error('Failed to copy tags:', err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">YouTube Tag Generator</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <input
          type="text"
          placeholder="Enter YouTube video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={fetchTags}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Tags'}
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated Tags:</h2>
        <div className="flex flex-wrap gap-2 p-4 border rounded-md min-h-[100px] bg-gray-50">

          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <div key={index} className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-full flex items-center">
                {tag}
                <button
                  onClick={() => removeTag(index)}
                  className="ml-2 text-red-500 hover:text-red-700 font-bold"
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tags generated yet.</p>
          )}

          
        </div>

        {tags.length > 0 && (
          <button
            onClick={copyAllTags}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Copy All Tags
          </button>
        )}
      </div>

      <footer className='mt-6'>  <p>© 2025 TagsForYT. All rights reserved By Bala Chinnaiah</p> </footer>


    </div>
  );
};

export default App;
