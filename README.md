# Zero North Vault

Zero North Vault is a **localized, personalized encryption tool** designed to help individuals protect their sensitive information. It creates a native Windows executable (`.exe`) that can be used offline, with no internet required, to securely encrypt and decrypt information using a passphrase (referred to as the **Root**).

## Features

- **Offline Protection**: The `.exe` works locally on Windows machines and doesn't require an internet connection.
- **Personalized Vault**: Every `.exe` is generated with a unique seed, ensuring no two users receive the same executable, even with the same passphrase.
- **Simple UX**: Users can download their personalized cipher, enter a root passphrase, and encrypt/decrypt text messages with a simple console-based UI.
- **Encrypt & Decrypt**: The app allows users to securely encrypt and decrypt their data locally with AES-256 encryption.

## How it Works

1. **Generate Your Vault**: Enter your passphrase (Root) in the web UI and click **Generate Vault EXE**.
2. **Download**: After generating the `.exe` file, download it to your computer.
3. **Run the EXE**: Double-click the `.exe` on your local machine.
4. **Use the Vault**: Enter your Root passphrase and select **Encode** or **Decode** to protect or access your encrypted data.

## Getting Started

To use the application:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/zero-north-vault-gen.git
   cd zero-north-vault-gen

2. **Install dependencies**:

bash
Copy
Edit
npm install
Test the backend locally by running:

bash
Copy
Edit
node dev-server.js
This will start a local server at http://localhost:3000.

3. **Build your own .exe by running**:

bash
Copy
Edit
npx pkg templates/base_vault.js --target node18-win-x64 --output "./build/vault.exe"


**Technologies Used** 

Node.js: For server-side logic and encryption.

pkg: To package the app into a self-contained Windows executable (.exe).

AES-256: Secure encryption algorithm used for protecting data.

Bolt.new: The front-end is built in Bolt for a clean, user-friendly interface.

**Contributing**

Feel free to fork the project, submit issues, or send pull requests. All contributions are welcome!

**License**

This project is licensed under the MIT License - see the LICENSE file for details.