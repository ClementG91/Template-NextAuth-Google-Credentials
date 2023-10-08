# Installation

## Prerequisites

Make sure you have [Node.js](https://nodejs.org) installed on your machine.

## Cloning the Project

1. Clone this GitHub repository to your computer using the following command:
   ```bash
   git clone https://github.com/ClementG91/Template-NextAuth-Google-Credentials.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Template-NextAuth-Google-Credentials
   ```
3. Install the dependencies using npm:
   ```bash
   npm install
   ```

# Configuration

## OAuth Configuration

### Google OAuth

1. **Create a Google Project:**
   To set up Google authentication, you need to create a Google project on the [Google Cloud Console](https://console.cloud.google.com/).

   Once your project is created, follow these steps:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Select your project or create a new one.
   - In the navigation menu, choose "APIs & Services" > "Credentials."
   - Click "Create Credentials" and select "OAuth client ID."
   - Configure your client ID by providing the required information. Make sure to add the appropriate redirect URL (likely `http://localhost:3000/api/auth/callback/google` and `http://localhost:3000/admin` during development).
   - Once your client ID is created, copy the values for `GOOGLE_CLIENT_SECRET` and `GOOGLE_CLIENT_ID` into your `.env` file.

2. **Google API Permissions:**
   You may also need to configure permissions for accessing the Google API.
   To do this, navigate to the "Credentials" section of your Google Cloud project and set the necessary permissions.

### GitHub OAuth

1. **Create a GitHub OAuth Application:**
   To configure GitHub authentication, you'll need to create a GitHub OAuth application.

   Here's how to do it:

   - Go to [GitHub Developer Settings](https://github.com/settings/developers).
   - Under "OAuth Apps," click "New OAuth App."
   - Configure your application by providing the required information, including the authorization callback URL (likely `http://localhost:3000/api/auth/callback/github` and `http://localhost:3000/admin` during development).
   - Once your application is created, copy the values for `GITHUB_ID` and `GITHUB_SECRET` into your `.env` file.

2. **Set Application Permissions:**
   In the settings for your GitHub OAuth application, you can define the necessary access permissions for your application. Make sure to configure these permissions based on your application's requirements.

After following these steps for Google and GitHub, you should have successfully configured OAuth authentication for your Next.js application. Don't forget to refer to Google's and GitHub's specific documentation guides for additional details if needed.

## Before Running the Server

Before running the server, you need to set up the required environment variables for authentication. Follow these steps:

1. Create a .env file at the root of the project.

2. Inside the .env file, add the following configuration values. Replace the placeholders with your actual credentials:

   ```bash
   # Database connection URL (MongoDB in this example)
   DATABASE_URL="mongodb+srv://username:password@clustername.mongodb.net/databasename"

   # Secret key for NextAuth
   NEXTAUTH_SECRET="MySuperNextAuthSecret"

   # URL where your application is hosted (usually http://localhost:3000 for development)
   NEXTAUTH_URL="http://localhost:3000"

   # Google OAuth credentials
   GOOGLE_CLIENT_SECRET="MySuperGoogleClientSecret"
   GOOGLE_CLIENT_ID="MySuperGoogleClientId"

   # GitHub OAuth credentials
   GITHUB_ID="MySuperGithubId"
   GITHUB_SECRET="MySuperGithubSecret"
   ```

   Additionally, ensure that you replace placeholders like username, password, clustername, and other credentials with your actual values. Note: Make sure to secure this .env file, as it contains sensitive information.

## Database Setup

### MongoDB Setup

Before running the server, set up your MongoDB database:

1. **Create a MongoDB Atlas Account:**

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Sign up and log in.

2. **Create a MongoDB Cluster:**

   - In the dashboard, click "Build a Cluster."
   - Choose a cloud provider and region.
   - Click "Create Cluster."

3. **Create a Database User:**

   - In "Database Access," add a new user with admin privileges.
   - Remember the username and password.

4. **Get Connection String:**

   - In the cluster settings, click "Connect."
   - Choose "Connect Your Application" (Node.js).
   - Copy the connection string with your credentials.

5. **Update .env File:**

   - Open your `.env` file.
   - Replace `DATABASE_URL` with the copied connection string.

6. **Initialize Database:**

   - Run `npx prisma db push` to create tables and schema.

7. **Prisma Studio (Optional):**
   - Run `npx prisma studio` to interact with your database.

## Running the Server

Start your Next.js server:

```bash
npm run dev
```

This will start the server and make your application accessible at the specified address (usually http://localhost:3000).
