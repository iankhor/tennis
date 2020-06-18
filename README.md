## Instructions

## High Level Design Thoughts

These were the high level design thoughts to guide implementation

1. Require to structure data in a way to query statistics
2. Small functions to abstract tennis concept with regarding criterias to win a game, set and match
3. Need to ensure data sets receive is cleansed (ie: blank spaces)

## Assumptions on Input data

1. All rows are delimited by a new line and a return carriage (ie: \r\n)
2. Match description (ie: Match: 01) and players match up description (ie: Person A vs Person B) are spelt correctly and case sensitivity is expected in input data.
3. Assumes the file exist in the filepath supplied when running the app. The app does not test for file existance at this stage.it
