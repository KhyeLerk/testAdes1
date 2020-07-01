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

# API 1 : Get limited performances without filtering

### HTTP Method => GET
### Endpoint => /basic/data

### Parameters 
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
GET /basic/data?page=1&rows=5
```

### Sample Response
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130"
    },
    {
        "performanceId": 1000000004,
        "festivalId": 1100000002,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000005,
        "festivalId": 1100000002,
        "startTime": "1100",
        "endTime": "1200"
    }
]
```

# Sample Error

```js
"Server error"
```

# API 2 : Get limited performances with popularity without filtering

### HTTP Method => GET
### Endpoint => /advance/data

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
GET /advance/data?page=1&rows=5
```

### Sample Response
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130",
        "popularity": 10
    },
    {
        "performanceId": 1000000004,
        "festivalId": 1100000002,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000005,
        "festivalId": 1100000002,
        "startTime": "1100",
        "endTime": "1200",
        "popularity": 1
    }
]
```

# Sample Error


```js
"Server error"
```

# API 3 : Insert new performances into table

### HTTP Method => POST
### Endpoint => /basic/insert

### Request Body
- data <Obj array> => 
{
    "data": [
        {
            "festivalId": IDENTIFIER,
            "performanceId": IDENTIFIER,
            "startTime": TIME,
            "endTime": TIME, 
        }
    ]
}

### Response Body
```json
{
    "result": "success"
}
```

### Error
- Partial or complete null input
```json
{
    "error":"Null Entry",
    "code":400
}
```

- Partial or complete duplicate input
```json
{
    "error":"Duplicate Entry",
    "code":400
}
```

- Other errors
```json
{
    "error":"Server Error",
    "code":500
}
```

### Sample Request
```http
Post /basic/insert
{
    "data": [
        {
            "festivalId": 1234567890,
            "performanceId": 1234567890,
            "startTime": "1000",
            "endTime": "1030",
        },
        {
            "festivalId": 1234567891,
            "performanceId": 1234567891,
            "startTime": "1030",
            "endTime": "1100",
        },
    ]
}
```

### Sample Response
```json
{
    "result": "success"
}
```

# Sample Error
- Partial or complete null input
```json
{
    "error":"Null Entry",
    "code":400
}
```

- Partial or complete duplicate input
```json
{
    "error":"Duplicate Entry",
    "code":400
}
```

- Other errors
```json
{
    "error":"Server Error",
    "code":500
}
```

# API 4 : Insert new performances with popularity into table

### HTTP Method => POST
### Endpoint => /advance/insert

### Request Body
- data <Obj array> => 
{
    "data": [
        {
            "festivalId": IDENTIFIER,
            "performanceId": IDENTIFIER,
            "startTime": TIME,
            "endTime": TIME, 
            "popularity": Number
        }
    ]
}

### Response Body
```json
{
    "result": "success"
}
```

### Error
- Partial or complete null input
```json
{
    "error":"Null Entry",
    "code":400
}
```

- Partial or complete duplicate input
```json
{
    "error":"Duplicate Entry",
    "code":400
}
```

- Other errors
```json
{
    "error":"Server Error",
    "code":500
}
```

### Sample Request
```http
Post /advance/insert
{
    "data": [
        {
            "festivalId": 1234567890,
            "performanceId": 1234567890,
            "startTime": "1000",
            "endTime": "1030", 
            "popularity": 10000
        },
        {
            "festivalId": 1234567891,
            "performanceId": 1234567891,
            "startTime": "1030",
            "endTime": "1100", 
            "popularity": 1000
        },
    ]
}

```

### Sample Response
```json
{
    "result": "success"
}
```

# Sample Error
- Partial or complete null input
```json
{
    "error":"Null Entry",
    "code":400
}
```

- Partial or complete duplicate input
```json
{
    "error":"Duplicate Entry",
    "code":400
}
```

- Other errors
```json
{
    "error":"Server Error",
    "code":500
}
```

# API 5 : Get limited performances with filtering by two attributes (basic)

### HTTP Method => GET
### Endpoint => /basic/filter

### Parameters 
- page <int> => 1
- startTime <time> => 1200
- festivalId <int> => 1100000001
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

### Sample Request (3 types of requests)

##### Condition One : Filter by both attributes
```http
GET /basic/filter?page=1&rows=5&startTime=1000&festivalId=1100000001
```

