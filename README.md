# RESTy

RESTy is a simple API testing application built with React. It allows users to make HTTP requests and view the responses in a user-friendly format.

## Author

**Jedidiah Staley**

## Features

- Make GET, POST, PUT, and DELETE requests to any API endpoint.
- View the response headers and body in a formatted manner.
- Keep a history of past requests and their responses.
- Easily re-execute previous requests from the history.
- View a list of recent requests and re-execute them.

## WireFrame and UDL

  [WireFrame Diagram](./wireframe.png)

## Installation

1. Clone the repository:
  
    ```bash
    git clone <repository_url>
    cd resty
    ```

2. Install the dependencies:
  
    ```bash
    npm install
    ```

3. Start the development server:
  
    ```bash
    npm run dev
    ```

## Usage

1. Enter the URL and select the HTTP method (GET, POST, PUT, DELETE).
2. (Optional) Enter the request body for POST and PUT requests.
3. Click the "GO!" button to make the request.
4. View the response headers and body below the request form.
5. Click the "History" button to view a list of past requests and their responses.
6. Click the "Recents" button to view a list of recent requests.

## Components

### App

The main component that holds the state and manages the logic for making API requests and updating the history and recents lists.

### Header

Contains the buttons for viewing the history and recents lists. It also includes the dropdown menus for displaying these lists.

### Form

Contains the form for entering the URL, selecting the HTTP method, and submitting the request.

### Results

Displays the response headers and body in a formatted manner.

### Footer

A simple footer component.

## Data Structures

### Stack

A custom stack implementation used for storing the history of requests. Each node in the stack contains the request data and a pointer to the next node.

## License

This project is licensed under the MIT License.
