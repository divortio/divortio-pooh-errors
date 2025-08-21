export const fullErrorList = {
    400: {name: "Bad Request"},
    401: {name: "Unauthorized"},
    402: {name: "Payment Required"},
    403: {name: "Forbidden"},
    404: {name: "Not Found"},
    405: {name: "Method Not Allowed"},
    406: {name: "Not Acceptable"},
    407: {name: "Proxy Authentication Required"},
    408: {name: "Request Timeout"},
    409: {name: "Conflict"},
    410: {name: "Gone"},
    411: {name: "Length Required"},
    412: {name: "Precondition Failed"},
    413: {name: "Payload Too Large"},
    414: {name: "URI Too Long"},
    415: {name: "Unsupported Media Type"},
    416: {name: "Range Not Satisfiable"},
    417: {name: "Expectation Failed"},
    418: {name: "I'm a teapot"},
    421: {name: "Misdirected Request"},
    422: {name: "Unprocessable Entity"},
    423: {name: "Locked"},
    424: {name: "Failed Dependency"},
    425: {name: "Too Early"},
    426: {name: "Upgrade Required"},
    428: {name: "Precondition Required"},
    429: {name: "Too Many Requests"},
    431: {name: "Request Header Fields Too Large"},
    451: {name: "Unavailable For Legal Reasons"}
};

export const defaultError = {
    name: "Puzzling Error",
    title: "In Which Something Puzzling\nHas Happened",
    description: "A state of affairs that is not in the book of rules. Owl would need to look this one up."
};