##### Condition Two : Filter by startTime only
```http
GET /basic/filter?page=1&rows=5&startTime=1000&festivalId=0
```

##### Condition Three : Filter by festivalId only
```http
GET /basic/filter?page=1&rows=5&startTime=0&festivalId=1100000001
```

### Sample Response

##### Condition One : Filter by both attributes
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130"
    }
]
```

##### Condition Two : Filter by startTime only
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130"
    },
    {
        "performanceId": 1000000004,
        "festivalId": 1100000002,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000005,
        "festivalId": 1100000002,
        "startTime": "1100",
        "endTime": "1200"
    }
]
```

##### Condition Three : Filter by festivalId only
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100"
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130"
    }
]
```

# Sample Error

```js
"Server error"
```

# API 6 : Get limited performances with popularity with filtering by three attributes (advance)

### HTTP Method => GET
### Endpoint => /advance/filter

### Parameters 
- page <int> => 1
- startTime <time> => 1200
- festivalId <int> => 1100000001
- endTime <time> 1400
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

### Sample Request (7 types of requests)

##### Condition One : Filter by festivalId only
```http
GET /advance/filter?page=1&rows=5&startTime=0&festivalId=1100000001&endTime=0
```
##### Condition Two : Filter by endTime only
```http
GET /advance/filter?page=1&rows=5&startTime=0&festivalId=0&endTime=1200
```

##### Condition Three : Filter by startTime only
```http
GET /advance/filter?page=1&rows=5&startTime=900&festivalId=0&endTime=0
```

##### Condition Four : Filter by festivalId and endTime
```http
GET /advance/filter?page=1&rows=5&startTime=0&festivalId=1100000001&endTime=1200
```

##### Condition Five : Filter by startTime and endTime
```http
GET /advance/filter?page=1&rows=5&startTime=1000&festivalId=0&endTime=1200
```

##### Condition Six : Filter by festivalId and startTime
```http
GET /advance/filter?page=1&rows=5&startTime=900&festivalId=1100000001&endTime=0
```

##### Condition Seven : Filter by startTime, festivalId and endTime
```http
GET /advance/filter?page=1&rows=5&startTime=1030&festivalId=1100000001&endTime=1200
``` 

### Sample Response

##### Condition One : Filter by festivalId only
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130",
        "popularity": 10
    }
]
```

##### Condition Two : Filter by endTime only
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130",
        "popularity": 10
    },
    {
        "performanceId": 1000000004,
        "festivalId": 1100000002,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000008,
        "festivalId": 1100000003,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    }
]
```
##### Condition Three : Filter by startTime only
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130",
        "popularity": 10
    },
    {
        "performanceId": 1000000004,
        "festivalId": 1100000002,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000005,
        "festivalId": 1100000002,
        "startTime": "1100",
        "endTime": "1200",
        "popularity": 1
    }
]
```

##### Condition Four : Filter by festivalId and endTime
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130",
        "popularity": 10
    }
]
```

##### Condition Five : Filter by startTime and endTime
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130",
        "popularity": 10
    },
    {
        "performanceId": 1000000004,
        "festivalId": 1100000002,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000008,
        "festivalId": 1100000003,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    }
]
```

##### Condition Six : Filter by festivalId and startTime
```json
[
    {
        "performanceId": 1000000001,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000002,
        "festivalId": 1100000001,
        "startTime": "1000",
        "endTime": "1100",
        "popularity": 1
    },
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130",
        "popularity": 10
    }
]
```

##### Condition Seven : Filter by startTime, festivalId and endTime
```json
[
    {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": "1030",
        "endTime": "1130",
        "popularity": 10
    }
]
```

# Sample Error

```js
"Server error"
```

# API 7 : Get number(count) of performances with filtering

### HTTP Method => GET
### Endpoint => /basic/count

### Parameters 
- festivalId <int> => 1100000004
- startTime <time> => 1100

### Response Body
```json
[
    {
        "count": number
    }
]
```

### Error

```js
"Server error"
```

### Sample Request

##### Condition One : Get number of rows without filtering
```http
GET /basic/count?festivalId=0&startTime=0
```

##### Condition Two : Get number of rows filter by festivalId only
```http
GET /basic/count?festivalId=1100000004&startTime=0
```

##### Condition Three : Get number of rows filter by startTime only
```http
GET /basic/count?festivalId=0&startTime=1100
```

