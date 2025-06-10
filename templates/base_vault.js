// templates/base_vault.js
const crypto   = require('crypto');
const readline = require('readline');

function getKeyFromRoot(root) {
  return crypto.createHash('sha256').update(root).digest();
}

function encode(root, text) {
  const key    = getKeyFromRoot(root);
  const iv     = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decode(root, data) {
  try {
    const [ivHex, encryptedHex] = data.split(':');
    const key      = getKeyFromRoot(root);
    const iv       = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher  = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch {
    return '❌ Invalid root or corrupted data';
  }
}

function runVault() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter your Root: ', (root) => {
    console.log('\n‼️  **Remember your Roots!** This is your first layer of encryption—your secret codes to access data.\n');
    rl.question('Encode or Decode? (e/d): ', (mode) => {
      if (mode === 'e') {
        rl.question('Text to encode: ', (text) => {
          const out = encode(root, text);
          console.log('\n🔐 Encrypted:', out);
          console.log('\n📋 **Copy this encrypted output! This is your encoded information.**\n');
          rl.close();
          promptRestart();
        });
      } else {
        rl.question('Encrypted string to decode: ', (cipher) => {
          const out = decode(root, cipher);
          console.log('\n🔓 Decrypted:', out);
          rl.close();
          promptRestart();
        });
      }
    });
  });
}

function promptRestart() {
  const fin = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  fin.question('Press ENTER to exit, or type R to process more data: ', (answer) => {
    fin.close();
    if (answer.trim().toLowerCase() === 'r') {
      console.log('\n↺ Restarting...\n');
      runVault();
    } else {
      console.log('\nGoodbye!\n');
      process.exit(0);
    }
  });
}

// Start the vault
runVault();
