document.getElementById('input-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const tone = document.getElementById('tone').value;
  const topic = document.getElementById('topic').value;
  const format = document.getElementById('format').value;

  const prompt = `Write a ${format} in the tone of "${tone}" about: ${topic}. Make it vivid, cinematic, emotionally textured.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_OPENAI_KEY'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();

  if (data.choices && data.choices[0].message) {
    document.getElementById('output').innerText = data.choices[0].message.content;
  } else {
    document.getElementById('output').innerText = "Something went wrong. Please try again.";
  }
});

function exportText(type) {
  const content = document.getElementById('output').innerText;
  let blob, filename;

  if (!content) {
    alert("Nothing to export.");
    return;
  }

  if (type === 'json') {
    blob = new Blob([JSON.stringify({ content })], { type: 'application/json' });
    filename = 'ayla_output.json';
  } else {
    blob = new Blob([content], { type: 'text/plain' });
    filename = 'ayla_output.txt';
  }

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
