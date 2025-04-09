# Playwright API Testing Project (pw-ukol)

This project contains API tests for the specified endpoints, written using Playwright and TypeScript.

## Tools and Libraries Used

* [Node.js](https://nodejs.org/) (Specify version if necessary, e.g., v18+)
* [NPM](https://www.npmjs.com/) (Comes with Node.js)
* [Playwright](https://playwright.dev/) for API testing
* [TypeScript](https://www.typescriptlang.org/)
* [dotenv](https://www.npmjs.com/package/dotenv) for environment variable management

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd pw-ukol
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(This command should work on both Windows and macOS)*

3.  **Set up environment variables:**
    * Create a file named `.env` in the project root directory (`pw-ukol`).
    * Add necessary environment variables (if any). For example:
        ```plaintext
        # Example - Add any real variables needed, like API keys or specific ENV setting
        # ENV=dev
        # UNAME=your_username
        # PWORD=your_password
        ```

## Running Tests

1.  **Run all tests:**
    ```bash
    npx playwright test
    ```

2.  **Run tests for a specific environment (if configured):**
    * Make sure the corresponding `config_<env>.json` file exists in `data/envs/`.
    * Set the `ENV` variable when running (example for 'staging'):

        * **Windows (Command Prompt):**
            ```bash
            set ENV=staging && npx playwright test
            ```
        * **Windows (PowerShell):**
            ```bash
            $env:ENV="staging"; npx playwright test
            ```
        * **macOS / Linux:**
            ```bash
            ENV=staging npx playwright test
            ```

3.  **View the HTML Report:**
    After running tests, you can view the detailed HTML report:
    ```bash
    npx playwright show-report
    ```
