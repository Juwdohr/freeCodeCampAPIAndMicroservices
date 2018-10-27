
# API Project: Timestamp Microservice for FCC

### User stories :

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.

#### Example usage:
* https://curse-arrow.hyperdev.space/api/timestamp/2015-12-15
* https://curse-arrow.hyperdev.space/api/timestamp/1450137600000

#### Example output:
* { "unix": 1450137600, "natural": "December 15, 2015" }

# API Projet: Request Header Parser Microservice for freeCodeCamp

### User Stories :

1. I can get the IP address, preferred langauges (from header `Accept-Languag`) and system infos(from header `User-Agent`) fro my device

#### Example Usage:

* [base_url]/api/whoami

#### Example Output:

* `{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5","software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}`

# API Project: URL Shortner Microservice for freeCodeCamp

### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will recieve a shortened URL in the JSON Response. Example: `{"original_url": "www.google.com", "short_url": 1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like {"error": "invalid URL"}. *Hint*: to be sure that the submitted url points to avalid sit you can use the function dns.lookup(host, cb) from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.

#### Creation Example

POST [project_url]/api/shorturl/new - body (urlencoded) : url=[https://google.com]

##### Usage:

[this_project_url]/api/shorurl/3

##### Will redirect to:

http://forum.freecodecamp.com