##### Condition Four : Get number of rows filter by startTime and festivalId
```http
GET /basic/count?festivalId=1100000004&startTime=1100
```

### Sample Response

##### Condition One : Get number of rows without filtering
```json
[
    {
        "count": 18
    }
]
```

##### Condition Two : Get number of rows filter by festivalId only
```json
[
    {
        "count": 6
    }
]
```

##### Condition Three : Get number of rows filter by startTime only
```json
[
    {
        "count": 8
    }
]
```

##### Condition Four : Get number of rows filter by startTime and festivalId
```json
[
    {
        "count": 3
    }
]
```

# Sample Error

```js
"Server error"
```

# API 8 : Get number(count) of performances with popularity with filtering

### HTTP Method => GET
### Endpoint => /basic/count

### Parameters 
- festivalId <int> => 1100000004
- startTime <time> => 1100
- endTime <time> => 1400

### Response Body
```json
[
    {
        "count": number
    }
]
```

### Error

```js
"Server error"
```

### Sample Request

##### Condition One : Get number of rows without filtering
```http
GET /advance/count?festivalId=0&startTime=0&endTime=0
```

##### Condition Two : Get number of rows filter by festivalId only
```http
GET /advance/count?festivalId=1100000004&startTime=0&endTime=0
```

##### Condition Three : Get number of rows filter by endTime only
```http
GET /advance/count?festivalId=0&startTime=0&endTime=1400
```

##### Condition Four : Get number of rows filter by startTime only
```http
GET /advance/count?festivalId=0&startTime=1100&endTime=0
```

##### Condition Five : Get number of rows filter by festivalId and endTime
```http
GET /advance/count?festivalId=1100000004&startTime=0&endTime=1400
```

##### Condition Six : Get number of rows filter by startTime and endTime
```http
GET /advance/count?festivalId=0&startTime=1100&endTime=1400
```

##### Condition Seven : Get number of rows filter by startTime and festivalId
```http
GET /advance/count?festivalId=1100000004&startTime=1100&endTime=0
```

##### Condition Eight : Get number of rows filter by festivalId, startTime and endTime
```http
GET /advance/count?festivalId=1100000004&startTime=1100&endTime=1400
```

### Sample Response

##### Condition One : Get number of rows without filtering
```json
[
    {
        "count": 18
    }
]
```

##### Condition Two : Get number of rows filter by festivalId only
```json
[
    {
        "count": 6
    }
]
```

##### Condition Three : Get number of rows filter by endTime only
```json
[
    {
        "count": 18
    }
]
```

##### Condition Four : Get number of rows filter by startTime only
```json
[
    {
        "count": 8
    }
]
```

##### Condition Five : Get number of rows filter by festivalId and endTime
```json
[
    {
        "count": 6
    }
]
```

##### Condition Six : Get number of rows filter by startTime and endTime
```json
[
    {
        "count": 8
    }
]
```

##### Condition Seven : Get number of rows filter by startTime and festivalId
```json
[
    {
        "count": 3
    }
]
```

##### Condition Eight : Get number of rows filter by festivalId, startTime and endTime
```json
[
    {
        "count": 3
    }
]
```

# Sample Error

```js
"Server error"
```

# API 9 : Compute results for basic 

### HTTP Method => GET
### Endpoint => /basic/result

### Parameters 
- festivalId <int> => 1100000001

### Response Body
```json
{
"result":
[{"performanceId":number,"startTime":time,"endTime":time}]
}
```

### Error

```js
{
    "error":"Servor Error",
    "code":500
}
```

### Sample Request
```http
GET /basic/result?festivalId=1100000001
```

### Sample Response
```json
{
"result":
[{"performanceId":1000000001,"startTime":"1000","endTime":"1100"}]
}
```

# Sample Error

```js
"Server error"
```

# API 10 : Compute results for advance

### HTTP Method => GET
### Endpoint => /advance/result

### Parameters 
- festivalId <int> => 1100000001

### Response Body
```json
{
"result":
[{"performanceId":number,"startTime":time,"endTime":time,"popularity":number}]
}
```

### Error

```js
{
    "error":"Servor Error",
    "code":500
}
```

### Sample Request
```http
GET /advance/result?festivalId=1100000001
```

### Sample Response
```json
{
"result":
[{"performanceId":1000000001,"startTime":"1000","endTime":"1100"}]
}
```

# Sample Error

```js
"Server error"
```