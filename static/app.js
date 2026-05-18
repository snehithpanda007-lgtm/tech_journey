const exprEl = document.getElementById('expr');
const calcBtn = document.getElementById('calcBtn');
const clearBtn = document.getElementById('clearBtn');
const resultEl = document.getElementById('result');

async function calculate() {
  const expr = exprEl.value.trim();
  if (!expr) return;
  resultEl.textContent = 'Calculating...';
  try {
    const res = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expr }),
    });
    if (!res.ok) {
      const err = await res.json();
      resultEl.textContent = 'Error: ' + (err.detail || res.statusText);
      return;
    }
    const data = await res.json();
    resultEl.textContent = 'Result: ' + data.result;
  } catch (e) {
    resultEl.textContent = 'Error: ' + e.message;
  }
}

calcBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', () => {
  exprEl.value = '';
  resultEl.textContent = 'Result: —';
});

exprEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calculate();
});
