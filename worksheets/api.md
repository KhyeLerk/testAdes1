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

```json
{
	"error": string,
	"code": number
}
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

```json
{
	"error": "Server Error",
	"code": 500
}
```

# API 1 : Get Performances

### HTTP Method => GET
### Endpoint => /api/performances

### Parameters 
- N/A

### Response Body
```json
{
    "result":[
        {
            "performanceId":number,
            "festivalId":number,
            "startTime":time,
            "endTime":time,
            "popularity":number,
        }
    ]
}
```

### Error
```json
{
    "error":string,
    "code":number,
}
```

### Sample Request
```http
GET /api/performances
```

### Sample Response
```json
{
    "result":[
        {
            "performancesId":1111111111,
            "festivalId":3333333333,
            "startTime":1000,
            "endTime":1200,
            "popularity":1
        },

        {
            "performancesId":2222222222,
            "festivalId":3333333333,
            "startTime":1100,
            "endTime":1300,
            "popularity":10000
        },

        {
            "performancesId":3333333333,
            "festivalId":3333333333,
            "startTime":1200,
            "endTime":1400,
            "popularity":1
        }
    ]
}
```
