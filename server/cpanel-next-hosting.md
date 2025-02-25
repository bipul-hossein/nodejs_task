When deploying a **Next.js 15 App Router** website in a Node.js environment (like cPanel with Node.js support), you need to specify the correct **startup file** for your application. For Next.js, the startup file is the entry point that runs the production server.

---

### **Startup File for Next.js App Router**
For a Next.js app using the App Router, the startup file is typically the `next start` command, which serves the built application from the `.next` directory. Here's how to configure it:

---

### **Step 1: Build Your Next.js App**
1. Run the build command to generate the production files:
   ```bash
   npm run build
   ```
   This creates a `.next` directory containing the optimized production build.

2. Test the production build locally:
   ```bash
   npm start
   ```
   This runs the `next start` command, which serves your app on `http://localhost:3000`.

---

### **Step 2: Set the Startup File in cPanel**
In cPanel's Node.js app settings, you need to specify the startup file or command. Here's how:

1. **Startup File**:
   - If cPanel requires a specific file (e.g., `server.js` or `index.js`), create a file named `server.js` in the root of your project with the following content:
     ```javascript
     const { createServer } = require('http');
     const next = require('next');

     const dev = process.env.NODE_ENV !== 'production';
     const app = next({ dev });
     const handle = app.getRequestHandler();

     app.prepare().then(() => {
       createServer((req, res) => {
         handle(req, res);
       }).listen(3000, (err) => {
         if (err) throw err;
         console.log('> Ready on http://localhost:3000');
       });
     });
     ```
   - This file is a custom Node.js server that starts your Next.js app.

2. **Startup Command**:
   - If cPanel allows you to specify a startup command instead of a file, use:
     ```bash
     npm start
     ```
     This runs the `next start` command defined in your `package.json` scripts.

---

### **Step 3: Configure cPanel Node.js App**
1. In cPanel, go to the **Node.js Selector** or **Setup Node.js App**.
2. Set the **Application Root** to the directory where your Next.js app is located (e.g., `public_html/your-app`).
3. Set the **Application URL** to your domain or subdomain.
4. Set the **Startup File** to `server.js` (if you created it) or leave it blank if you're using the startup command.
5. Set the **Startup Command** to `npm start` (if applicable).
6. Save the configuration.

---

### **Step 4: Install Dependencies and Start the App**
1. Open the terminal in cPanel or use SSH to access your server.
2. Navigate to your app's directory:
   ```bash
   cd ~/public_html/your-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm start
   ```

---

### **Step 5: Set Up a Reverse Proxy (Optional)**
If your Node.js app runs on a specific port (e.g., `3000`), set up a reverse proxy to map it to your domain:
1. In cPanel, go to **Domains** > **Redirects** or **Apache Handlers**.
2. Add the following reverse proxy rules:
   ```apache
   ProxyPass / http://localhost:3000/
   ProxyPassReverse / http://localhost:3000/
   ```

---

### **Step 6: Test Your App**
1. Visit your domain (e.g., `yourdomain.com`) in a browser.
2. Verify that your Next.js app is running correctly.

---

### **Troubleshooting**
- **Port Conflicts**: Ensure no other app is using the same port (e.g., `3000`).
- **Permissions**: Ensure your app's directory has the correct permissions (e.g., `755` for directories and `644` for files).
- **Logs**: Check the logs in cPanel's Node.js app settings or use `pm2 logs` if you're using PM2.

---

By following these steps, you should be able to deploy your Next.js 15 App Router website successfully. Let me know if you need further assistance!
