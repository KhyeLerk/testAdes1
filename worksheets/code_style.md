# Code Style

This documents helps to guide the look and feel of the code so that even when there are multiple developer, the style remains consistent. You may read more about it [here](https://javascript.info/coding-style).

## Style Guide

| Rules             | Choices                         |
| ----------------- | ------------------------------- |
| Case Styles       | camelCase                       |
| Acronym Case      | ibm                             |
| Indentation Style | 1TBS                            |
| Indentation       | Tabs                            |
| Indentation Space | 4 spaces                        |
| Semicolon         | Optional                        |

## Examples

Based on your chosen rules, give an example of a code that follows the code style and an example of a code that does not follow the code style. The examples you give should cover all the above defined rule.

### Good Example

```js
var myFirstVariable = []; // Following rule one : Using camel case
var companyName = shield; // Following rule two : Using small letters for acronym
for(var i = 0;i < 5;i++){ // Following rule three : Using 1TBS indentation style
    myFirstVariable.push(i); // Following rule 4, 5, 6: Using tabs and 4 spaces for indentation and indentation space respectively.Use ;
}
```

### Bad Example

```js
var myFirst_Variable // Not following rule one : Not using camel case
var companyName = Shield; // Not following rule two : Using capital letters for acronym
for(var i = 0;i < 5;i++) // Not following rule three : Not using 1TBS indentation style
{
 myFirstVariable.push(i); /* Not following rule 4, 5: Not using tabs and use 1 spaces for indentation and indentation space respectively.*/
}
```
