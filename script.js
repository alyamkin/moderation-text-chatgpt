const button = document.getElementById('submit');
const textArea = document.getElementById('textArea');
const originalText = document.getElementById('originalText');
const moderatedText = document.getElementById('moderatedText');
const errors = document.getElementById('errors');

button.addEventListener('click', submit);

const apiKey = '';

async function moderateText(text) {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Moderate the following text to mask offensive words: ${text}`,
      max_tokens: 100,
      temperature: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].text.trim();
}

function submit(event) {
  event.preventDefault();
  const inputText = textArea.value;
  originalText.textContent = inputText;
  moderateText(inputText)
    .then((moderated) => {
      moderatedText.textContent = moderated;
    })
    .catch((error) => {
      errors.textContent = error.message;
    });
}
