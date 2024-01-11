# TaskManager

This is a lerna monorepo consisting of an [Express API](packages/api/README.md) and a [NextJS User Interface](packages/ui/README.md).
I have added individual READMEs in each of the packages with the thoughts and notes as I've completed this challenge

## Installation

From the repository root run

`npm install`

The API requires an accessible MongoDB server. If one is not available (and you have Docker installed), one can easily be spun
up locally by running

`docker compose up -d`

## Running

To run, follow the instructions on setup in the API package, then run

`npm run dev`

The application will then be available in your browser at `http://localhost:3000`
