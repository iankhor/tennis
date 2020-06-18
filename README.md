## ;TLDR

An app to calculate the statistics of tennis matches

## Demo

Animated Demo is shown below:  
![](/docs/demo.gif)

## Instructions

Prerequisite : `yarn`is available on your local machine.

To run the app, follow the instructions below:

1. run `yarn install`
2. run `yarn start`
3. (optional) If you want to provide your own input file, run `yarn start [FULL PATH TO INPUT FILE]`.

See animated demo above for an example.

To run the tests

1. run `yarn test`

## Brief

Implementation details:

- summarising the progression of _points_ in the input file into _games_ with statistics - points won, and the winner of each game
- summarising the progression of _games_ into _sets_ with statistics - games won, and the winner of each set
- lastly, summarising the progression of _sets_ into _matches_ with statistics - sets won, and the winner of each match

## High Level Design Thoughts

These were the high level design thoughts to guide implementation

1. Require to structured data in a way to query statistics
2. Small functions to abstract tennis concept with regarding criterias to win a game, set and match
3. To ensure data sets receive is cleansed (ie: blank spaces)
4. To create functions to summarise games in to sets
5. To create functions to summarise sets into match
6. Used a spike to get a feel how the data structure may look like
7. Used TDD/BDD to guide implementation base on knowledge from spike

## Assumptions on Input data

1. All rows are delimited by a new line and a return carriage (ie: \r\n)
2. Match description (ie: Match: 01) and players match up description (ie: Person A vs Person B) are spelt correctly and case sensitivity is expected in input data.
3. Assumes the file exist in the filepath supplied when running the app. The app does not test for file existance at this stage.
4. Supplied input points file is assumed to contained fully complated matches (ie: points reflect a fully completed match)
