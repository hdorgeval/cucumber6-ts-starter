@simpleLogger
Feature: Simple maths
  In order to do maths
  As a developer
  I want to increment variables

Background: Calculator
  Given I have a simple maths calculator

Scenario: easy maths
  Given a variable set to 11
  When I increment the variable by 1
  Then the variable should contain 12

@only
Scenario Outline: much more complex stuff
  Given a variable set to <var>
  When I increment the variable by <increment>
  Then the variable should contain <result>
  Examples:
    | var | increment | result |
    | 100 | 5         | 105    |
    | 99  | 1234      | 1333   |
    | 12  | 5         | 17     |
    