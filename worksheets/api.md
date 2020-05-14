# API Documentation

This document allows you to define your API schema.

Each API should include

1. HTTP Method
2. Endpoint
3. Request body/Parameters
4. Response body
5. Error Body
6. Sample Request
7. Sample Response
8. Sample Error

> Errors and it's corresponding code can be defined by yourself. You need not follow HTTP errors.

## Get Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/data |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| id        | 10 digit number | 123456789 |

### Response Body

```json
{
    "result": [
        {
            "id": number,
            "property1": number,
            "property2": string,
            ...
        }
    ]
}
```

### Error

```js
"Server error"
```

### Sample Request

```http
GET /basic/data?id=1234567890
```

### Sample Response

```json
{
    "result": [
        {
            "id": 1234567890,
            "property1": 1234567890,
            "property2": "haha",
            ...
        }
    ]
}
```

### Sample Error


```js
"Server error"
```

# API 1 : Get Number of Performances

### HTTP Method => GET
### Endpoint => /api/performances

### Parameters 
- N/A

### Response Body
```json
{
    "result":[
        {
            "count":number
        }
    ]
}
```

### Error

```js
"Server error"
```

### Sample Request
```http
GET /api/performances
```

### Sample Response
```json
{
    "result":[
	"count":100
    ]
}
```

# Sample Error

```js
"Server error"
```

# API 2 : Get Performances Limiting rows only

### HTTP Method => GET
### Endpoint => /api/performances/:page/:rows

### Request Parameters
- page <int> => 1
- rows <int> => 3

### Response Body
```json
{
    "result":[
        {
            "performanceId":number,
            "festivalId":number,
            "startTime":time,
            "endTime":time,
        }
    ]
}
```

### Error

```js
"Server error"
```

### Sample Request
```http
GET /api/performances/1/3
```

### Sample Response
```json
{
    "result":[
        {
            "performancesId":1111111111,
            "festivalId":3333333333,
            "startTime":"1000",
            "endTime":"1200",        
	},

        {
            "performancesId":2222222222,
            "festivalId":3333333333,
            "startTime":"1100",
            "endTime":"1300",
        },

        {
            "performancesId":3333333333,
            "festivalId":3333333333,
            "startTime":"1200",
            "endTime":"1400",
        }
    ]
}
```

# Sample Error


```js
"Server error"
```

# API 3 : Insert new performances into table

### HTTP Method => POST
### Endpoint => /api/performances

### Request Body
- performanceId <int(10)> => 1111111111
- festivalId <int(10)> => 1111111111
- startTime <varchar(4)> => "1030"
- endTime <varchar(4)> => "1230"
	
### Response Body
```json
 {
     "performanceId":number
 }
```

### Error
- Partial or complete null input
```json
      "Null error"
```

- Partial or complete duplicate input
```json
     "Duplicate Error"
```

- Other errors
```json
    "Server error"
```

### Sample Request
```http
Post /api/performances
<body>
- performanceId : 1111111111
- festivalId : 1111111111
- startTime : "1030"
- endTime : "1230"
</body>
```

### Sample Response
```json
{
    "performanceId":1111111111
}
```

# Sample Error
- Partial or complete null input
```json
      "Null error"
```

- Partial or complete duplicate input
```json
     "Duplicate Error"
```

- Other errors
```json
    "Server error"
```

# API 4: Get Performances Limiting rows(Filtered) 

### HTTP Method => GET
### Endpoint => /api/performances/:page/:startTime/startTime/:festivalId/festivalId/:rows

### Parameters 
- page <int> => 1
- startTime <varchar(4)> => 1200
- festivalId <int(10)> => 3333333333
- rows <int> => 2

### Response Body
```json
{
    "result":[
        {
            "performanceId":number,
            "festivalId":number,
            "startTime":"varchar(4)",
            "endTime":"varchar(4)",
        }
    ]
}
```

### Error

```js
"Server error"
```

### Sample Request
```http
GET /api/performances/1/1200/startTime/3333333333/festivalId/2
```

### Sample Response
```json
{
    "result":[
    
    	{
            "performancesId":2222222222,
            "festivalId":3333333333,
            "startTime":"1200",
            "endTime":"1300",
        },
	
        {
            "performancesId":1111111111,
            "festivalId":3333333333,
            "startTime":"1200",
            "endTime":"1400",
        }
    ]
}
```

# Sample Error

```js
"Server error"
```

# API 5: Get Number of Performances Limiting rows(Filtered) 

### HTTP Method => GET
### Endpoint => /api/performances/:startTime/startTime/:festivalId/festivalId/

### Parameters 
- startTime <varchar(4)> => 1200
- festivalId <int(10)> => 3333333333

### Response Body
```json
{
    "result":[
        {
	     "count":number
        }
    ]
}
```

### Error

```js
"Server error"
```

### Sample Request
```http
GET /api/performances/1200/startTime/3333333333/festivalId/
```

### Sample Response
```json
{
    "result":[
        {
	     "count":5
        }
    ]
}
```

# Sample Error

```js
"Server error"
```
