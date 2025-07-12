# Step-by-Step Git Setup Guide for Srilakhmi Traders Website

## Part 1: Create GitHub Account (if you don't have one)

### Step 1: Sign Up for GitHub
1. Go to **github.com**
2. Click "Sign up" 
3. Enter your email address
4. Create a password
5. Choose a username (example: srilakhmi-traders)
6. Verify your email

### Step 2: Verify Your Account
1. Check your email for verification link
2. Click the link to verify
3. Complete the setup questions

---

## Part 2: Create a New Repository

### Step 3: Create Repository
1. After logging in, click the **green "New"** button (or "+" icon)
2. Fill in the details:
   - **Repository name**: `srilakhmi-traders-website`
   - **Description**: `Professional wood and interior solutions business website`
   - **Public** or **Private**: Choose Public (free hosting works with public repos)
   - **Do NOT check** "Add a README file" (we already have one)
3. Click **"Create repository"**

### Step 4: Copy Repository URL
After creating, you'll see a page with setup instructions. Copy the repository URL:
- It looks like: `https://github.com/yourusername/srilakhmi-traders-website.git`

---

## Part 3: Upload Your Project Files

### Method A: Using GitHub Web Interface (Easiest)

#### Step 5: Upload Files via Web
1. On your new repository page, click **"uploading an existing file"**
2. **Drag and drop** ALL your project files:
   - All folders: `client`, `server`, `shared`
   - All files: `package.json`, `tsconfig.json`, `vite.config.ts`, etc.
   - All the deployment files I created: `netlify.toml`, `vercel.json`, etc.

#### Step 6: Commit Your Files
1. Scroll down to "Commit changes"
2. Add commit message: `Initial commit - Srilakhmi Traders website`
3. Click **"Commit changes"**

### Method B: Using Git Commands (if you prefer terminal)

#### Step 5: Initialize Git (in your project folder)
```bash
git init
git add .
git commit -m "Initial commit - Srilakhmi Traders website"
```

#### Step 6: Connect to GitHub
```bash
git remote add origin https://github.com/yourusername/srilakhmi-traders-website.git
git branch -M main
git push -u origin main
```

---

## Part 4: Deploy to Free Hosting

### Now your code is on GitHub! Choose your hosting platform:

#### Option A: Netlify (Recommended)
1. Go to **netlify.com** and login
2. Click **"New site from Git"**
3. Click **"GitHub"** and authorize
4. Select your repository: `srilakhmi-traders-website`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
6. Click **"Deploy site"**
7. Your site will be live in 2-3 minutes!

#### Option B: Vercel
1. Go to **vercel.com** and login
2. Click **"New Project"**
3. Import your GitHub repository
4. Click **"Deploy"**
5. Vercel auto-configures everything!

#### Option C: Render
1. Go to **render.com** and login
2. Click **"New Web Service"**
3. Connect your GitHub repository
4. Configure:
   - Build command: `npm run build`
   - Start command: `npm start`
5. Click **"Create Web Service"**

---

## Part 5: Test Your Live Website

### Step 7: Test Everything
After deployment, test your live website:

1. **Homepage**: Check if it loads properly
2. **Services**: Browse the services page
3. **Admin Login**: 
   - Find the tiny dot button on homepage
   - Login with: admin / srilakhmi123
   - Test service management
4. **Contact Form**: Try submitting an inquiry

### Step 8: Get Your Live URL
Your website will be available at:
- Netlify: `yoursite.netlify.app`
- Vercel: `yoursite.vercel.app`
- Render: `yoursite.onrender.com`

---

## Part 6: Making Updates Later

### When you want to update your website:

#### Using GitHub Web Interface:
1. Go to your repository on GitHub
2. Click on the file you want to edit
3. Click the pencil icon to edit
4. Make your changes
5. Commit changes
6. Your hosting platform will automatically update!

#### Using Git Commands:
```bash
# Make your changes to files
git add .
git commit -m "Update services or content"
git push
```

---

## Troubleshooting

### If Upload Fails:
- Make sure you're uploading ALL files and folders
- Check file size limits (GitHub has 100MB limit per file)
- Try uploading in smaller batches if needed

### If Deployment Fails:
- Check build logs in your hosting platform
- Ensure all files were uploaded correctly
- Contact platform support (they're very helpful!)

### If Admin Login Doesn't Work:
- Clear browser cache
- Try in incognito/private mode
- Check console for errors

---

## 🎉 Success!

Once completed, you'll have:
- ✅ Your code safely stored on GitHub
- ✅ Professional website live on the internet
- ✅ Free hosting with automatic updates
- ✅ Secure admin panel for managing your business
- ✅ Professional email to share with customers

## Need Help?

Each platform has excellent support:
- **GitHub**: help.github.com
- **Netlify**: netlify.com/support
- **Vercel**: vercel.com/support
- **Render**: render.com/docs

Your website is ready to help grow your wood and interior business!