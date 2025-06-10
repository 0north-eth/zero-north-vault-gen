// At top of renderer.js
document.getElementById('timestamp').textContent =
  'Vault generated at: ' + new Date().toISOString();

// renderer.js
const { clipboard } = require('electron');
const crypto = require('crypto');

// Derive a 256-bit key from the root
function getKeyFromRoot(root) {
  return crypto.createHash('sha256').update(root).digest();
}

function encode(root, text) {
  const key = getKeyFromRoot(root);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decode(root, data) {
  try {
    let [ivHex, encHex] = data.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encHex, 'hex');
    const key = getKeyFromRoot(root);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch {
    return '❌ Invalid root or corrupted data';
  }
}

window.onload = () => {
  const rootInput = document.getElementById('root');
  const textInput = document.getElementById('input');
  const outputBox = document.getElementById('output');
  const encodeBtn = document.getElementById('encodeBtn');
  const decodeBtn = document.getElementById('decodeBtn');

  encodeBtn.onclick = () => {
    const root = rootInput.value.trim();
    const text = textInput.value;
    if (!root || !text) return alert('Please enter both a root and text.');
    const cipher = encode(root, text);
    outputBox.value = cipher;
    clipboard.writeText(cipher);
    alert('Encrypted! Copied to clipboard.');
  };

  decodeBtn.onclick = () => {
    const root = rootInput.value.trim();
    const cipher = textInput.value;
    if (!root || !cipher) return alert('Please enter both a root and ciphertext.');
    const plain = decode(root, cipher);
    outputBox.value = plain;
    if (!plain.startsWith('❌')) {
      clipboard.writeText(plain);
      alert('Decrypted! Copied to clipboard.');
    }
  };
};