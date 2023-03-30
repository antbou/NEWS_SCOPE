# NEWS SCOPE

This is a Next.js 13 project with App components that lists news and allows users to integrate with them. Users can connect to the site with Google or create their own account. The project uses Firebase and the News API.

## Table of content

1. [Setting up dev](#setting-up-dev)
   1. [Requirements](#requirements)
   2. [Clone repository](#clone-repository)
   3. [Configuration](#configuration)
   4. [Dependencies installation](#dependencies-installation)
   5. [Run](#run)
2. [Usage](#usage)
3. [Docs](#docs)
4. [Contributing](#contributing)
5. [Credits](#credits)
6. [License](#license)

## Setting up dev

### Requirements

| Version    | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| npm        | Package manager                                               |
| nodejs     | For code execution                                            |
| Next.js 13 | React framework                                               |
| Firebase   | Cloud-based platform for building web and mobile applications |
| News API   | RESTful API for searching and retrieving live news articles   |

### Clone repository

```sh
git clone git@github.com:ES-RIA2-REACT-AWS/microservice-frontend.git
cd microservice-frontend/
git switch develop
```

### Configuration

To install and run this project locally, follow these steps:

1. Clone this repository onto your local machine.
2. Open a terminal window and navigate to the root directory of the project.
3. Copy `./.env.local.example` and name it `./.env.local`

### Dependencies installation

Execute the following command to install all the necessary dependencies.

```shell
npm i
```

### Run

Execute the following command to run the project

```sh
npm run dev
```

Then open your browser and navigate to http://localhost:3000 to see the application running.

## Usage

Once you have the application running, you can start uploading images and having them analyzed by Amazon Rekognition. Simply click on the "Upload Image" button, select an image from your computer, and wait for the analysis to complete. You should see a list of labels and other information about the image displayed on the screen.

## Contributing

We welcome contributions to this project! If you have an idea for a new feature or have found a bug, please open
an issue on GitHub to let us know.

If you would like to contribute code to the project, please follow these steps:

1. Clone the repository to your local machine
2. Create a new branch for your feature using `git flow feature start <feature-name>`
3. Write and test your code
4. Update the documentation as necessary
5. Submit a pull request. Any pull request that does not pass the CI/CD pipeline or without new tests will be rejected.

We will review your pull request and discuss any necessary changes before merging it.

Thank you for considering contributing to this project!

## Docs

The specifications and the architectural diagram can be found in the docs folder

## Credits

This project uses the following technologies:

- Next.js 13
- React
- Fireb-ase
- News API

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the LICENSE file for more details
